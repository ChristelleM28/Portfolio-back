const authRouter = require("express").Router();
const { usersControllers, authControllers } = require("../controllers");

authRouter.get(
  "/",
  authControllers.verifyToken,
  usersControllers.getOneByEmail,
);
authRouter.post(
  "/admin",
  usersControllers.verifyCredentials,
  authControllers.createToken
);
authRouter.post(
  "/refreshToken",
  authControllers.verifyToken,
  authControllers.refreshToken
);

module.exports = authRouter;
