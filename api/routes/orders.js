const express = require("express");
const router = express.Router();

const dbOrder = require("../db/order.js");
const dbItem = require("../db/item.js");
const orderValidator = require("../validator/order_validator.js");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    let response = await dbOrder.getOrders();
    if (response.length == 0) {
      res.status(404).json({
        type: "error",
        error: 404,
        message: "ressource non disponible : /orders/",
      });
    } else {
      let ordersSend = {
        type: "collection",
        orders: response,
        links: [
          {
            rel: "self",
            href: "/orders/",
          },
        ],
      };
      res.json(ordersSend);
    }    
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let embed = req.query.embed;

  try {
    let response = await dbOrder.getOrder(id);
    if (response.length == 0) {
      res.status(404).json({
        type: "error",
        error: 404,
        message: `ressource non disponible : /orders/${id}/`,
      });
    } else {
      // res.json(order);
      let orderSend = {}
      if (embed != "items") {
        orderSend = {
          type: "ressource",
          order: response[0],
          links: [
            {
              rel: "self",
              href: `/orders/${id}/`,
            },
            {
              rel: "items",
              href: `/orders/${id}/items/`,
            },  
          ],
        };
      } else {
        let order = response[0];
        let items = await dbItem.getItems(id);
        order.items = items;
        orderSend = {
          type: "ressource",
          order: order,
          links: [
            {
              rel: "self",
              href: `/orders/${id}/`,
            },
            {
              rel: "items",
              href: `/orders/${id}/items/`,
            },
          ],
        };
      }
      res.json(orderSend);
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

  orderValidator.validateOrder(order, res, req, next);

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
    let response = await dbItem.getItems(id)
    if (response.length == 0) {
      res.status(404).json({
        type: "error",
        error: 404,
        message: `ressource non disponible : /orders/${id}/items/`,
      });
    } else {
      res.json(response);
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
