const pool = require("../db_config");

exports.getAllTodo  = async (req, res) => {
    try {
        const newTodo = await pool.query("SELECT * FROM todo");
        res.json(newTodo.rows);
    }
    catch (err) {
        res.json(err);
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const newTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [req.params.id]);
        res.json(newTodo.rows[0]);
    }
    catch (err) {
        res.json(err);
    }
}

exports.createTodo = async (req, res) => {
    try {
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES $1 RETURNING *", [req.body.description]);
        res.json(newTodo.rows[0]);
    }
    catch (err) {
        res.json(err);
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const newTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *", [req.body.description, req.params.id]);
        res.json(newTodo.rows[0]);
    }
    catch (err) {
        res.json(err);
    }
};