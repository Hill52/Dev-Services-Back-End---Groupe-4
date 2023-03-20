const express = require("express");

const port = 3000;

const app = express();

const signup = require("./routes/signup");
const signin = require("./routes/signin");

app.use("/signup", signup);
app.use("/signin", signin);

app.listen(port, () => {
  console.log(`Server "auth" started on port ${port}`);
});
