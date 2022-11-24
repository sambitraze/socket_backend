const UserModel = require('../models/user.js');

exports.getAllUser = (req, res) => {
    UserModel.getAllUser((err, users) => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.json(users);
        }
    });
}

exports.createUser = (req, res) => {
    const user = new UserModel(req.body);
    UserModel.createUser(user, (err, user) => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.json(user);
        }
    });
}