require('igo').dev.test();

const UserService = require('../../app/services/user/user.service');
const assert = require('assert');
const agent = require('igo').dev.agent;

describe('controllers/UserController', function () {
  let testUserId;

  // Clean up test user after tests
  after(async () => {
    if (testUserId) {
      try {
        await UserService.delete(testUserId);
      } catch (error) {
        console.error('Error deleting test user:', error);
      }
    }
  });

  describe('GET /users', function () {
    it('should show user list page', async () => {
      const res = await agent.get('/users');
      assert.strictEqual(res.statusCode, 200);
    });
  });

  describe('GET /users/new', function () {
    it('should show create user form', async () => {
      const res = await agent.get('/users/new');
      assert.strictEqual(res.statusCode, 200);
    });
  });

  describe('GET /users/:id', function () {
    it('should show user details for valid ID', async () => {
      // Create a test user first
      const user = await UserService.create({
        email: 'test@example.com',
        password: 'password123',
        first_name: 'John',
        last_name: 'Doe',
        role: 'user',
        status: 'active',
      });
      testUserId = user.id;

      const res = await agent.get(`/users/${user.id}`);
      assert.strictEqual(res.statusCode, 200);
    });

    it('should redirect for invalid user ID', async () => {
      const res = await agent.get('/users/999999');
      assert.strictEqual(res.statusCode, 302);
    });
  });

  describe('POST /users/create', function () {
    it('should create a new user with valid data', async () => {
      const userData = {
        email: 'newuser@example.com',
        password: 'password123',
        first_name: 'Jane',
        last_name: 'Smith',
        role: 'user',
        status: 'active',
      };

      const res = await agent.post('/users/create', userData);
      assert.strictEqual(res.statusCode, 302);
    });
  });

  describe('POST /users/:id/edit', function () {
    it('should update user with valid data', async () => {
      // Create a test user first
      const user = await UserService.create({
        email: 'updatetest@example.com',
        password: 'password123',
        first_name: 'Update',
        last_name: 'Test',
        role: 'user',
        status: 'active',
      });
      testUserId = user.id;

      const updateData = {
        email: 'updated@example.com',
        first_name: 'Updated',
        last_name: 'Name',
        role: 'admin',
        status: 'active',
      };

      const res = await agent.post(`/users/${user.id}/edit`, updateData);
      assert.strictEqual(res.statusCode, 302);
    });
  });

  describe('POST /users/:id (DELETE)', function () {
    it('should delete user with valid ID', async () => {
      // Create a test user first
      const user = await UserService.create({
        email: 'todelete@example.com',
        password: 'password123',
        first_name: 'Delete',
        last_name: 'Me',
        role: 'user',
        status: 'active',
      });

      const res = await agent.post(`/users/${user.id}`, { _method: 'DELETE' });
      assert.strictEqual(res.statusCode, 302);
    });
  });
});
