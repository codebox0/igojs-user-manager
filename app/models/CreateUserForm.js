const { Form } = require('igo');
const { UserSchema } = require('./userModel');

class CreateUserForm extends Form(UserSchema) {
  validate(req) {
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('last_name', 'Last name is required').notEmpty();
    req.checkBody('role', 'Role is required').notEmpty();
  }
}

module.exports = CreateUserForm;
