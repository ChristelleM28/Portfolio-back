const mainRouter = require("express").Router();

// Routes pour les différentes tables
/* Importing the projects.routes.js file. */
const projectsRouter = require("./projects.routes");
const imagesRouter = require("./images.routes");
const usersRouter = require("./users.routes");
const emailRouter = require("./email.routes");
const authRouter = require("./auth.routes");

/* Telling the server to use the projectsRouter when the url is /projects. */
mainRouter.use("/projects", projectsRouter);
mainRouter.use("/images", imagesRouter);
mainRouter.use("/users", usersRouter);
mainRouter.use("/contact", emailRouter);
mainRouter.use("/auth", authRouter );

module.exports = mainRouter;
