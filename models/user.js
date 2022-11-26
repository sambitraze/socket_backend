var db = require('../db_config');

var User = function (user) {
    this.uuid = user.uuid;
    this.chatstatus = user.chatstatus;
}

User.createUser = function (newUser, callback) {
    db.query("INSERT INTO users (uuid, chatstatus) VALUES ($1, $2) ? RETURNING *", [newUser.uuid, newUser.chatstatus], function (err, res) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, res.insertId);
        }
    });
}

User.getAllUser = function (callback) {
    db.query("SELECT * FROM users", function (err, res) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            callback(null, res.rows);
        }
    });
}

module.exports = User;