const projectsRouter = require("express").Router();
const { projectsControllers } = require("../controllers");


//GET
projectsRouter.get("/", projectsControllers.getAll);
projectsRouter.get("/:id", projectsControllers.getOneById);
projectsRouter.get("/:name", projectsControllers.getOneByName);

//POST
projectsRouter.post("/", projectsControllers.createOne);

//PUT
projectsRouter.put("/", projectsControllers.updateOne);

//DELETE
projectsRouter.delete("/:id", projectsControllers.deleteOne);

module.exports = projectsRouter;