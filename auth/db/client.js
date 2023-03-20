const knex = require("knex");
const uuid = require("uuid").v4;

var bcrypt = require('bcrypt');
const randToken = require("rand-token");

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

async function getClientByMail(mail) {
    return await db("client").select("*").where("mail_client", mail);
}

async function createClient(client) {
    try {
        let id = uuid();
        let refresh_token = randToken.uid(30);

        await db("client").insert({
            id: id,
            mail_client: client.mail,
            passwd: client.password,
            nom_client: client.client_name,
            created_at: new Date(),
            refresh_token: refresh_token,
        });

        return {
            id: id,
            refresh_token: refresh_token,
        };
    } catch (err) {
        console.log(err);
        return {
            error: true,
            statusCode: 400,
            message: "Erreur lors de la création de l'utilisateur",
        };
    }
}

function getClientByToken(token) {
    // tranform token to id
    // return db("client").select("*").where("id", token);

    // console.log("token: " + token);
}

async function authentification(login, password) {
    let result = await db("client").select("*").where("nom_client", login);

    if (result.length == 0) {
        return false;
    }

    let user = result[0];

    let res = bcrypt.compareSync(password, user.passwd);

    if (res) {
        let token = randToken.uid(30);
        await db("client").update({ refresh_token: token }).where("id", user.id);

        return {
            id: user.id,
            refresh_token: token,
        };
    } else {
        return false;
    }
}

module.exports = {
    createClient,
    getClientByToken,
    authentification,
    getClientByMail,
};