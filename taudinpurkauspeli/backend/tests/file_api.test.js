const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('Getting files works', () => {
  test('Files are returned as pdf', async () => {
    await api
      .get('/api/files/fi')
      .expect(200)
      .expect('Content-Type', /application\/pdf/);

    await api
      .get('/api/files/en')
      .expect(200)
      .expect('Content-Type', /application\/pdf/);
  });
});
