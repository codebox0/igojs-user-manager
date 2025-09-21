const Model = require('igo').Model;

const UserSchema = {
  table: 'users',
  columns: [
    'id',
    'email',
    'first_name',
    'last_name',
    'password',
    'role',
    'status',
  ],
};

class User extends Model(UserSchema) {
  //override constructor if needed
  constructor(values) {
    super(values);
  }

  name() {
    return this.first_name + ' ' + this.last_name;
  }
}

module.exports = { User, UserSchema };
