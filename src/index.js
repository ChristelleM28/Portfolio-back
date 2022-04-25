//utilisation des variables d'environnement
require("dotenv").config();

//récupération de la partie application
const app = require("./app");

//création de la variable port qui récupère les données d'environnement
const port = process.env.PORT || 5000;

//écoute le server
app.listen(port, (err) => {
  // si j'ai une erreur
  if (err) {
    //console.log(err)
    console.error(`ERROR: ${err.message}`);
    //sinon pas erreur
  } else {
    console.log(`Server is listening on port ${port}`);
  }
});


