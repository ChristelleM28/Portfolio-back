const projectsRouter = require("express").Router();
const { ProjectsControllers } = require("../controllers");


//GET
projectsRouter.get("/", ProjectsControllers.findAll);
projectsRouter.get("/:id"), ProjectsControllers.findOneById);
projectsRouter.get("/:name"), ProjectsControllers.findOneByName);

//POST
projectsRouter.post("/")

//PUT
projectsRouter.put("/")

//DELETE
projectsRouter.delete("/:id"), ProjectsControllers.

module.exports = projectsRouter;