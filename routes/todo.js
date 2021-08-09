const express = require("express");
const router = express.Router();

const Todo = require("../controllers/todo");

router.get("/", Todo.getAllTodo);
router.get("/:id", Todo.getTodoById);
router.post("/", Todo.createTodo);
router.put("/:id", Todo.updateTodo);

module.exports = router;