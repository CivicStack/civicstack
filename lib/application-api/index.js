/**
 * Module dependencies.
 */

var api = require('lib/db-api');
var accepts = require('lib/accepts');
var express = require('express');
var log = require('debug')('civicstack:application');
var Promise = require('bluebird');
var og = require('lib/open-graph');
var utils = require('lib/utils');
var admin = utils.admin;
var restrict = utils.restrict;
var pluck = utils.pluck;
var handleError = utils.handleError;

var app = module.exports = express();

/**
 * Limit request to json format only
 */

app.use(accepts('application/json'));

var all = ['id name logo backgroundColor video description technology technologyids links',
            'organization github website country twitter license contact partnership',
            'comments tags approved tagids uploadedBy upvotesCount upvoted'].join(' ');

function expose (user) {
  return function (app) {
    var obj = utils.expose(all)(app);
    obj.upvoted = user && app.upvotes !== undefined &&
      (app.upvotes.map(function (a) { return a.toString(); }).indexOf(user.id) >= 0);

    return obj;
  }
}

app.get('/applications', utils.admin, function (req, res) {
  log('Request /applications');
  api.application.all(function (err, applications) {
    if (err) return handleError(err, req, res);
    log('Serving applications %j', pluck(applications, "id"));

    res.json(applications.map(expose(req.user)));
  });
});

app.get('/applications/approved', function (req, res) {
  function parse (key) {
    return req.query[key] ? req.query[key].split(',') : undefined
  }

  function serveApplications(err, applications) {
    if (err) return handleError(err, req, res);
    log('Serving applications %j', pluck(applications, "id"));
    res.json(applications.map(expose(req.user)));
  }

  log('Request /applications/approved');

  // Filters
  var tags = parse('tags');
  var technologies = parse('technologies');
  var countries = parse('countries');
  // Sorting
  var sortBy = req.query.sort === 'date' || req.query.sort === 'upvotes'
    ? req.query.sort : undefined;
  var sortOrder = req.query.order === 'asc' || req.query.order === 'desc' ? req.query.order : 'asc';

  // Fetch data
  if (tags || countries || technologies || sortBy) {
    var filter = {
      tags: tags,
      technologies: technologies,
      countries: countries,
      sortBy: sortBy,
      sortOrder: sortOrder
    };

    api.application.filter(filter, serveApplications);
  } else {
    api.application.approved(serveApplications);
  }
});

app.get('/applications/:id', function (req, res) {
  log('Request GET /application/%s', req.params.id);

  api.application.get(req.params.id, function (err, application) {
    if (err) return handleError(err, req, res);
    if (!application) return res.send(404);

    log('Serving application %s', application.id);

    res.json(expose(req.user)(application.toJSON()));
  });
});

app.get('/applications/:id/links', function (req, res, next) {
  function promisify (links) {
    return links.map(function (link) {
      return new Promise(function (resolve) {
        og.get(link.url, function (err, result) {
          var data = { url: link.url, description: link.description };
          data.og = err ? {} : ({
            title: result.data.ogTitle || result.data.title,
            description: result.data.ogDescription,
            image: result.data.ogImage && result.data.ogImage.url
          });
          return resolve(data);
        });
      });
    });
  }

  log('Request GET /application/%s/links', req.params.id);

  api.application.get(req.params.id, function (err, application) {
    if (err) return handleError(err, req, res);
    if (!application) return res.send(404);

    log('Serving application links for %s: %j', application.id, application.links);
    Promise.all(promisify(application.links))
      .then(function (result) {
        return res.json(result);
      })
      .catch(function (err) {
        return next(err);
      });
  });
});

app.post('/applications/create', restrict, protect, function (req, res) {
  log('Request POST /applications/create %j', req.body);

  req.body.uploadedBy = req.user;
  if (req.body.license == '') delete req.body.license;

  api.application.create(req.body, function (err, application) {
    if (err) return handleError(err, req, res);

    log('Serving application %s', application.id);

    res.json(expose(req.user)(application.toJSON()));
  });
});

app.post('/applications/:id', admin, protect, function (req, res) {
  log('Request POST /applications/%s %j', req.params.id, req.body);

  if (req.body.license == '') delete req.body.license;
  req.body.video = utils.getEmbeddableYouTubeURL(req.body.video);

  api.application.update(req.body, function (err, app) {
    if (err) return handleError(err, req, res);

    log('Serving application %s', app.id);

    res.json(expose(req.user)(app.toJSON()));
  });
});

app.post('/applications/:id/upvote', restrict, function (req, res) {
  log('Request POST /applications/%s/upvote', req.params.id);

  api.application.upvote(req.params.id, req.user.id, function (err, app) {
    if (err) return handleError(err, req, res);
    res.json(expose(req.user)(app.toJSON()));
  });
});

app.delete('/applications/:id/upvote', restrict, function (req, res) {
  log('Request DELETE /applications/%s/upvote', req.params.id);

  api.application.undoUpvote(req.params.id, req.user.id, function (err, app) {
    if (err) return handleError(err, req, res);
    res.json(expose(req.user)(app.toJSON()));
  });
});

app.delete('/applications/:id', admin, function (req, res) {
  log('Request DEL /applications/%s %j', req.params.id, req.body);

  api.application.remove(req.params.id, function (err, id) {
    if (err) return handleError(err, req, res);

    log('Deleted application %s', id.id);

    res.sendStatus(200);
  });
});


function protect (req, res, next) {
  if (!req.user.admin) {
    delete req.body.approved;
  }
  next();
}
