/* Importing the projects.controllers.js file. */
const projectsControllers = require("./projects.controllers");
const imagesControllers = require("./images.controllers");
const usersControllers = require("./users.controllers");
const authControllers = require("./auth.controllers");

module.exports = { projectsControllers,
  imagesControllers, usersControllers, authControllers
};
