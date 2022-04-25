require("dotenv").config();
const express = require("express");

// j'ajoute Cors pour valider la connexion front/back
const cors = require("cors");

//Je créé la variable mainRouter qui sera importée dans Routes
const mainRouter = require("./routes");

// je teste que je peux me connecter à mysql
// const connection = require("./db-connection");

// //pour tester la connection
// connection.getConnection((err) => {
//   //si j'ai une erreur
//   if (err) {
//     console.log(err.message);
//     //sinon
//   } else {
//     console.log("Connected to BD");
//   }
// });

const app = express();

//permet d'utiliser express dans tous les middleswares de l'application
app.use(express.json());

app.use(
  cors({
    //je précise quels sont les clients qui peuvent interroger l'api
    origin: [process.env.CLIENT_ORIGIN],
    credentials: true,
  }),
);

//chemin pour uploadfile
app.use("/images", express.static("./public"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello Christelle" });
});

//MainRouter est une variable qui sera créée dans Routes
app.use("/api", mainRouter);

module.exports = app;
