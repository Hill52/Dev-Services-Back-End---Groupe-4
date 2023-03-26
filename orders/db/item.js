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

function getItems() {
    return db("item").select("*");
}

function getItem(id) {
    return db("item").select("*").where("command_id", id);
}

function createItem(item, commandId) {
    return db("item").insert({
        uri: item.uri,
        libelle: item.name,
        quantite: item.q,
        tarif: item.price,
        command_id: commandId,
    });
}

module.exports = {
    getItem: getItem,
    getItems: getItems,
    createItem: createItem,
};