const express = require("express");
const router = express.Router();

const db = require("../db/order.js");
const orderValidator = require("../validator/order_validator.js");

router.use(express.json());

router.get("/", (req, res) => {
  try {
    db.getOrders()
      .then((orders) => {
        if (orders.length == 0) {
          res.status(404).json({ error: "No orders found" });
        } else {
          res.json(orders);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  try {
    db.getOrder(id)
      .then((order) => {
        if (order.length == 0) {
          res.status(404).json({
            type: "error",
            error: 404,
            message: `ressource non disponible : /orders/${id}/`,
          });
        } else {
          res.json(order);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
    let response = await db.updateOrder(id, nom, livraison, mail);
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

router.all("/", (req, res) => {
  res.status(405).json({
    type: "error",
    error: 405,
    message: `methode non autorisée`,
  });
});


module.exports = router;
