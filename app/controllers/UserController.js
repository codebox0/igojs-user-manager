const UserService = require('../services/user/user.service');
const CreateUserForm = require('../models/CreateUserForm');
const UpdateUserForm = require('../models/UpdateUserForm');

async function listUsers(req, res) {
  try {
    const users = await UserService.getAll();

    res.render('user/list', {
      users: users,
      helpers: {
        checkStatus: (status) => status === 'active',
        checkRole: (role) => role === 'admin',
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    req.flash('error', 'Erreur lors du chargement des utilisateurs');
    res.render('user/list', { users: [] });
  }
}

async function showUser(req, res) {
  try {
    const user = await UserService.getUserById(req.params.id);

    if (!user) {
      req.flash('error', 'Utilisateur non trouvé');
      return res.redirect('/users');
    }

    res.render('user/form', {
      user: user,
      mode: 'show',
      isShow: true,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    req.flash('error', 'Erreur lors du chargement de l\'utilisateur');
    res.redirect('/users');
  }
}

async function editUser(req, res) {
  try {
    const user = await UserService.getUserById(req.params.id);

    if (!user) {
      req.flash('error', 'Utilisateur non trouvé');
      return res.redirect('/users');
    }

    res.render('user/form', {
      user: user,
      mode: 'edit',
      isEdit: true,
    });
  } catch (error) {
    console.error('Error fetching user for edit:', error);
    req.flash('error', 'Erreur lors du chargement de l\'utilisateur');
    res.redirect('/users');
  }
}

async function newUser(req, res) {
  res.render('user/form', {
    user: {},
    mode: 'create',
  });
}

async function createUser(req, res) {
  try {
    const form = new CreateUserForm().submit(req);

    if (form.errors) {
      req.flash('form', form);
      return res.redirect('/users/new');
    }

    await UserService.create(form._src);
    req.flash('success', 'Utilisateur créé avec succès');
    res.redirect('/users');
  } catch (error) {
    console.error('Error creating user:', error);
    req.flash('error', 'Erreur lors de la création de l\'utilisateur');
    res.redirect('/users/new');
  }
}

async function updateUser(req, res) {
  try {
    const form = new UpdateUserForm().submit(req);

    if (form.errors) {
      req.flash('form', form);
      return res.redirect(`/users/${req.params.id}/edit`);
    }

    await UserService.update(req.params.id, form._src);
    req.flash('success', 'Utilisateur modifié avec succès');
    res.redirect('/users');
  } catch (error) {
    console.error('Error updating user:', error);
    req.flash('error', 'Erreur lors de la modification de l\'utilisateur');
    res.redirect(`/users/${req.params.id}/edit`);
  }
}

async function deleteUser(req, res) {
  try {
    if (!req.params.id) {
      req.flash('error', 'ID utilisateur requis');
      return res.redirect('/users');
    }

    await UserService.delete(req.params.id);
    req.flash('success', 'Utilisateur supprimé avec succès');
    res.redirect('/users');
  } catch (error) {
    console.error('Error deleting user:', error);
    req.flash('error', 'Erreur lors de la suppression de l\'utilisateur');
    res.redirect('/users');
  }
}

module.exports = {
  listUsers,
  showUser,
  editUser,
  newUser,
  createUser,
  updateUser,
  deleteUser,
};
