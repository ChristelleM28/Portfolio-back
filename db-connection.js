// access to process.env
require("dotenv").config();

// pour accéder à mysql2
const mysql = require("mysql2");

//Définition d'une variable comportant les données d'environnement qui nous intéressent
const {DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME} = process.env;

//création de l'objet config avec les propriétés de configuration à mySql
const config = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
};
// je précise que pour les test, les variables d'environnement sont différentes
// if (NODE_ENV === "test") {
//   config = {
//     host: DB_HOST_TEST,
//     port: DB_PORT_TEST,
//     user: DB_USER_TEST,
//     password: DB_PASS_TEST,
//     database: DB_NAME_TEST,
//   };
// }

// Création de la connexion à my sql
const connection = mysql.createPool(config);

// ou on peut utiliser const connection = mysql.createConnection(config);

// const query = (...args) => {
//   return new Promise((resolve, reject) => {
//     connection.query(...args, (err, res) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(res);
//       }
//     });
//   });
// };
// const closeConnection = () => {
//   return new Promise((resolve, reject) => {
//     if (connection) {
//       connection.end((err) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve();
//         }
//       });
//     } else {
//       resolve();
//     }
//   });
// };
module.exports = {
  connection,
  // closeConnection,
};
