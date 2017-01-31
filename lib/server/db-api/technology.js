var mongoose = require('mongoose')
var Technology = mongoose.model('Technology')
var log = require('debug')('civicstack:db-api:technology')

/**
 * Get all technologies
 *
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'technologies' list items found or `undefined`
 * @return {Module} `technology` module
 * @api public
 */

exports.all = () => Technology.find({ deletedAt: null }).select('id name').exec()

/**
 * Get Technology form `id` string or `ObjectId`
 *
 * @param {String|ObjectId} id Technology's `id`
 * @param {Function} fn callback function
 *   - 'err' error found while process or `null`
 *   - 'technology' found item or `undefined`
 * @api public
 */

exports.get = function get(id, fn) {
  var query = { _id: id }

  log('Looking for technology %s', id)
  Technology
  .findOne(query)
  .exec(function (err, technology) {
    if (err) {
      log('Found error %s', err)
      return fn(err)
    }

    if (!technology) {
      log('Technology %s not found', id)
      return fn(null)
    }
    log('Delivering technology %s', technology.id)
    fn(null, technology)
  })
}

/**
 * Creates technology
 *
 * @param {Object} data to create technology
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'technology' item created or `undefined`
 * @return {Module} `technology` module
 * @api public
 */

exports.create = function create(data, fn) {
  log('Creating new technology %j', data)

  var technology = new Technology(data)
  technology.save(onsave)

  function onsave(err) {
    if (err) return log('Found error %s', err), fn(err)

    log('Saved technology %s', technology.id)
    fn(null, technology)
  }

  return this
}

/**
 * Update given `technology`
 *
 * @param {ObjectId|String} data to create technology
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'technology' item created or `undefined`
 * @return {Module} `technology` module
 * @api public
 */

exports.update = function update(data, fn) {
  log('Updating technology %s with %j', data.id, data)

  // get technology
  exports.get(data.id, onget)

  function onget(err, technology) {
    if (err) {
      log('Found error %s', err.message)
      return fn(err)
    }

    // update and save technology document with data
    technology.set(data)
    technology.save(onupdate)
  }

  function onupdate(err, technology) {
    if (err) return log('Found error %s', err), fn(err)

    log('Saved technology %s', technology.id)
    fn(null, technology)
  }

  return this
}

/**
 * Deletes technology
 *
 * @param {Object} data to remove technology
 * @param {Function} fn callback function
 *   - 'err' error found on query or `null`
 *   - 'id' id removed or `undefined`
 * @return {Module} `technology` module
 * @api public
 */

exports.remove = function remove(id, fn) {
  log('Deleting technology %s', id)

  Technology
    .remove({_id: id})
    .exec(function (err) {
      if (err) return log('Found error %s', err), fn(err)

      log('Removed technology %s', id)
      fn(null, id)
    })

  return this
}
