const express = require("express");
var router = express();

const User = require("../controllers/user");

router.get("/", User.getAllUser);
router.post("/", User.createUser);

module.exports = router;