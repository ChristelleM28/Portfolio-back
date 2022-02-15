const { Users } = require("../models");

// ce controleur sert à valider les données de l'utilisateur en vérifiant si email et mdp existent
const validateDataCreateUser = (req, res, next) => {
  // je récupère les champs du body
  const { email, password } = req.body;
  //Je vérifie si mon email est déjà utilisé
  if (Users.emailAlreadyExists(email)) {
    res.status(400).send("Email already used");
    //Si je n'ai pas d'erreur, je vérie si le mot de passe est valide ou non
  } else {
    if (!Users.validatePassword(password)) {
      res.status(400).send("Invalid password");
    } else {
      next();
    }
  }
};

// recherche de tous les users
const getAll = async (req, res) => {
  try {
    const [results] = await Users.findAll();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// recherche du users par l'Id
const getOneById = async (req, res) => {
  //je  créé une nouvelle variable pour récupérer l'id qui est dans les paramètres(.params) ligne 19
  // const { id } = req.params;
  console.log(req.id);
  // je modifie la manière de récupérer l'id suite à l'ajout du controller de création : je vérifie que l'id existe
  const id = req.params.id ? req.params.id : req.id;
  //Le statut qui doit être renvoyé par le post est un 201 je créée une nouvelle variable et l'ajoute à ma réponse else ligne 31
  const statusCode = req.method === "POST" ? 201 : 200;

  try {
    const [results] = await Users.findOneById(id);
    console.log(results);
    // je teste que mon tableau est rempli et récupère un résultat
    if (results.length === 0) {
      // si tableau = 0 càd vide, je renvoie un message d'erreur
      res.status(404).send(`User id ${id} not found`);
      // sinon
    } else {
      //si je trouve l'id, je renvoi le résultat unique du tableau à l'index 0
      res.status(statusCode).json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// recherche du user par email est
const getOneByEmail = async (req, res, next) => {
  //je  créé une nouvelle variable pour récupérer l'email qui est dans le body
  const { email } = req.body;

  // je modifie la manière de récupérer l'id suite à l'ajout du controller de création : je vérifie que l'id existe
  // const id = req.params.id ? req.params.id : req.id;
  //Le statut qui doit être renvoyé par le post est un 201 je créée une nouvelle variable et l'ajoute à ma réponse else ligne 31
  // const statusCode = req.method === "POST" ? 201 : 200;
  try {
    const [results] = await Users.getOneByEmail(email);
    // je teste que mon tableau est rempli et récupère un résultat
    if (results.length === 0) {
      // si tableau = 0 càd vide, je renvoie un message d'erreur
      res.status(404).send(`User email ${email} not found`);
      // sinon
    } else {
      //si je trouve l'id, je renvoi le résultat unique du tableau à l'index 0
      res.status(statusCode).json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// création d'un nouveau user
const createOne = async (req, res, next) => {
  const { email, password } = req.body;
  // je vais hasher mon mot de pass
  const hashedPassword = await Users.hashPassword(password);

  if (!email || !password) {
    res.status(400).send(`You must provide all mandatories datas`);
  } else {
    try {
      // j'indique les données que je dois fournir pour créer un nouveau projet
      const [result] = await Users.createOne({
        email,
        password: hashedPassword,
      });
      //j'ajoute la propriété id pour passer la main au controller qui va récupérer l'album par son  id
      req.id = result.insertId;
      //next pour passer au controller suivant qui est celui de getOneById
      next();
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  //j'indique les données que je veux récupérer dans le body
  const { email, password } = req.body;
  // console.log(id);
  // console.log(email, password);
  if (!email && !password) {
    res.status(400).send(`Datas invalid`);
    // si j'ai une valeur, alors
  } else {
    // je créé un objet temporaire pour stocker les données de mise à jour
    const userToUpdate = {};
    // console.log(projectToUpdate);
    if (email) {
      userToUpdate.email = email;
    }
    if (password) {
      userToUpdate.password = password;
    }

    try {
      const [result] = await Users.updateOne(userToUpdate, id);
      console.log(result);
      // si la propriété affected row =0 signifie pas de mise à jour
      if (result.affectedRows === 0) {
        res.status(404).send(`User with id ${id} not found`);
      } else {
        res.status(200).send(`User updated`);
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await Users.deleteOneById(id);
    if (result.affectedRows === 0) {
      res.status(404).send(`User with id ${id} not found`);
    } else {
      res.status(200).send(`User deleted`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const verifyCredentials = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const [results] = await Users.findOneByEmail(email);
    if (results.length === 0) {
      res.status(404).send("bad credential haha");
    } else {
      const validatePassword = await Users.verifyPassword(
        password,
        results[0].password
      );
      console.log(validatePassword);
      if (!validatePassword) {
        res.status(401).send("bad credential");
      } else {
        req.user = results[0];
        next();
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAll,
  getOneById,
  getOneByEmail,
  createOne,
  updateOne,
  deleteOne,
  validateDataCreateUser,
  verifyCredentials,
};
