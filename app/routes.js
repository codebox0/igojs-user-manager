// Define your Express routes here
// Check http://expressjs.com/fr/guide/routing.html for documentation

const UserController = require('./controllers/UserController');

//
module.exports.init = (app) => {
  app.get('/', UserController.listUsers);

  app.get('/users', UserController.listUsers);
  app.get('/users/new', UserController.newUser);
  app.get('/users/:id', UserController.showUser);
  app.get('/users/:id/edit', UserController.editUser);

  app.post('/users/create', UserController.createUser);
  app.post('/users/:id/edit', UserController.updateUser);
  app.post('/users/:id', UserController.deleteUser);
};
