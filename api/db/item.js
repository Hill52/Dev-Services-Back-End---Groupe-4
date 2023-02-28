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

function getItems(id) {
    return db("item").select("*").where("command_id", id);
}

module.exports = {
    getItems,
};