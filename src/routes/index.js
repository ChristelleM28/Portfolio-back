const mainRouter = require("express").Router();

// Routes pour les différentes tables
const projectsRouter = require("./projects.routes");
const imagesRouter = require("./images.routes");
const usersRouter = require("./users.routes");
const emailRouter = require("./email.routes");

mainRouter.use("/projects", projectsRouter);
mainRouter.use("/images", imagesRouter);
mainRouter.use("/users", usersRouter);
mainRouter.use("/emails", emailRouter);

module.exports = mainRouter;
