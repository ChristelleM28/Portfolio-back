const mainRouter = require("express").Router();

// Routes pour les différentes tables
const projectsRouter = require("./projects.routes");
const imagesRouter = require("./images.routes");

mainRouter.use("/projects", projectsRouter);
mainRouter.use("/images", imagesRouter);

module.exports = mainRouter;
