const express = require("express");

const port = 3000;

const app = express();

const orders = require("./routes/orders");


app.use("/orders", orders);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
