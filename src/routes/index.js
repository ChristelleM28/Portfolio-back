const mainRouter = require("express").Router();
const projectsRouter = require("../routes.js/projects.routes");

mainRouter.use("/projects/", projectsRouter);

module.exports = mainRouter;