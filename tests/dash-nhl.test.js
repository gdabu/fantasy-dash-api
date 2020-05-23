const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

const league = 'nhl';

describe('Testing /nhl/getAllTeams', () => {
  it('/', async (done) => {
    const response = await request.get('/nhl/getAllTeams');
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
