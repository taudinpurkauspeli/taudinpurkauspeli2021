const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const db = require('../models');

const User = db.users;
const { initialUsers } = require('./test_helper');

describe('get users', () => {
  beforeEach(async () => {
    // deletes the content from the table 'users'
    await db.sequelize.sync({ force: true });
    // inserts test users in the table 'users'
    await User.bulkCreate(initialUsers);
  });

  test('all users are returned', async () => {
    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(initialUsers.length);
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
