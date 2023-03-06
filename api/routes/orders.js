const express = require("express");
const router = express.Router();

const dbOrder = require("../db/order.js");
const dbItem = require("../db/item.js");
const validator = require("../validator/validator.js");

router.use(express.json());

router.get("/", async (req, res, next) => {
  let client_name = req.query.c
  let sort = req.query.sort
  let page = req.query.page

  try {
    if (client_name !== undefined) {
      validator.validateMail({mail: client_name}, res, req, next);
      if (res.statusCode == 400) return;
    }
    if (sort !== undefined) {
      if (sort != "created" && sort != "shipped" && sort != "amount") {
        res.status(400).json({
          type: "error",
          error: 400,
          message: "La valeur de sort doit être created, shipped ou amount",
        });
        return;
      }
    }
    if (page !== undefined) {
      if (isNaN(page)) {
        res.status(400).json({
          type: "error",
          error: 400,
          message: "La valeur de page doit être un nombre",
        });
        return;
      }
    }

    let response = await dbOrder.getOrders(client_name, sort);

    if (response.length == 0) {
      res.status(404).json({
        type: "error",
        error: 404,
        message: "ressource non disponible : /orders/",
      });
    } else {
      if (page === undefined) page = 0;

      let nbPages = Math.ceil(response.length / 10);
      if (page > nbPages - 1) page = nbPages - 1;
      if (page < 0) page = 0;

      response = response.slice(page * 10, page * 10 + 10);
      
      let ordersSend = {
        type: "collection",
        count: response.length,
        size: 10,
        links: {
          next: {
            href: `/orders/?page=${page + 2}`,
          },
          prev: {
            href: `/orders/?page=${page}`,
          },
          last: {
            href: `/orders/?page=${nbPages}`,
          },
          first: {
            href: `/orders/?page=1`,
          }
        },
        orders: [],
      }

      response.forEach((order) => {
        ordersSend.orders.push(
          {
            order: {
              "id": order.id,
              "client_name": order.nom,
              "order_date": order.created_at,
              "delivery_date": order.livraison,
              "status": order.status,
            },
            links: {
              self: {
                href: `/orders/${order.id}/`,
              },
            }
          }
        );
      });
      
      res.set("X-Total-Pages", nbPages);
      res.set("X-Current-Page", page + 1);
      res.set("X-Per-Page", 10);
      res.status(200).json(ordersSend);
    }    
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res, next) => {
  let client_name = req.body.client_name
  let client_mail = req.body.client_mail
  let delivery = {
    date: req.body.delivery.date,
    time: req.body.delivery.time,
  }
  let items = req.body.items

  let order = {
    client_name: client_name,
    client_mail: client_mail,
    delivery: delivery,
    items: items,
  };

  validator.validateOrderCreate(order, res, req, next);

  try {
    let response = await dbOrder.createOrder(order);

    for (let i = 0; i < items.length; i++)
      await dbItem.createItem(items[i], response.id);

    res.status(201).location(`/orders/${response.id}`).json({
      order: response,
    })
  } catch (err) {
    next(err);
  }
})

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let embed = req.query.embed;

  try {
    let response = await dbOrder.getOrder(id);
    if (response === undefined) {
      res.status(404).json({
        type: "error",
        error: 404,
        message: `ressource non disponible : /orders/${id}/`,
      });
    } else {
      let orderSend = {}
      if (embed != "items") {
        orderSend = {
          type: "ressource",
          order: response,
          links: [
            {
              rel: "self",
              href: `/orders/${response.id}/`,
            },
            {
              rel: "items",
              href: `/orders/${response.id}/items/`,
            },  
          ],
        };
      } else {
        let items = await dbItem.getItem(id);
        response.items = items;
        orderSend = {
          type: "ressource",
          order: response,
          links: [
            {
              rel: "self",
              href: `/orders/${response.id}/`,
            },
            {
              rel: "items",
              href: `/orders/${response.id}/items/`,
            },
          ],
        };
      }
      res.status(200).json(orderSend);
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res, next) => {
  let id = req.params.id;
  let nom = req.body.nom;
  let livraison = req.body.livraison;
  let mail = req.body.mail;

  let order = {
    nom: nom,
    livraison: livraison,
    mail: mail,
  };

  validator.validateOrder(order, res, req, next);

  try {
    let response = await dbOrder.updateOrder(id, nom, livraison, mail);
    if (response === undefined) {
      res.status(404).json({
        type: "error",
        error: 404,
        message: `ressource non disponible : /orders/${id}/`,
      });
    } else {
      res.status(204).json({
        type: "success",
        error: 204,
        message: `ressource modifiée : /orders/${id}/`,
      });
    }
  } catch (err) {
    next(500);
  }
});

router.get("/:id/items", async (req, res) => {
  let id = req.params.id;
  try {
    let response = await dbItem.getItem(id)
    if (response.length == 0) {
      res.status(404).json({
        type: "error",
        error: 404,
        message: `ressource non disponible : /orders/${id}/items/`,
      });
    } else {
      let itemsSend = {
        type: "collection",
        count: response.length,
        items: response,
      }
      res.json(itemsSend);
    }
  } catch (err) {
    console.log(err);
  }
});

router.all("/", (req, res) => {
  res.status(405).json({
    type: "error",
    error: 405,
    message: `methode non autorisée`,
  });
});


module.exports = router;
