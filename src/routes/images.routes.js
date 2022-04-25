const imagesRouter = require("express").Router();
const { imagesControllers } = require("../controllers");

//GET
imagesRouter.get("/", imagesControllers.getAll);
imagesRouter.get("/:id", imagesControllers.getOneById);

//POST
imagesRouter.post(
  "/",
  imagesControllers.postImageObject,
  imagesControllers.createOne,
  //puisqu'il y a un next dans le controller, je doit préciser ici la route de celui qui prendra le relais et donc modifier la façon dont le controller récupère l'id
  imagesControllers.getOneById
);

//PUT
imagesRouter.put("/:id", imagesControllers.updateOne);

//DELETE
imagesRouter.delete("/:id", imagesControllers.deleteOne);

module.exports = imagesRouter;
