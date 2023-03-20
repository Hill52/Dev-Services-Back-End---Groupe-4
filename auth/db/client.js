const knex = require("knex");
const uuid = require("uuid").v4;

let db = knex({
    client: "mysql",
    connection: {
        // host: process.env.DB_HOST,
        // user: process.env.MARIADB_USER,
        // password: process.env.MARIADB_PASSWORD,
        // database: process.env.MARIADB_DATABASE,
        host: "dbauth",
        user: "dbauth",
        password: "dbauth",
        database: "dbauth",
    },
});

async function createClient(client) {
    try {
        let id = uuid();
        await db("client").insert({
            id: id,
            mail_client: client.mail,
            passwd: client.password,
            nom_client: client.client_mail,
            created_at: new Date(),
        });

        return id;
    } catch (err) {
        console.log("erreur" + err);
    }
}

function getClientByToken(token) {
    // tranform token to id
    // return db("client").select("*").where("id", token);

    // console.log("token: " + token);
}

function connection(pseudo, password) {
    return db("client").select("*").where("pseudo", pseudo).andWhere("password", password);
}

module.exports = {
    createClient,
    getClientByToken,
    connection,
};