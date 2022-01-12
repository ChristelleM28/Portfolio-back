const projectsRouter = require("express").Router();
const { ProjectsControllers } = require("../controllers");


//GET
projectsRouter.get("/", ProjectsControllers.findMany);
projectsRouter.get("/:id"), ProjectsControllers.findOneById);
projectsRouter.get("/:name"), ProjectsControllers.findOneByName);

//PUT
projectsRouter.put("/")

//POST


//DELETE
projectsRouter.delete("/:id"), ProjectsControllers.

module.exports = projectsRouter;