const express = require('express');
const router  = express.Router();

const Battle = require("../models/battles");

router.get("/list", function (req, res, next) {
  return Battle.getLocations()
  .then(function (locations) {
    res.send({
      battles: {
        locations
      }
    })
  })
});

router.get("/count", function (req, res, next) {
  return Battle.getCount()
  .then(function (count) {
    res.send({
      battles: {
        count
      }
    })
  })
  .catch(handleError)
});

router.get("/stats", function (req, res, next) {
  return Battle.stats()
  .then(function (docs) {
    res.send({
      stats: docs
    })
  })
  .catch(handleError)
});

router.get("/search", function (req, res, next) {
  return Battle.searchBattle(req.query)
  .then(function (docs) {
    res.send({
      battles: docs
    })
  })
  .catch(handleError)
});

function handleError(res, err) {
  console.error(err)
  res.status(422).send({
    notice: "An error occurred, please report to abhijeet.sonawane91@gmail.com"
  })
}

module.exports = router;
