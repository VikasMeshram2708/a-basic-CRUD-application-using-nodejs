const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const volleyball = require("volleyball");

// middlewares
app.use(volleyball);
app.use(express.json());

// routes
app.use("/api/faqs", require("./routes/faqs"));

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
