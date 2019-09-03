require('dotenv').config();
const Users = require("../../Models/Users");

// const dbConnection = require('../../../config/dbConnection.js');

let url = process.env.MONGO_URL;
let dbname = process.env.MONGO_DBNAME;
let users = new Users(url, dbname);

// let users = new Users(dbConnection);

class UserController {
    index(req, res, next) {
        // return 1;
        users.index()
            .then((users) => {
                res.json(users);
            })
            .catch(next);
    }

    create(req, res, next) {
        users.create(req.body)
            .then((users) => {
                res.json(users);
            })
            .catch(next);
        // console.log(req.body.name);
    }

    update(req, res, next) {
        users.update(req.body, req.params.id)
            .then((users) => {
                console.log(req.body);
                res.json(users);
            })
            .catch(next);
    }

    destroy(req, res, next) {
        // console.log(req.params.id);
        users.destroy(req.params.id)
            .then((users) => {
                res.json(users);
            })
            .catch(next);
    }
}

module.exports = UserController;