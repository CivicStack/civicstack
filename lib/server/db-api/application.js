const mongoose = require('mongoose')
const { pluck } = require('../utils')
const log = require('debug')('civicstack:db-api:application')
const Application = mongoose.model('Application')

const fields = ['id name logo backgroundColor video description technology technologyids links tags',
  'organization github website country twitter license contact partnership comments approved tagids',
  'upvotes upvotesCount'].join(' ')

/**
 * Get all applications
 *
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'applications' list items found or `undefined`
 * @return {Module} `application` module
 * @api public
 */

exports.all = function all(fn) {
  log('Looking for all applications.')

  Application
  .find({ deletedAt: null })
  .select(fields)
  .populate('tags')
  .populate('country')
  .populate('license')
  .populate('technology')
  .populate({
    path: 'uploadedBy',
    select: 'avatar firstName lastName'
  })
  .exec(function (err, applications) {
    if (err) {
      log('Found error %j', err);
      return fn(err);
    };

    log('Delivering applications %j', pluck(applications, 'id'));
    fn(null, applications);
  });

  return this;
};

/**
 * Get all applications filtered and sorted
 *
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'applications' list items found or `undefined`
 * @return {Module} `application` module
 * @api public
 */

exports.filter = function filter(options, fn) {
  function buildQuery(opts) {
    var query = {
      approved: true
    };

    if (opts.tags) {
      query.tags = { $in: opts.tags }
    }
    if (opts.technologies) {
      query.technology = { $in: opts.technologies }
    }
    if (opts.countries) {
      query.country = { $in: opts.countries }
    }
    if (opts.search) {
      query['$text'] = { $search: opts.search };
    }
    return query;
  }

  function buildProjection(opts) {
    return opts.search ? { score: { $meta: "textScore" } } : undefined;
  }

  function buildSort(opts) {
    if (opts.search) {
      return { score: { $meta: 'textScore' } };
    } else if (opts.sortBy) {
      var order = opts.sortOrder === 'asc' ? '' : '-';
      var sort = order + opts.sortBy;
      return sort;
    }
  }

  function handleResponse(err, apps) {
    if (err) {
      log('Found error: %j', err);
      return fn(err);
    }
    log('Found approved apps %j', pluck(apps, 'id'));
    fn(null, apps);
  }

  var query = buildQuery(options);
  var projection = buildProjection(options);
  var sort = buildSort(options);

  log('Searching applications with query %j, projection %j and sort %j', query, projection, sort);
  Application
    .find(query, projection)
    .select(fields)
    .populate('tags')
    .populate('country')
    .populate('license')
    .populate('technology')
    .populate({
      path: 'uploadedBy',
      select: 'avatar firstName lastName'
    })
    .sort(sort)
    .exec(handleResponse);

  return this;
};

/**
 * Search apps from query
 *
 * @param {Object} query filter
 * @param {Function} fn callback function
 *   - 'err' error found while process or `null`
 *   - 'apps' list of apps objects found or `undefined`
 * @return {Module} `app` module
 * @api public
 */

exports.search = function search(query, fn) {
  log('Searching for apps matching %j', query);

  Application
    .find(query, function(err, apps) {
    if (err) {
      log('Found error: %j', err);
      return fn(err);
    }

    log('Found apps %j for %j', pluck(apps, 'id'), query);
    fn(null, apps);
  });

  return this;
};

/**
 * Get Application form `id` string or `ObjectId`
 *
 * @param {String|ObjectId} id Application's `id`
 * @param {Function} fn callback function
 *   - 'err' error found while process or `null`
 *   - 'application' found item or `undefined`
 * @api public
 */

exports.get = function get(id, fn) {
  var query = { _id: id, deletedAt: null };

  log('Looking for application %s', id);
  Application
  .findOne(query)
  .populate('tags')
  .populate('country')
  .populate('license')
  .populate('technology')
  .populate({
    path: 'uploadedBy',
    select: 'avatar firstName lastName'
  })
  .exec(function (err, application) {
    if (err) {
      log('Found error %s', err);
      return fn(err);
    };

    if (!application) {
      log('Application %s not found', id);
      return fn(null);
    }
    log('Delivering application %s', application.id);
    fn(null, application);
  });
};

/**
 * Creates app
 *
 * @param {Object} data to create app
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'app' item created or `undefined`
 * @return {Module} `app` module
 * @api public
 */

exports.create = function create(data, fn) {
  log('Creating new app %j', data);

  data.tags = data.tagids || [];
  data.technology = data.technologyids || [];

  var app = new Application(data);
  app.save(onsave);

  function onsave(err) {
    if (err) return log('Found error %s', err), fn(err);

    log('Saved app %s', app.id);
    fn(null, app);
  }

  return this;
};

/**
 * Update given `app`
 *
 * @param {ObjectId|String} data to create app
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'app' item created or `undefined`
 * @return {Module} `app` module
 * @api public
 */

exports.update = function update(data, fn) {
  log('Updating app %s with %j', data.id, data);

  // get app
  exports.get(data.id, onget);

  function onget(err, app) {
    if (err) {
      log('Found error %s', err.message);
      return fn(err);
    };

    // update and save app document with data
    data.tags = data.tagids || [];
    data.technology = data.technologyids || [];
    data.links = data.links || [];
    app.set(data);
    app.save(onupdate);
  }

  function onupdate(err, app) {
    if (err) return log('Found error %s', err), fn(err);

    log('Saved app %s', app.id)
    fn(null, app);
  }

  return this;
};

/**
 * Adds an upvote to a given `app`
 *
 * @param {ObjectId} ID of the app
 * @param {ObjectId} ID of the user that gives the upvote
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 * @return {Module} `app` module
 * @api public
 */

exports.upvote = function upvote(appId, userId, fn) {
  log('Upvoting app %s', appId);
  Application.findOne({ _id: appId }, function (err, doc) {
    doc.upvotes.addToSet(userId);
    doc.upvotesCount = doc.upvotes.length;
    doc.save(onupdate);
  });

  function onupdate(err) {
    if (err) return log('Found error %s', err), fn(err);
    log('Saved app %s', appId)
    exports.get(appId, fn);
  }

  return this;
};

/**
 * Removes an upvote from a given `app`
 *
 * @param {ObjectId} ID of the app
 * @param {ObjectId} ID of the user
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 * @return {Module} `app` module
 * @api public
 */

exports.undoUpvote = function undoUpvote(appId, userId, fn) {
  log('Undoing upvote for app %s', appId);
  Application.findOne({ _id: appId }, function (err, doc) {
    doc.upvotes.pull(userId);
    doc.upvotesCount = doc.upvotes.length;
    doc.save(onupdate);
  });

  function onupdate(err) {
    if (err) return log('Found error %s', err), fn(err);
    log('Saved app %s', appId)
    exports.get(appId, fn);
  }

  return this;
};

/**
 * Search approved apps
 *
 * @param {Function} fn callback function
 *   - 'err' error found while process or `null`
 *   - 'apps' list of apps objects found or `undefined`
 * @return {Module} `app` module
 * @api public
 */

exports.approved = function approved(fn) {
  log('Searching for approved apps');

  Application
    .find({ approved: true })
    .populate('country')
    .exec(function(err, apps) {
      if (err) {
        log('Found error: %j', err);
        return fn(err);
      }
      log('Found approved apps %j', pluck(apps, 'id'));
      fn(null, apps);
    });

  return this;
};

/**
 * Deletes app
 *
 * @param {Object} data to remove app
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'id' id removed or `undefined`
 * @return {Module} `app` module
 * @api public
 */

exports.remove = function remove(id, fn) {
  log('Deleting app %s', id);

  Application
    .remove({_id: id})
    .exec(function (err) {
      if (err) return log('Found error %s', err), fn(err);

      log('Removed app %s', id);
      fn(null, id);
    });

  return this;
};
