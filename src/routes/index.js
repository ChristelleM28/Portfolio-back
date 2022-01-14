const mainRouter = require("express").Router();

// Routes pour les différentes tables
const projectsRouter = require("./projects.routes");

mainRouter.use("/projects", projectsRouter);

module.exports = mainRouter;
