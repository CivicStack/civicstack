const mongoose = require('mongoose')
const Application = mongoose.model('Application')

const fields = ['id name logo backgroundColor video description technology technologyids links tags',
  'organization github website country twitter license contact partnership comments approved tagids',
  'upvotes upvotesCount'].join(' ')

/**
 * Get all applications
 *
 * @return {Promise} When fulfilled, returns all the apps
 * @api public
 */

exports.all = () => Application
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
  .exec()

/**
 * Get Application form `id` string or `ObjectId`
 *
 * @param {String|ObjectId} id Application's `id`
 * @param {Function} fn callback function
 *   - 'err' error found while process or `null`
 *   - 'application' found item or `undefined`
 * @api public
 */

exports.get = id => Application
  .findOne({ _id: id, deletedAt: null })
  .populate('tags')
  .populate('country')
  .populate('license')
  .populate('technology')
  .populate({
    path: 'uploadedBy',
    select: 'avatar firstName lastName'
  })
  .exec()

/**
 * Creates app
 *
 * @param {Object} data to create app
 * @return {Promise} When fulfilled, the app has been created
 * @api public
 */

exports.create = data => {
  data.tags = data.tagids || []
  data.technology = data.technologyids || []

  var app = new Application(data)
  return app.save()
}

/**
 * Update given `app`
 *
 * @param {ObjectId|String} data to create app
 * @return {Promise} When fulfilled, the app has been updated
 * @api public
 */

exports.update = data => exports.get(data.id).then(app => {
  // update and save app document with data
  data.tags = data.tagids || []
  data.technology = data.technologyids || []
  data.links = data.links || []
  app.set(data)
  return app.save()
})

/**
 * Adds an upvote to a given `app`
 *
 * @param {ObjectId} ID of the app
 * @param {ObjectId} ID of the user that gives the upvote
 * @return {Promise} When fulfilled, returns the app
 * @api public
 */

exports.upvote = (appId, userId) => Application.findOne({ _id: appId })
  .then(app => {
    app.upvotes.addToSet(userId)
    app.upvotesCount = app.upvotes.length
    return app.save()
  })
  .then(() => exports.get(appId))

/**
 * Removes an upvote from a given `app`
 *
 * @param {ObjectId} ID of the app
 * @param {ObjectId} ID of the user
 * @return {Promise} When fulfilled, returns the app
 * @api public
 */

exports.undoUpvote = (appId, userId) => Application.findOne({ _id: appId })
  .then(doc => {
    doc.upvotes.pull(userId)
    doc.upvotesCount = doc.upvotes.length
    doc.save()
  })
  .then(() => exports.get(appId))

/**
 * Search approved apps
 *
 * @return {Promise} When fulfilled, returns a list of approved apps
 * @api public
 */

exports.approved = () => Application
  .find({ approved: true })
  .populate('country')
  .exec()

/**
 * Deletes app
 *
 * @param {Object} data to remove app
 * @return {Promise} when fulfilled, the document has been deleted
 * @api public
 */

exports.remove = id => Application.remove({ _id: id }).exec()
