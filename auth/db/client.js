const knex = require("knex");

let db = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
        database: process.env.MARIADB_DATABASE,
    },
});

function getClients() {
    console.log("db", process.env.DB_HOST, process.env.MARIADB_USER, process.env.MARIADB_PASSWORD, process.env.MARIADB_DATABASE);

    return db("client").select("*");
}

module.exports = {
    getClients,
};