const express = require("express");

const port = 3000;

const app = express();

const orders = require("./routes/orders");


app.use("/orders", orders);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
