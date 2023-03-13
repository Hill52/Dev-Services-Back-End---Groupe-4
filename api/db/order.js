const knex = require("knex");
const uuid = require("uuid").v4;

let db = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DATABASE,
  },
});

function getOrders(client = null, sort = null) {
  if (sort) {
    if (sort == "created") {
      sort = "created_at";
    } else if (sort == "shipped") {
      sort = "livraison";
    } else if (sort == "amount") {
      sort = "montant";
    }
  }

  if (client) {
    return (sort) ? db("commande").select("id", "nom", "created_at", "livraison", "status").where("mail", client).orderBy(sort, "desc") : db("commande").select("id", "nom", "created_at", "livraison", "status").where("mail", client);
  } else {
    return (sort) ? db("commande").select("id", "nom", "created_at", "livraison", "status").orderBy(sort, "desc") : db("commande").select("id", "nom", "created_at", "livraison", "status");
  }
}

function getOrder(id) {
  return db("commande").select("*").where("id", id).first();
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

async function createOrder(order) {
  try {
    let id = uuid();
    let livraison = new Date(order.delivery.date);
    livraison.setHours(order.delivery.time.split(":")[0]);
    livraison.setMinutes(order.delivery.time.split(":")[1]);
    let total_amont = 0;
    
    order.items.forEach((item) => {
      total_amont += item.price * item.q;
    });

    await db("commande").insert({
      id: id,
      nom: order.client_name,
      mail: order.client_mail,
      livraison: livraison,
      created_at: new Date(),
      montant: total_amont,
    })

    let send = {
      client_name: order.client_name,
      client_mail: order.client_mail,
      delivery_date: order.delivery.date,
      id: id,
      total_amont: total_amont,
    }

    return send;
  } catch (err) {
    console.log("erreur" + err);
  }
}

module.exports = {
  getOrders,
  getOrder,
  updateOrder,
  createOrder,
};
