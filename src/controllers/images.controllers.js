const { Images } = require("../models");
const multer = require("multer");

// recherche de toutes les images
const getAll = async (req, res) => {
  try {
    const [results] = await Images.findAll();
    res.json(results);
    console.log(results);
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
  const { img_name, img_description, projects_id } = req.body;
  if (!img_name || !img_description || !projects_id) {
    res.status(400).send(`You must provide all mandatories datas`);
  } else {
    try {
      // j'indique les données que je dois fournir pour créer une nouvelle image
      const [result] = await Images.createOne({
        img_name,
        img_description,
        img_filename: req.file.filename,
        projects_id,
      });

      //j'ajoute la propriété id pour passer la main au controller qui va récupérer l'image par son  id
      req.id = result.insertId;
      //next pour passer au controller suivant
      next();
    } catch (err) {
      res.status(500).send("ligne 64");
    }
  }
};
//pour poster un fichier
const postImageObject = (req, res, next) => {
  const storage = multer.diskStorage({
    //utiliser le memotystorage pour éviter de stocker des images erronées
    destination: (req, file, cb) => {
      //Chemin de destination des images des
      cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
      //ajout d'un timestamp pour différencier les images
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  //configuration de multer pour sauvegarder un seul fichier qui est dans req.body.file
  //pour uploader plusieurs images, utiliser le .array au lieu du .single
  const upload = multer({ storage }).single("file");

  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({ errorMessage: err.message });
    } else {
      req.imageName = req.file.filename;
      req.body = JSON.parse(req.body.data);
      next();
      //autre option
      // on peut sauvegarder le nom et d'autres données de l'image dans une table
      // res.status(201).json({filename: req.filename});
    }
  });
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  //j'indique les données que je veux récupérer dans le body
  const { img_name, img_description, img_filename } = req.body;
  // console.log(id);
  // console.log(img_name, img_description, img_url);
  if (!img_name && !img_description && !img_filename) {
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
    if (img_filename) {
      imageToUpdate.img_filename = img_filename;
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
  postImageObject,
  updateOne,
  deleteOne,
};
