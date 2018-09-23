const mongoose     = require("mongoose")
const whenPipeline = require("when/pipeline")
const dbConf       = require("../../config").db

const BattleSchema    = require("./schema")
const SearchOperators = require("./search-operators")

mongoose.connect(`mongodb://${dbConf.credentials.username}:${dbConf.credentials.password}@${dbConf.connection.host}:${dbConf.connection.port}/${dbConf.connection.database_name}`);

/**
 * Gets count of the battles that were being fought
 * @returns {Promise}
 */
BattleSchema.methods.getCount = function () {
  return this.model('battles')
  .count();
}

/**
 * TODO
 * @returns {Promise}
 */
BattleSchema.methods.stats = function () {
  return this.model('battles')
  .aggregate([{
    "$group": {
      "_id": {
        "attacker_king": {"$sum": "$attacker_king"}
      }
    }
  }])
}

/**
 * Searches based on query queries
 * @returns {Promise}
 */

BattleSchema.methods.searchBattle = function (searchCriteria) {
  return constructQuery(searchCriteria)
  .then(query => {
    return this.model('battles')
    .find({
      $and: query
    })
  })
}

function constructQuery(userQuery) {

  let operators = [
    SearchOperators.addKingQuery.bind(this, userQuery),
    SearchOperators.addLocation.bind(this, userQuery),
    SearchOperators.addBattleType.bind(this, userQuery)
  ]

  return whenPipeline(operators, [])
}

/**
 * Gets list of all locations on which battle was fought
 * @returns {Promise}
 */
BattleSchema.methods.getLocations = function () {
  return this.model('battles')
  .find({}, {location: true, _id: false})
  .then(removeLocationKey);
}


function removeLocationKey(docs) {
  return docs.map(doc => {
    if (hasLocation(doc)) {
      return doc.location
    }
  })
}

function hasLocation(doc) {
  return doc.location !== ""
}

const BattleFiled = mongoose.model('battles', BattleSchema)

module.exports = new BattleFiled()