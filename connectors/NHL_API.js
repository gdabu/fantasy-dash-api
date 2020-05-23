const axios = require('axios').default;

// axios.interceptors.request.use((request) => {
//   console.log('Starting Request', request.url);
//   return request;
// });

const NHL_API = {
  getAllTeams(season = 20192020) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://statsapi.web.nhl.com/api/v1/teams?season=${season}`)
        .then((result) => {
          resolve({ status: 200, payload: result.data.teams });
        })
        .catch((error) => {
          let { status, statusText } = error.response;
          reject({ status, payload: `${status} - ${statusText}` });
        });
    });
  },

  getTeam(teamId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}`)
        .then((result) => {
          resolve({ status: 200, payload: result.data.teams[0] });
        })
        .catch((error) => {
          let { status, statusText } = error.response;
          reject({ status, payload: `${status} - ${statusText}` });
        });
    });
  },

  getRoster(teamId, season = 20192020) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster?season=${season}`)
        .then((result) => {
          resolve({ status: 200, payload: result.data.roster });
        })
        .catch((error) => {
          let { status, statusText } = error.response;
          reject({ status, payload: `${status} - ${statusText}` });
        });
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

          resolve({ status: 200, payload: allPlayers });
        })
        .catch((error) => {
          let { status, statusText } = error.response;
          reject({ status, payload: `${status} - ${statusText}` });
        });
    });
  },

  getPlayerInfo(playerId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}`)
        .then((result) => {
          resolve({ status: 200, payload: result.data.people[0] });
        })
        .catch((error) => {
          let { status, statusText } = error.response;
          reject({ status, payload: `${status} - ${statusText}` });
        });
    });
  },

  getPlayerStats(playerId, season = 20192020) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=statsSingleSeason&season=${season}`
        )
        .then((stats) => {
          // Check for empty stats
          if (stats.data.stats[0].splits[0] === undefined) {
            resolve({
              status: 200,
              payload: {
                stats: [],
              },
            });
            return;
          }

          let { season, stat } = stats.data.stats[0].splits[0];
          let seasonStats = {
            season: season,
            ...stat,
          };

          resolve({
            status: 200,
            payload: {
              stats: [seasonStats],
            },
          });
        })
        .catch((error) => {
          let { status, statusText } = error.response;

          if (status === 500) {
            status = 404;
            statusText = 'Not Found';
          }

          reject({ status, payload: `${status} - ${statusText}` });
        });
    });
  },

  getPlayer(playerId, season) {
    return new Promise((resolve, reject) => {
      let playerInfoPromise = this.getPlayerInfo(playerId);
      let playerStatsPromise = this.getPlayerStats(playerId, season);

      Promise.all([playerInfoPromise, playerStatsPromise])
        .then((result) => {
          let playerDetails = result.map((playerDetail) => {
            return playerDetail.payload;
          });

          resolve({ status: 200, payload: Object.assign({}, ...playerDetails) });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async getRosterPlayersFull(teamId, season = 20192020) {
    let allPlayers = await this.getRoster(teamId, season)
      .then((result) => {
        return result.payload;
      })
      .catch((error) => {
        throw error;
      });

    let fullPlayerPromise = [];

    allPlayers.forEach((player) => {
      fullPlayerPromise.push(
        new Promise(async (resolve, reject) => {
          this.getPlayer(player.person.id, season)
            .then((result) => {
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
        })
      );
    });

    return Promise.all(fullPlayerPromise)
      .then((result) => {
        let playerDetails = result.map((playerDetail) => {
          return playerDetail.payload;
        });

        return { status: 200, payload: playerDetails };
      })
      .catch((error) => {
        return error;
      });
  },
};

module.exports = NHL_API;
