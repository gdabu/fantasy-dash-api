let express = require('express');
let router = express.Router();

const NHL_STATS_API = require('../connectors/connector-nhl-stats-api.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Fantasy Dash API - NHL' });
});

/**
 * /getAllTeams
 * Gets a list of all teams currently in the league.
 */
router.get('/getAllTeams', async function (req, res) {
  let { season } = req.query;

  // regex validation for proper YYYYYYYY format
  if (season !== undefined && !RegExp('\\d{8}').test(season)) {
    res
      .status(400)
      .json('400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)');
    return;
  }

  let { status, payload } = await NHL_STATS_API.getAllTeams(season).catch((error) => {
    return error;
  });
  res.status(status).json(payload);
});

/**
 * /getTeam
 * Gets a specified team.
 * @queryparam teamId (Required)
 */
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

  let { status, payload } = await NHL_STATS_API.getTeam(teamId).catch((error) => {
    return error;
  });
  res.status(status).json(payload);
});

/**
 * /getRoster
 * Gets a list of all the players of a specified team for a specified season.
 * @queryparam teamId (Required)
 * @queryparam season
 */
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

  // regex validation for proper YYYYYYYY format
  if (season !== undefined && !RegExp('\\d{8}').test(season)) {
    res
      .status(400)
      .json('400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)');
    return;
  }

  let { status, payload } = await NHL_STATS_API.getRoster(teamId, season).catch((error) => {
    return error;
  });
  res.status(status).json(payload);
});

/**
 * /getAllRosteredPlayers
 * Gets a list of all players who were on any team roster for a specified season.
 * @queryparam season
 */
router.get('/getAllRosteredPlayers', async function (req, res) {
  let { season } = req.query;

  // regex validation for proper YYYYYYYY format
  if (season !== undefined && !RegExp('\\d{8}').test(season)) {
    res
      .status(400)
      .json('400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)');
    return;
  }

  let { status, payload } = await NHL_STATS_API.getAllRosteredPlayers(season).catch((error) => {
    return error;
  });
  res.status(status).json(payload);
});

/**
 * /getPlayerInfo
 * Gets the info of a specified player
 * @queryparam playerId (Required)
 */
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

  let { status, payload } = await NHL_STATS_API.getPlayerInfo(playerId).catch((error) => {
    return error;
  });
  res.status(status).json(payload);
});

/**
 * /getPlayerStats
 * Gets the stats of a specified player for a specified season
 * @queryparam playerId (Required)
 * @queryparam season
 * @queryparam statType
 */
router.get('/getPlayerStats', async function (req, res) {
  let { playerId, season, statType } = req.query;

  if (playerId === undefined) {
    res.status(400).json(`400 - :playerId can't be empty`);
    return;
  }

  if (isNaN(playerId)) {
    res.status(400).json('400 - :playerId needs to be a number');
    return;
  }

  // regex validation for proper YYYYYYYY format
  if (season !== undefined && !RegExp('\\d{8}').test(season)) {
    res
      .status(400)
      .json('400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)');
    return;
  }

  let { status, payload } = await NHL_STATS_API.getPlayerStats(playerId, season, statType).catch(
    (error) => {
      return error;
    }
  );
  res.status(status).json(payload);
});

/**
 * /getPlayer
 * Gets the full info list of a specified player, and their stats for the specified season.
 * @queryparam playerId (Required)
 * @queryparam season
 * @queryparam statType
 */
router.get('/getPlayerFull', async function (req, res) {
  let { playerId, season, statType } = req.query;

  if (playerId === undefined) {
    res.status(400).json(`400 - :playerId can't be empty`);
    return;
  }

  if (isNaN(playerId)) {
    res.status(400).json('400 - :playerId needs to be a number');
    return;
  }

  // regex validation for proper YYYYYYYY format
  if (season !== undefined && !RegExp('\\d{8}').test(season)) {
    res
      .status(400)
      .json('400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)');
    return;
  }

  let { status, payload } = await NHL_STATS_API.getPlayerFull(playerId, season, statType).catch(
    (error) => {
      return error;
    }
  );
  res.status(status).json(payload);
});

/**
 * /getRosterPlayersFull
 * Gets a list of all players who were on a specified team for a specified season. The players full information and
 * stats for the specified season will be included.
 * @queryparam teamId (Required)
 * @queryparam season
 */
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

  // regex validation for proper YYYYYYYY format
  if (season !== undefined && !RegExp('\\d{8}').test(season)) {
    res
      .status(400)
      .json('400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)');
    return;
  }

  let { status, payload } = await NHL_STATS_API.getRosterPlayersFull(teamId, season).catch(
    (error) => {
      return error;
    }
  );
  res.status(status).json(payload);
});

module.exports = router;
