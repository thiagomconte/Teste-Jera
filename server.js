require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

/* DATABASE CONN*/
require("./database/mongodbConn");

/**
 * @MIDDLEWARES
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

/**
 * @ROUTES
 */
app.use("/api/users", require("./routes/user"));
app.use("/api/profiles", require("./routes/profile"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) console.log("Could not start server");
  console.log(`Server running on ${PORT}`);
});
