const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

const league = 'nhl';

describe('/', () => {
  it('/', async (done) => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toBe('text/html; charset=utf-8');
    done();
  });
});

describe('/nhl/getAllTeams', () => {
  it('/', async (done) => {
    const response = await request.get('/nhl/getAllTeams');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    done();
  });

  it('/getAllTeams?season=20162017', async (done) => {
    const response = await request.get('/nhl/getAllTeams?season=20162017');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    done();
  });

  it('?season=20152222', async (done) => {
    const response = await request.get('/nhl/getAllTeams?season=20152222');
    expect(response.status).toBe(404);
    expect(response.body).toBe('404 - Not Found');
    done();
  });

  it('?season=asdf', async (done) => {
    const response = await request.get('/nhl/getAllTeams?season=asdf');
    expect(response.status).toBe(400);
    expect(response.body).toBe(
      '400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)'
    );
    done();
  });
});

describe('/nhl/getTeam', () => {
  it('/', async (done) => {
    const response = await request.get('/nhl/getTeam');
    expect(response.status).toBe(400);
    expect(response.body).toBe("400 - :teamId can't be empty");
    done();
  });

  it('?teamId=23', async (done) => {
    const response = await request.get('/nhl/getTeam?teamId=23');
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.abbreviation).toBe('VAN');
    done();
  });

  it('?teamId=1000', async (done) => {
    const response = await request.get('/nhl/getTeam?teamId=1000');
    expect(response.status).toBe(404);
    expect(response.body).toBe('404 - Not Found');
    done();
  });

  it('?teamId=asdf', async (done) => {
    const response = await request.get('/nhl/getTeam?teamId=asdf');
    expect(response.status).toBe(400);
    expect(response.body).toBe('400 - :teamId needs to be a number');
    done();
  });
});

describe('/nhl/getRoster', () => {
  it('/', async (done) => {
    const response = await request.get('/nhl/getRoster');
    expect(response.status).toBe(400);
    expect(response.body).toBe("400 - :teamId can't be empty");
    done();
  });

  it('?teamId=23', async (done) => {
    const response = await request.get('/nhl/getRoster?teamId=23');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    done();
  });

  it('?teamId=1000', async (done) => {
    const response = await request.get('/nhl/getRoster?teamId=1000');
    expect(response.status).toBe(404);
    expect(response.body).toBe('404 - Not Found');
    done();
  });

  it('?teamId=asdf', async (done) => {
    const response = await request.get('/nhl/getRoster?teamId=asdf');
    expect(response.status).toBe(400);
    expect(response.body).toBe('400 - :teamId needs to be a number');
    done();
  });

  it('?teamId=23&season=20162017', async (done) => {
    const response = await request.get('/nhl/getRoster?teamId=23&season=20162017');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    done();
  });

  it('?teamId=23&season=asdf', async (done) => {
    const response = await request.get('/nhl/getRoster?teamId=23&season=asdf');
    expect(response.status).toBe(400);
    expect(response.body).toBe(
      '400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)'
    );
    done();
  });

  it('?teamId=23&season=10001001', async (done) => {
    const response = await request.get('/nhl/getRoster?teamId=23&season=10001001');
    expect(response.status).toBe(404);
    expect(response.body).toBe('404 - Not Found');
    done();
  });
});

describe('/nhl/getAllRosteredPlayers', () => {
  it('/', async (done) => {
    const response = await request.get('/nhl/getAllRosteredPlayers');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    done();
  });

  it('/getAllTeams?season=20162017', async (done) => {
    const response = await request.get('/nhl/getAllRosteredPlayers?season=20162017');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    done();
  });

  it('?season=20152222', async (done) => {
    const response = await request.get('/nhl/getAllRosteredPlayers?season=20152222');
    expect(response.status).toBe(404);
    expect(response.body).toBe('404 - Not Found');
    done();
  });

  it('?season=asdf', async (done) => {
    const response = await request.get('/nhl/getAllRosteredPlayers?season=asdf');
    expect(response.status).toBe(400);
    expect(response.body).toBe(
      '400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)'
    );
    done();
  });
});

describe('/nhl/getPlayerStats', () => {
  it('/', async (done) => {
    const response = await request.get('/nhl/getPlayerStats');
    expect(response.status).toBe(400);
    expect(response.body).toBe("400 - :playerId can't be empty");
    done();
  });

  it('?playerId=8471239', async (done) => {
    const response = await request.get('/nhl/getPlayerStats?playerId=8471239');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.stats)).toBe(true);
    done();
  });

  it('?playerId=1', async (done) => {
    const response = await request.get('/nhl/getPlayerStats?playerId=1');
    expect(response.status).toBe(404);
    expect(response.body).toBe('404 - Not Found');
    done();
  });

  it('?playerId=asdf', async (done) => {
    const response = await request.get('/nhl/getPlayerStats?playerId=asdf');
    expect(response.status).toBe(400);
    expect(response.body).toBe('400 - :playerId needs to be a number');
    done();
  });

  it('?playerId=8471239&season=20162017', async (done) => {
    const response = await request.get('/nhl/getPlayerStats?playerId=8471239&season=20162017');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.stats)).toBe(true);
    done();
  });

  it('?playerId=8471239&season=asdf', async (done) => {
    const response = await request.get('/nhl/getPlayerStats?playerId=8471239&season=asdf');
    expect(response.status).toBe(400);
    expect(response.body).toBe(
      '400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)'
    );
    done();
  });

  it('?playerId=8471239&season=10001001', async (done) => {
    const response = await request.get('/nhl/getPlayerStats?playerId=8471239&season=20002001');
    expect(response.status).toBe(200);
    expect(response.body.stats.length).toBe(0);
    done();
  });
});

describe('/nhl/getPlayerInfo', () => {
  it('/', async (done) => {
    const response = await request.get('/nhl/getPlayerInfo');
    expect(response.status).toBe(400);
    expect(response.body).toBe("400 - :playerId can't be empty");
    done();
  });

  it('?playerId=8471239', async (done) => {
    const response = await request.get('/nhl/getPlayerInfo?playerId=8471239');
    expect(response.status).toBe(200);
    expect(response.body.fullName !== undefined).toBe(true);
    done();
  });

  it('?playerId=1', async (done) => {
    const response = await request.get('/nhl/getPlayerInfo?playerId=1');
    expect(response.status).toBe(404);
    expect(response.body).toBe('404 - Not Found');
    done();
  });

  it('?playerId=asdf', async (done) => {
    const response = await request.get('/nhl/getPlayerInfo?playerId=asdf');
    expect(response.status).toBe(400);
    expect(response.body).toBe('400 - :playerId needs to be a number');
    done();
  });
});

describe('/nhl/getPlayer', () => {
  it('/', async (done) => {
    const response = await request.get('/nhl/getPlayer');
    expect(response.status).toBe(400);
    expect(response.body).toBe("400 - :playerId can't be empty");
    done();
  });

  it('?playerId=8471239', async (done) => {
    const response = await request.get('/nhl/getPlayer?playerId=8471239');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.stats)).toBe(true);
    done();
  });

  it('?playerId=1', async (done) => {
    const response = await request.get('/nhl/getPlayer?playerId=1');
    expect(response.status).toBe(404);
    expect(response.body).toBe('404 - Not Found');
    done();
  });

  it('?playerId=asdf', async (done) => {
    const response = await request.get('/nhl/getPlayer?playerId=asdf');
    expect(response.status).toBe(400);
    expect(response.body).toBe('400 - :playerId needs to be a number');
    done();
  });

  it('?playerId=8471239&season=20162017', async (done) => {
    const response = await request.get('/nhl/getPlayer?playerId=8471239&season=20162017');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.stats)).toBe(true);
    expect(response.body.stats[0].season).toBe('20162017');
    done();
  });

  it('?playerId=8471239&season=asdf', async (done) => {
    const response = await request.get('/nhl/getPlayer?playerId=8471239&season=asdf');
    expect(response.status).toBe(400);
    expect(response.body).toBe(
      '400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)'
    );
    done();
  });

  it('?playerId=8471239&season=10001001', async (done) => {
    const response = await request.get('/nhl/getPlayer?playerId=8471239&season=20002001');
    expect(response.status).toBe(200);
    expect(response.body.stats.length).toBe(0);
    done();
  });
});

describe('/nhl/getRosterPlayersFull', () => {
  it('/', async (done) => {
    const response = await request.get('/nhl/getRosterPlayersFull');
    expect(response.status).toBe(400);
    expect(response.body).toBe("400 - :teamId can't be empty");
    done();
  });

  it('?teamId=23', async (done) => {
    const response = await request.get('/nhl/getRosterPlayersFull?teamId=23');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    done();
  });

  it('?teamId=1000', async (done) => {
    const response = await request.get('/nhl/getRosterPlayersFull?teamId=1000');
    expect(response.status).toBe(404);
    expect(response.body).toBe('404 - Not Found');
    done();
  });

  it('?teamId=asdf', async (done) => {
    const response = await request.get('/nhl/getRosterPlayersFull?teamId=asdf');
    expect(response.status).toBe(400);
    expect(response.body).toBe('400 - :teamId needs to be a number');
    done();
  });

  it('?teamId=23&season=20162017', async (done) => {
    const response = await request.get('/nhl/getRosterPlayersFull?teamId=23&season=20162017');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].id !== undefined).toBe(true);
    done();
  });

  it('?teamId=23&season=asdf', async (done) => {
    const response = await request.get('/nhl/getRosterPlayersFull?teamId=23&season=asdf');
    expect(response.status).toBe(400);
    expect(response.body).toBe(
      '400 - :season needs to follow proper format - yyyyyyyy (Example: 20192020)'
    );
    done();
  });

  it('?teamId=23&season=10001001', async (done) => {
    const response = await request.get('/nhl/getRosterPlayersFull?teamId=23&season=10001001');
    expect(response.status).toBe(404);
    expect(response.body).toBe('404 - Not Found');
    done();
  });
});
