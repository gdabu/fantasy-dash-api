var express = require('express');
var router = express.Router();

const NHL_API = require('../middleware/NHL_API.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Fantasy Dash API - NHL' });
});

router.get('/getAllTeams', async function (req, res) {
  let { season } = req.query;

  if (season !== undefined && !RegExp('\\d{8}').test(season)) {
    res
      .status(400)
      .json('400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)');
    return;
  }

  let { status, payload } = await NHL_API.getAllTeams(season);
  res.status(status).json(payload);
});

router.get('/getTeam', async function (req, res) {
  let { teamId } = req.query;

  if (teamId === undefined) {
    res.status(400).json(`400 - :teamId can't be empty`);
    return;
  }

  if (isNaN(teamId)) {
    res.status(400).json('400 - :teamId needs to be a number');
    return;
  }

  let result = await NHL_API.getTeam(teamId);

  if (result.length === 0) {
    res.status(400).json('404 - team not found');
  }

  res.json(result);
});

router.get('/getRoster', async function (req, res) {
  let { teamId, season } = req.query;

  if (teamId === undefined) {
    res.status(400).json(`400 - :teamId can't be empty`);
    return;
  }

  if (isNaN(teamId)) {
    res.status(400).json('400 - :teamId needs to be a number');
    return;
  }

  if (season !== undefined && !RegExp('\\d{8}').test(season)) {
    res
      .status(400)
      .json('400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)');
    return;
  }

  let result = await NHL_API.getRoster(teamId);

  res.json(result);
});

router.get('/getAllRosteredPlayers', async function (req, res) {
  let { season } = req.query;

  if (season !== undefined && !RegExp('\\d{8}').test(season)) {
    res
      .status(400)
      .json('400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)');
    return;
  }

  let result = await NHL_API.getAllRosteredPlayers(season);
  res.json(result);
});

router.get('/getRosterPlayersFull', async function (req, res) {
  let { teamId, season } = req.query;

  if (teamId === undefined) {
    res.status(400).json(`400 - :teamId can't be empty`);
    return;
  }

  if (isNaN(teamId)) {
    res.status(400).json('400 - :teamId needs to be a number');
    return;
  }

  if (season !== undefined && !RegExp('\\d{8}').test(season)) {
    res
      .status(400)
      .json('400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)');
    return;
  }

  let result = await NHL_API.getRosterPlayersFull(teamId, season);
  res.json(result);
});

router.get('/getPlayerInfo', async function (req, res) {
  let { playerId } = req.query;

  if (playerId === undefined) {
    res.status(400).json(`400 - :teamId can't be empty`);
    return;
  }

  if (isNaN(playerId)) {
    res.status(400).json('400 - :teamId needs to be a number');
    return;
  }

  let result = await NHL_API.getPlayerInfo(playerId);
  res.json(result);
});

router.get('/getPlayerStats', async function (req, res) {
  let { teamId, season } = req.query;

  if (teamId === undefined) {
    res.status(400).json(`400 - :teamId can't be empty`);
    return;
  }

  if (isNaN(teamId)) {
    res.status(400).json('400 - :teamId needs to be a number');
    return;
  }

  if (season !== undefined && !RegExp('\\d{8}').test(season)) {
    res
      .status(400)
      .json('400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)');
    return;
  }

  let result = await NHL_API.getPlayerStats(playerId, season);
  res.json(result);
});

router.get('/getPlayer', async function (req, res) {
  let { teamId, season } = req.query;

  if (teamId === undefined) {
    res.status(400).json(`400 - :teamId can't be empty`);
    return;
  }

  if (isNaN(teamId)) {
    res.status(400).json('400 - :teamId needs to be a number');
    return;
  }

  if (season !== undefined && !RegExp('\\d{8}').test(season)) {
    res
      .status(400)
      .json('400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)');
    return;
  }

  let result = await NHL_API.getPlayer(playerId, season);
  res.json(result);
});

module.exports = router;
