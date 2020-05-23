var express = require('express');
var router = express.Router();

const NHL_API = require('../connectors/NHL_API.js');

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

  let { status, payload } = await NHL_API.getAllTeams(season).catch((error) => {
    return error;
  });
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

  let { status, payload } = await NHL_API.getTeam(teamId).catch((error) => {
    return error;
  });
  res.status(status).json(payload);
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

  let { status, payload } = await NHL_API.getRoster(teamId, season).catch((error) => {
    return error;
  });
  res.status(status).json(payload);
});

router.get('/getAllRosteredPlayers', async function (req, res) {
  let { season } = req.query;

  if (season !== undefined && !RegExp('\\d{8}').test(season)) {
    res
      .status(400)
      .json('400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)');
    return;
  }

  let { status, payload } = await NHL_API.getAllRosteredPlayers(season).catch((error) => {
    return error;
  });
  res.status(status).json(payload);
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

  let { status, payload } = await NHL_API.getRosterPlayersFull(teamId, season).catch((error) => {
    return error;
  });
  res.status(status).json(payload);
});

router.get('/getPlayerInfo', async function (req, res) {
  let { playerId } = req.query;

  if (playerId === undefined) {
    res.status(400).json(`400 - :playerId can't be empty`);
    return;
  }

  if (isNaN(playerId)) {
    res.status(400).json('400 - :playerId needs to be a number');
    return;
  }

  let { status, payload } = await NHL_API.getPlayerInfo(playerId).catch((error) => {
    return error;
  });
  res.status(status).json(payload);
});

router.get('/getPlayerStats', async function (req, res) {
  let { playerId, season } = req.query;

  if (playerId === undefined) {
    res.status(400).json(`400 - :playerId can't be empty`);
    return;
  }

  if (isNaN(playerId)) {
    res.status(400).json('400 - :playerId needs to be a number');
    return;
  }

  if (season !== undefined && !RegExp('\\d{8}').test(season)) {
    res
      .status(400)
      .json('400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)');
    return;
  }

  let { status, payload } = await NHL_API.getPlayerStats(playerId, season).catch((error) => {
    return error;
  });
  res.status(status).json(payload);
});

router.get('/getPlayer', async function (req, res) {
  let { playerId, season } = req.query;

  if (playerId === undefined) {
    res.status(400).json(`400 - :playerId can't be empty`);
    return;
  }

  if (isNaN(playerId)) {
    res.status(400).json('400 - :playerId needs to be a number');
    return;
  }

  if (season !== undefined && !RegExp('\\d{8}').test(season)) {
    res
      .status(400)
      .json('400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)');
    return;
  }

  let { status, payload } = await NHL_API.getPlayer(playerId, season).catch((error) => {
    return error;
  });
  res.status(status).json(payload);
});

module.exports = router;
