const express = require("express");

const port = 3000;

const app = express();
const axios = require("axios");

app.use(express.json());

const validator = require("./validator/validator.js");

app.post("/signup", async (req, res, next) => {
  let client_name = req.body.client_name;
  let mail = req.body.mail;
  let password = req.body.password;
  let passwordConfirm = req.body.passwordConfirm;

  try {
    let user = {
      client_name: client_name,
      mail: mail,
      password: password,
      passwordConfirm: passwordConfirm,
    };

    validator.validateAuth(user, res, req, next);

    let response = await axios.post("http://auth:3000/signup", user);

    res.send(response.data);
  } catch (error) {
    next(error);
  }
});

app.post("/signin", async (req, res, next) => {
  let authorization = req.headers.authorization;

  try {
    if (authorization == undefined) {
      res.status(401).json({
        type: "error",
        error: 401,
        message: "Vous n'êtes pas autorisé à accéder à cette ressource",
      });
      return;
    }

    let auth = authorization.split(" ");

    if (auth[0] != "Basic") {
      res.status(400).json({
        type: "error",
        error: 400,
        message: "Les champs ne sont pas tous remplis",
      });
      return;
    }

    let authDecoded = Buffer.from(auth[1], "base64").toString("ascii");

    let authSplit = authDecoded.split(":");
    let client_name = authSplit[0];
    let password = authSplit[1];

    let user = {
      client_name: client_name,
      password: password,
    };

    validator.validateSignIn(user, res, req, next);

    let response = await axios.post("http://auth:3000/signin", user, {
      headers: {
        Authorization: authorization,
      },
    });

    res.send(response.data);
  } catch (error) {
    next(error);
  }
});

app.get("/orders", async (req, res, next) => {
  let client_name = req.query.c
  let sort = req.query.sort
  let page = req.query.page

  try {
    let query = (client_name != undefined ? `c=${client_name}` : "") + (sort != undefined ? `&sort=${sort}` : "") + (page != undefined ? `&page=${page}` : "")

    if (query[0] == "&") query = query.substring(1)

    let url = `http://orders:3000/orders?${query}`

    let response = await axios.get(url);

    res.send(response.data);
  } catch (error) {
    next(error);
  }
});

app.post("/orders", async (req, res, next) => {
  let client_name = req.body.client_name
  let client_mail = req.body.client_mail
  let delivery = {
    date: req.body.delivery.date,
    time: req.body.delivery.time,
  }
  let items = req.body.items

  items = items == undefined ? [] : items

  let order = {
    client_name: client_name,
    client_mail: client_mail,
    delivery: delivery,
    items: items,
  };

  try {
    let valid = validator.validateOrderCreate(order, res, req, next);

    // console.log("isvalid: " + valid)
    if (!valid) return;

    let response = await axios.post("http://orders:3000/orders", order);

    res.send(response.data);
    // console.log("Order created");
  } catch (error) {
    next(error);
  }
})

app.listen(port, () => {
  console.log(`Server "gateway" started on port ${port}`);
});

app.get("/catalogue", async (req, res, next) => {
  try {

    let response = await axios.get("http://localhost:8055/items/sandwiches/");
    res.send(response.data);

  } catch (error) {
    next(error);
  }
})

app.get("/catalogue/:sandwichId", async (req, res, next) => {
  try {
    let id = req.params.sandwichId;

    let response = await axios.get("http://localhost:8055/items/sandwiches/?fields=*.*&filter[idCategories][_eq]=" + id);
    res.send(response.data);

  } catch (error) {
    next(error);
  }
})