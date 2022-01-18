const projectsRouter = require("express").Router();
const { projectsControllers } = require("../controllers");


//GET
projectsRouter.get("/", projectsControllers.getAll);
projectsRouter.get("/:id", projectsControllers.getOneById);
// projectsRouter.get("/", projectsControllers.getOneByName);

//POST
projectsRouter.post("/", projectsControllers.createOne,
//puisqu'il y a un next dans le controller, je doit préciser ici la route de celui qui prendra le relais et donc modifier la façon dont le controller récupère l'id
projectsControllers.getOneById);

//PUT
projectsRouter.put("/:id", projectsControllers.updateOne);

//DELETE
projectsRouter.delete("/:id", projectsControllers.deleteOne);

module.exports = projectsRouter;