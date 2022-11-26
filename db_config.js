const { Pool } = require("pg");

const pool = new Pool({
    user: "ezchat",
    password: "admin@#123",
    database: "ezchatdb",
    host: "3.110.186.109",
    port: 5432
});
module.exports = pool;