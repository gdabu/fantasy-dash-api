const axios = require('axios').default;

const NHL_API = {
  getAllTeams(season = 20192020) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://statsapi.web.nhl.com/api/v1/teams?season=${season}`)
        .then((result) => {
          resolve(result.data.teams);
        })
        .catch((error) => reject(error));
    });
  },

  getTeam(teamId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}`)
        .then((result) => {
          resolve(result.data.teams[0]);
        })
        .catch((error) => reject(error));
    });
  },

  getRoster(teamId, season = 20192020) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster?season=${season}`)
        .then((result) => {
          resolve(result.data.roster);
        })
        .catch((error) => reject(error));
    });
  },

  getAllRosteredPlayers(season = 20192020) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster&season=${season}`)
        .then((result) => {
          let teams = result.data.teams;
          let allPlayers = [];

          teams.forEach((team) => {
            let singleTeamRoster = team.roster.roster;
            singleTeamRoster.forEach((player) => {
              player.team = { id: team.id, name: team.name, teamName: team.teamName };
            });

            allPlayers.push(...singleTeamRoster);
          });

          resolve(allPlayers);
        })
        .catch((error) => reject(error));
    });
  },

  async getRosterPlayersFull(teamId, season = 20192020) {
    let allPlayers = await this.getRoster(teamId, season);

    let fullPlayerPromise = [];

    allPlayers.forEach((player) => {
      fullPlayerPromise.push(
        new Promise((resolve, reject) => {
          this.getPlayer(player.person.id, season)
            .then((fullPlayer) => resolve(fullPlayer))
            .catch((error) => reject(error));
        }).catch((error) => console.log(error))
      );
    });

    return Promise.all(fullPlayerPromise);
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
          // Check for empty stats
          if (stats.data.stats[0].splits[0] === undefined) {
            resolve({ stats: [] });
            return;
          }

          let { season, stat } = stats.data.stats[0].splits[0];
          let seasonStats = {
            season: season,
            ...stat,
          };

          resolve({
            stats: [seasonStats],
          });
        })
        .catch((error) => reject(error));
    });
  },

  getPlayer(playerId, season) {
    let playerInfoPromise = this.getPlayerInfo(playerId);
    let playerStatsPromise = this.getPlayerStats(playerId, season);

    return Promise.all([playerInfoPromise, playerStatsPromise]).then((player) => {
      return Object.assign({}, ...player);
    });
  },
};

module.exports = NHL_API;
