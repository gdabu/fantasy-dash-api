var express = require('express');
var router = express.Router();

const NHL_API = require('../middleware/NHL_API.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Fantasy Dash API - NHL' });
});

router.get('/getAllTeams', async function (req, res) {
  let result = await NHL_API.getAllTeams();
  res.json(result);
});

router.get('/getTeam/:teamId', async function (req, res) {
  let teamId = req.params.teamId;

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

router.get('/getRoster/:teamId', async function (req, res) {
  let teamId = req.params.teamId;

  if (typeof req.params.teamId == 'number') {
    res.status(400).json('400 - :teamId needs to be a number');
  }

  let result = await NHL_API.getRoster(teamId);

  res.json(result);
});

router.get('/getAllRosteredPlayers', async function (req, res) {
  let result = await NHL_API.getAllRosteredPlayers();
  res.json(result);
});

router.get('/getRosterPlayersFull/:teamId', async function (req, res) {
  let teamId = req.params.teamId;

  if (isNaN(teamId)) {
    res.status(400).json('400 - :teamId needs to be a number');
    return;
  }

  let result = await NHL_API.getRosterPlayersFull(teamId);
  res.json(result);
});

router.get('/getPlayerInfo/:playerId', async function (req, res) {
  let playerId = req.params.playerId;

  if (typeof req.params.playerId == 'number') {
    res.status(400).json('400 - :playerId needs to be a number');
  }

  let result = await NHL_API.getPlayerInfo(playerId);
  res.json(result);
});

router.get('/getPlayerStats/:playerId/:season', async function (req, res) {
  let playerId = req.params.playerId;
  let season = req.params.season;

  if (typeof req.params.playerId == 'number') {
    res.status(400).json('400 - :playerId needs to be a number');
  }
  if (typeof req.params.season == 'number') {
    res.status(400).json('400 - :season needs to be a number');
  }

  let result = await NHL_API.getPlayerStats(playerId, season);
  res.json(result);
});

router.get('/getPlayer/:playerId/:season', async function (req, res) {
  let playerId = req.params.playerId;
  let season = req.params.season;

  if (typeof req.params.playerId == 'number') {
    res.status(400).json('400 - :playerId needs to be a number');
  }
  if (typeof req.params.season == 'number') {
    res.status(400).json('400 - :season needs to be a number');
  }

  let result = await NHL_API.getPlayer(playerId, season);
  res.json(result);
});

module.exports = router;
