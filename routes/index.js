const express = require('express');
const router = express.Router();

let UserController = require('../app/Http/Controllers/UsersController.js');
// import { index } from '../app/Http/Controllers/UsersController';

let userController = new UserController();

/* GET home page. */

//users
router.get('/users', userController.index);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.destroy);

module.exports = router;
