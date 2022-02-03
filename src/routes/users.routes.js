const usersRouter = require("express").Router();
const { usersControllers } = require("../controllers");


//GET
usersRouter.get("/", usersControllers.getAll);
usersRouter.get("/:id", usersControllers.getOneById);

//POST
usersRouter.post("/", usersControllers.createOne,
//puisqu'il y a un next dans le controller, je doit préciser ici la route de celui qui prendra le relais et donc modifier la façon dont le controller récupère l'id
usersControllers.getOneById);

// usersRouter.post("/", usersController.validateDataCreateUser, usersController.createOneUser, usersController.getOneUserById);

//PUT
usersRouter.put("/:id", usersControllers.updateOne);

//DELETE
usersRouter.delete("/:id", usersControllers.deleteOne);

module.exports = usersRouter;