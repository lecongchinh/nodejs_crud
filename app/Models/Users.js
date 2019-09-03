let ObjectId = require('mongodb').ObjectID;
let MongoClient = require('mongodb').MongoClient;
class User {

    constructor(url, dbname) {
        this.url = url;
        this.dbname = dbname;
    }

    index() {
        return new Promise((resolve, reject) => {
            let self = this;
            MongoClient.connect(self.url, (err, db) => {
                if (err) return reject(err);
                let dbo = db.db(self.dbname);
                dbo.collection("users").find({}).toArray((err, result) => {
                    (err ? reject(err) : resolve(result));
                    db.close();
                });
            });
        })
    }

    create(req) {
        return new Promise((resolve, reject) => {
            let self = this;
            MongoClient.connect(self.url, (err, db) => {
                if (err) return reject(err);
                let dbo = db.db(self.dbname);
                dbo.collection("users").insertOne(
                    {name: req.name, email: req.email, password: req.password}, (err, result) => {
                        err ? reject (err) : resolve(result);
                        db.close();
                    }
                )
            });
        })
    }

    update(req, id) {
        return new Promise((resolve, reject) => {
            let self = this;
            MongoClient.connect(this.url, (err, db) => {
                if(err) return reject(err);
                let dbo = db.db(self.dbname);
                dbo.collection("users").updateOne(
                    {_id: ObjectId(id)},
                    { $set: {name: req.name}},
                    (err, result) => {
                        err ? reject(err) : resolve(result);
                        db.close();
                    }
                )
            })
        })
    }

    destroy(id) {
        return new Promise((resolve, reject) => {
            let self = this;
            MongoClient.connect(self.url, (err, db) => {
                if (err) return reject(err);
                let dbo = db.db(self.dbname);
                dbo.collection("users").deleteOne({_id: ObjectId(id)}, (err, result) => {
                    err ? reject(err) : resolve(result);
                    db.close();
                })
            });
        })
    }
}

module.exports = User;