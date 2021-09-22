require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const { dbConnection } = require("./src/configDB/config");
dbConnection();
const routes = require("./src/routes/index");

app.use(cors());
//crear servidor express
app.use(express.json());

app.use("/", routes);

//escuchar peticiones
app.listen(4000, () => {
  console.log("Servidor corriento en el puerto 4000");
});
