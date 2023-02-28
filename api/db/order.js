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

function getOrders() {
  return db("commande").select("*");
}

function getOrder(id) {
  return db("commande").select("*").where("id", id);
}

async function updateOrder(id, nom, livraison, mail) {
  try {
    return await db("commande").where("id", id).update({
      nom: nom,
      livraison: livraison,
      mail: mail,
    });
  } catch (err) {
    console.log("erreur" + err);
  }
}

module.exports = {
  getOrders,
  getOrder,
  updateOrder,
};
