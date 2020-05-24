const app = require('../app'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);

describe('/fasdhfkasjhdfkjashdfjkahsdfjkhasdjkfhaskdjfh', () => {
  it('/', async (done) => {
    const response = await request.get('/fasdhfkasjhdfkjashdfjkahsdfjkhasdjkfhaskdjfh');
    expect(response.status).toBe(404);
    done();
  });
});
