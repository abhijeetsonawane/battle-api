const when = require("when")

module.exports = {
  addBattleType(userQuery, mongoQueries) {
    if (userQuery.type) {
      mongoQueries.push({
        battle_type: userQuery.type
      })
    }

    return when(mongoQueries)
  },

  addLocation(userQuery, mongoQueries) {
    if (userQuery.location) {
      mongoQueries.push({
        location: userQuery.location
      })
    }

    return when(mongoQueries)
  },

  addKingQuery(userQuery, mongoQueries) {
    if (userQuery.king) {
      mongoQueries.push({
        $or: [{
          attacker_king: userQuery.king
        }, {
          defender_king: userQuery.king
        }]
      })
    }

    return when(mongoQueries)
  }
}