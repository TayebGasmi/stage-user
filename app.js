require("dotenv").config();
var express = require("express");
var router = require("./routes/router.index");
const http = require("http");
//data base
require("./database");
var cors = require("cors");
var app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", router);

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
