const { User } = require('../../models/userModel');

/**
 * User service class
 * @class UserService
 * @static
 * @method getAll
 * @method create
 * @method getUserById
 * @method update
 * @method createDefault
 */
class UserService {
  /**
   * Get all users
   * @returns {Promise<User[]>} - All users
   */
  static async getAll() {
    return await User.list();
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<User>} - Created user instance
   */
  static async create(userData) {
    try {
      // Create the user
      const user = await User.create(userData);
      return user;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  static async getUserById(id) {
    if (!id) {
      throw new Error('Id is required');
    }

    return await User.find(id);
  }

  /**
   * Update a user
   * @param {string} id - User id
   * @param {Object} updateData - User data to update
   * @returns {Promise<User>} - Updated user instance
   */
  static async update(id, updateData) {
    try {
      if (!id) {
        throw new Error('User ID is required');
      }

      // Check if the user exists
      const user = await User.find(id);
      if (!user) {
        throw new Error('User not found');
      }

      console.log(updateData);

      // Update the user
      await user.update(updateData);
      return user;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  /**
   * Delete a user
   * @param {string} id - User id
   * @returns {Promise<User>} - Deleted user instance
   */
  static async delete(id) {
    if (!id) {
      throw new Error('Id is required');
    }

    return await User.destroy(id);
  }

  /**
   * Create a default user (for tests)
   * @returns {Promise<User>} - Created user instance
   */
  static async createDefault() {
    return await this.create({
      email: 'test@example.com',
      password: 'password123',
      first_name: 'John',
      last_name: 'Doe',
      role: 'user',
      status: 'active',
    });
  }
}

module.exports = UserService;
