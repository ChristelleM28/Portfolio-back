require("dotenv").config();

const { Users } = require("../models");
// je créé un middleware pour créer un tokeniser
const jwt = require("jsonwebtoken");
const {
  ACCESS_JWT_SECRET,
  ACCESS_JWT_EXPIRESIN,
  ACCESS_JWT_COOKIE_MAXAGE,
  ACCESS_JWT_COOKIE_SECURE,
  ACCESS_REFRESH_JWT,
} = process.env;

const createToken = (req, res) => {
  const { id } = req.user;
  const token = jwt.sign({ id }, ACCESS_JWT_SECRET, {
    expiresIn: ACCESS_JWT_EXPIRESIN,
  });
  console.log(ACCESS_REFRESH_JWT);
  const refreshToken = jwt.sign({ id }, ACCESS_REFRESH_JWT, {
    expiresIn: ACCESS_JWT_EXPIRESIN,
  });
  res
    .status(200)
    //si httponly à true, pas accès au cookie qui permet de vérifier si des données sont mémorisées
    .cookie("token", token, {
      httpOnly: true,
      maxAge: parseInt(ACCESS_JWT_COOKIE_MAXAGE, 10),
      secure: ACCESS_JWT_COOKIE_SECURE === "true",
      sameSite: "lax",
    })
    .cookie("refresh-token", refreshToken, { httpOnly: true, ACCESS_JWT_COOKIE_MAXAGE })
    .json({ id });
};

const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, ACCESS_JWT_SECRET, (err, decoded) => {
      if (err) {
        res.clearCookie("token");
        res.sendStatus(403);
      }
      req.userId = decoded.id;
      return next();
    });
  }else {
    res.clearCookie("token");
  res.status(403).send("Unauthorized");
}
};

const refreshToken = (req, res) => {
  // je récupère mon token dans la requête
  const { token } = req.cookies.token;
  let payload;
  //je vérifie la validité de mon token et attribue le résultat dans ma variable payload
  //je traite les différents types d'erreurs
  try {
    payload = jwt.verify(token, ACCESS_JWT_SECRET);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send("Your JWT is unauthorized");
    }
    return res.status(400).send("Bad request");
  }

  //je prends la date actuelle de la requête en format secondes
  const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
  console.log("Seconds ?", nowUnixSeconds);
  //si je suis à plus de 2 min d'expiration de mon token, je ne fais rien
  if (payload.exp - nowUnixSeconds < 120) {
    return res.status(500).json({ token });
  }

  // je créé un nouveau token et l'envoi dans mon cookie
  const newToken = jwt.sign({ id: payload.id }, ACCESS_JWT_SECRET, {
    expiresIn: ACCESS_JWT_EXPIRESIN,
  });
  return res
    .status(200)
    .cookie("token", newToken, { httpOnly: true, maxAge:ACCESS_JWT_COOKIE_MAXAGE });
};

module.exports = {
  createToken,
  verifyToken,
  refreshToken,
};
