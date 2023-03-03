const express = require("express");

const port = 3000;

const app = express();

const orders = require("./routes/orders");
const sandwichs = require("./routes/sandwichs")

app.use("/orders", orders);
app.use("/sandwichs", sandwichs);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
