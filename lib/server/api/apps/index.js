const express = require('express')
const api = require('../../db-api')
const log = require('debug')('civicstack:api:application')
const utils = require('../../utils')
const { admin, restrict, handleError, openGraph, accepts } = utils

const app = module.exports = express()

/**
 * Limit request to json format only
 */

app.use(accepts('application/json'))

const all = ['id name logo backgroundColor video description technology technologyids links',
  'organization github website country twitter license contact partnership',
  'comments tags approved tagids uploadedBy upvotesCount upvoted'].join(' ')

function expose (user) {
  return function (app) {
    var obj = utils.expose(all)(app)
    obj.upvoted = user && app.upvotes !== undefined &&
      (app.upvotes.map(a => a.toString()).indexOf(user.id) >= 0)

    return obj
  }
}

app.get('/applications', utils.admin, (req, res) => {
  log('Request GET /applications')
  api.application.all()
  .then(applications => {
    const body = applications.map(expose(req.user))
    log(`Response GET /applications: ${body.length} items`)
    res.json(body)
  })
  .catch(err => {
    log(`Error GET /applications: ${err.toString()}`)
    handleError(err, req, res)
  })
})

app.get('/applications/approved', function (req, res) {
  function parse (key) {
    return req.query[key] ? req.query[key].split(',') : undefined
  }

  log('GET /applications/approved')

  // Filters
  const tags = parse('tags')
  const technologies = parse('technologies')
  const countries = parse('countries')
  const search = req.query.q
  // Sorting
  const sortBy = req.query.sort === '_id' || req.query.sort === 'upvotesCount'
    ? req.query.sort : undefined
  const sortOrder = req.query.order === 'asc' || req.query.order === 'desc' ? req.query.order : 'asc'

  // Fetch data
  if (tags || countries || technologies || search || sortBy) {
    const filter = {
      tags: tags,
      technologies: technologies,
      countries: countries,
      search: search,
      sortBy: sortBy,
      sortOrder: sortOrder
    }

    api.application.filter(filter)
      .then(applications => {
        const body = applications.map(expose(req.user))
        log(`Response GET /applications/approved: ${body.length} items`)
        res.json(body)
      })
      .catch(err => handleError(err, req, res))
  } else {
    api.application.approved()
      .then(applications => {
        const body = applications.map(expose(req.user))
        log(`Response GET /applications/approved: ${body.length} items`)
        res.json(body)
      })
      .catch(err => handleError(err, req, res))
  }
})

app.get('/applications/:id', (req, res) => api.application.get(req.params.id)
  .then(application => application
    ? res.json(expose(req.user)(application.toJSON()))
    : res.send(404))
  .catch(err => handleError(err, req, res)))

app.get('/applications/:id/links', function (req, res, next) {
  function promisify (links) {
    return links.map(function (link) {
      return new Promise(function (resolve) {
        openGraph.get(link.url, function (err, result) {
          var data = { url: link.url, description: link.description }
          data.og = err ? {} : ({
            title: result.data.ogTitle || result.data.title,
            description: result.data.ogDescription,
            image: result.data.ogImage && result.data.ogImage.url
          })
          return resolve(data)
        })
      })
    })
  }

  log('Request GET /application/%s/links', req.params.id)

  api.application.get(req.params.id)
    .then(application => {
      if (application) {
        Promise.all(promisify(application.links))
          .then(app => {
            log(`Response GET /application/${req.params.id}/links: ${JSON.stringify(app)}`)
            res.json(app)
          })
          .catch(err => {
            log(`Error GET /application/${req.params.id}/links: ${err.toString()}`)
            next(err)
          })
      } else {
        log(`Response GET /application/${req.params.id}/links: not found (404)`)
        res.send(404)
      }
    })
    .catch(err => handleError(err, req, res))
})

app.post('/applications/create', restrict, protect, function (req, res) {
  log('Request POST /applications/create %j', req.body)

  req.body.uploadedBy = req.user
  if (req.body.license === '') delete req.body.license

  api.application.create(req.body)
    .then(application => res.json(expose(req.user)(application.toJSON())))
    .catch(err => handleError(err, req, res))
})

app.post('/applications/:id', admin, protect, function (req, res) {
  log('Request POST /applications/%s %j', req.params.id, req.body)

  if (req.body.license === '') delete req.body.license
  req.body.video = utils.getEmbeddableYouTubeURL(req.body.video)

  api.application.update(req.body)
    .then(app => res.json(expose(req.user)(app.toJSON())))
    .catch(err => handleError(err, req, res))
})

app.post('/applications/:id/upvote', restrict, (req, res) =>
  api.application.upvote(req.params.id, req.user.id)
    .then(app => res.json(expose(req.user)(app.toJSON())))
    .catch(err => handleError(err, req, res)))

app.delete('/applications/:id/upvote', restrict, (req, res) =>
  api.application.undoUpvote(req.params.id, req.user.id)
    .then(app => res.json(expose(req.user)(app.toJSON())))
    .catch(err => handleError(err, req, res)))

app.delete('/applications/:id', admin, (req, res) =>
  api.application.remove(req.params.id)
    .then(id => res.sendStatus(200))
    .catch(err => handleError(err, req, res)))

function protect (req, res, next) {
  if (!req.user.admin) {
    delete req.body.approved
  }
  next()
}
