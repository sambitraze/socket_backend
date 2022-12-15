const { Pool } = require("pg");

const pool = new Pool({
    user: "ezchatadmin",
    password: "ezchatadmin1234",
    database: "ezchatdb",
    host: "52.66.200.77",
    port: 5432
});
module.exports = pool;