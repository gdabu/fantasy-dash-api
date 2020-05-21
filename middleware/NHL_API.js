const axios = require('axios').default;

const NHL_API = {
  getAllTeams() {
    return new Promise((resolve, reject) => {
      axios
        .get('https://statsapi.web.nhl.com/api/v1/teams')
        .then((result) => {
          resolve(result.data.teams);
        })
        .catch((error) => reject(error));
    });
  },

  async getTeam(teamId) {
    return this.getAllTeams().then((result) => result.find((team) => team.id == teamId));
  },

  getRoster(teamId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster`)
        .then((result) => {
          resolve(result.data.roster);
        })
        .catch((error) => reject(error));
    });
  },

  getRosters() {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster`)
        .then((result) => {
          let teams = result.data.teams;
          let allTeamRosters = [];

          teams.forEach((team) => {
            let singleTeamRoster = team.roster.roster;
            singleTeamRoster.forEach((player) => {
              player.currentTeam = { id: team.id, name: team.name, teamName: team.teamName };
            });

            allTeamRosters.push(...singleTeamRoster);
          });

          resolve(allTeamRosters);
        })
        .catch((error) => reject(error));
    });
  },

  async getAllRosteredPlayers() {
    let allTeams = await this.getAllTeams();

    // send an async request for every roster, and push the promises into a single array.
    // each promise resolves an array of all players on that roster.
    let teamsPromiseArray = allTeams.map((team) => {
      return new Promise((resolve, reject) => {
        this.getRoster(team.id)
          .then((roster) => {
            // add team info to the player object
            roster.forEach((player) => {
              player.currentTeam = { id: team.id, name: team.name, teamName: team.teamName };
            });

            resolve(roster);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });

    // once the all the roster promises are resolved, combine all the players into one array.
    return await Promise.all(teamsPromiseArray).then((result) => {
      let players = [];

      result.forEach((element) => {
        players.push(...element);
      });

      return players;
    });
  },

  getPlayerInfo(playerId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}`)
        .then((player) => {
          resolve(player.data.people[0]);
        })
        .catch((error) => reject(error));
    });
  },

  getPlayerStats(playerId, season) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=${season}`
        )
        .then((stats) => {
          let { season, stat } = stats.data.stats[0].splits[0];

          let seasonStats = {
            season: season,
            ...stat,
          };

          // add player id to resolved player stat object
          resolve({
            stats: [seasonStats],
          });
        })
        .catch((error) => reject(error));
    });
  },

  async getPlayer(playerId, season) {
    return await Promise.all([
      this.getPlayerInfo(playerId),
      this.getPlayerStats(playerId, season),
    ]).then((player) => {
      return Object.assign(...player);
    });
  },
};

module.exports = NHL_API;
