const { Images } = require("../models");

// recherche de toutes les images
const getAll = async (req, res) => {
  try {
    const [results] = await Images.findAll();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// recherche de l'image par l'Id
const getOneById = async (req, res) => {
  //je  créé une nouvelle variable pour récupérer l'id qui est dans les paramètres(.params) ligne 19
  // const { id } = req.params;
  console.log(req.id);
  // je modifie la manière de récupérer l'id suite à l'ajout du controller de création : je vérifie que l'id existe
  const id = req.params.id ? req.params.id : req.id;
  //Le statut qui doit être renvoyé par le post est un 201 je créée une nouvelle variable et l'ajoute à ma réponse else ligne 30
  const statusCode = req.method === "POST" ? 201 : 200;

  try {
    const [results] = await Images.findOneById(id);
    console.log(results);
    // je teste que mon tableau est rempli et récupère un résultat
    if (results.length === 0) {
      // si tableau = 0 càd vide, je renvois un message d'erreur
      res.status(404).send(`Image id ${id} not found`);
      // sinon
    } else {
      //si je trouve l'id, je renvoi le résultat unique du tableau à l'index 0
      res.status(statusCode).json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// création d'une nouvelle image
const createOne = async (req, res, next) => {
  const { img_name, img_description, img_url, projects_id} =
    req.body;

  if (!img_name || !img_description || !img_url ||!projects_id ) {
    res.status(400).send(`You must provide all mandatories datas`);
  } else {
    try {
      // j'indique les données que je dois fournir pour créer une nouvelle image 
      const [result] = await Images.createOne({
        img_name,
        img_description,
        img_url,
        projects_id
    });
  
      //j'ajoute la propriété id pour passer la main au controller qui va récupérer l'album par son  id
      req.id = result.insertId;
      //next pour passer au controller suivant qui est celui de getOneById
      next();
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
;

const updateOne = async (req, res) => {
  const { id } = req.params;
  //j'indique les données que je veux récupérer dans le body
  const { img_name, img_description, img_url } =
    req.body;
  // console.log(id);
  // console.log(img_name, img_description, img_url);
  if (!img_name && !img_description && !img_url) {
    res.status(400).send(`Datas invalid`);
    // si j'ai une valeur, alors
  } else {
    // je créé un objet temporaire pour stocker les données de mise à jour
    const imageToUpdate = {};
    // console.log(projectToUpdate);
    if (img_name) {
      imageToUpdate.img_name = img_name;
    }
    if (img_description) {
      imageToUpdate.img_description = img_description;
    }
    if (img_url) {
      imageToUpdate.img_url = img_url;
    }

  try {
    const [result] = await Images.updateOne(imageToUpdate, id);
    console.log(result);
    // si la propriété affected row =0 signifie pas de mise à jour
    if (result.affectedRows === 0) {
      res.status(404).send(`Images with id ${id} not found`);
    } else {
      res.status(200).send(`Update OK`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await Images.deleteOneById(id);
    if (result.affectedRows === 0) {
      res.status(404).send(`Image with id ${id} not found`);
    } else {
      res.status(204).send(`Image deleted`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
};
