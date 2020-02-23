"use strict";

const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: "localhost"
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return [
        {
          playerFirstName: "Damian",
          playerLastName: "Lillard",
          number: "0",
          currentTeam: "POR",
          seasons: [
            {
              year: 2019,
              team: "POR",
              stats: {
                GAMES_PLAYED: 54,
                POINTS: 1594,
                THREE_POINTS: 212,
                ASSISTS: 429,
                REOUNDS: 235,
                STEALS: 52,
                BLOCKS: 18,
                FIELD_GOAL_PCT: 46,
                FREE_THROW_PCT: 88.9,
                TURN_OVERS: 158
              }
            },
            {
              year: 2018,
              team: "POR",
              stats: {
                GAMES_PLAYED: 54,
                POINTS: 1594,
                THREE_POINTS: 212,
                ASSISTS: 429,
                REOUNDS: 235,
                STEALS: 52,
                BLOCKS: 18,
                FIELD_GOAL_PCT: 46,
                FREE_THROW_PCT: 88.9,
                TURN_OVERS: 158
              }
            }
          ]
        },,{
          playerFirstName: "Lebron",
          playerLastName: "James",
          number: "23",
          currentTeam: "LAL",
          seasons: [
            {
              year: 2019,
              team: "LAL",
              stats:{
                GAMES_PLAYED: 54,
                POINTS: 1594,
                  THREE_POINTS: 212,
                  ASSISTS: 429,
                  REOUNDS: 235,
                  STEALS: 52,
                  BLOCKS: 18,
                  FIELD_GOAL_PCT: 46,
                  FREE_THROW_PCT: 88.9,
                  TURN_OVERS: 158
                }
            },
            {
              year: 2018,
              team: "LAL",
              stats:{
                GAMES_PLAYED: 54,
                POINTS: 1594,
                  THREE_POINTS: 212,
                  ASSISTS: 429,
                  REOUNDS: 235,
                  STEALS: 52,
                  BLOCKS: 18,
                  FIELD_GOAL_PCT: 46,
                  FREE_THROW_PCT: 88.9,
                  TURN_OVERS: 158
                }
            }
          },
          {
          playerFirstName: "Giannis",
          playerLastName: "Antetokounmpo",
          number: "34",
          currentTeam: "MIL",
          seasons: [
            {
              year: 2019,
              team: "MIL",
              stats:{
                GAMES_PLAYED: 54,
                POINTS: 1594,
                  THREE_POINTS: 212,
                  ASSISTS: 429,
                  REOUNDS: 235,
                  STEALS: 52,
                  BLOCKS: 18,
                  FIELD_GOAL_PCT: 46,
                  FREE_THROW_PCT: 88.9,
                  TURN_OVERS: 158
                }
            },
            {
              year: 2018,
              team: "MIL",
              stats:{
                GAMES_PLAYED: 54,
                POINTS: 1594,
                  THREE_POINTS: 212,
                  ASSISTS: 429,
                  REOUNDS: 235,
                  STEALS: 52,
                  BLOCKS: 18,
                  FIELD_GOAL_PCT: 46,
                  FREE_THROW_PCT: 88.9,
                  TURN_OVERS: 158
                }
            }
      
          ]
        }
      ];
    }
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
