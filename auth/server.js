const express = require("express");

const port = 3000;

const app = express();

const signup = require("./routes/signup");

app.use("/signup", signup);

app.listen(port, () => {
  console.log(`Server "auth" started on port ${port}`);
});
