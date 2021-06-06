require("dotenv").config();
const express = require("express");
const cors = require("cors");
const history = require("connect-history-api-fallback");
const path = require("path");
const loadGenresInfo = require('./utils/insertGenres');
const secure = require('ssl-express-www');
const app = express();
const CLIENT_PORT = process.env.PORT || 8080;

/**
 * *SERVE VUEJS CLIENT
 */
 const staticFileMiddleware = express.static(path.join(__dirname + "/dist"));
 app.use(staticFileMiddleware);
 app.use(history());
 app.use(staticFileMiddleware);

/**
 * CARREGA GENEROS OFICIAIS
 */
loadGenresInfo()

/* DATABASE CONN*/
require("./database/mongodbConn");

/**
 * @MIDDLEWARES
 */
app.use(secure);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: `http://localhost:${CLIENT_PORT}`}));

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
