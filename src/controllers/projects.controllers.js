const { Projects, Images } = require("../models");

// recherche de tous les projets
const getAll = async (req, res) => {
  try {
    const [results] = await Projects.findAll();

    //création d'une variable pour récupérer toutes les images d'un projet
    const images = await Promise.all(
      results?.map(async (file) => {
        const [result] = await Images.findImageByProjectId(file.id);
      //je destructure le tableau file et j'ajoute l'objet images qui correspond au result
        return { ...file, images: result };
      })
    );
    res.json(images);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// recherche du projet par l'Id
const getOneById = async (req, res) => {
  //je  créé une nouvelle variable pour récupérer l'id qui est dans les paramètres(.params) ligne 19
  // const { id } = req.params;
  console.log(req.id);
  // je modifie la manière de récupérer l'id suite à l'ajout du controller de création : je vérifie que l'id existe
  const id = req.params.id ? req.params.id : req.id;
  //Le statut qui doit être renvoyé par le post est un 201 je créée une nouvelle variable et l'ajoute à ma réponse else ligne 30
  const statusCode = req.method === "POST" ? 201 : 200;

  try {
    const [results] = await Projects.findOneById(id);
    console.log(results);
    // je teste que mon tableau est rempli et récupère un résultat
    if (results.length === 0) {
      // si tableau = 0 càd vide, je renvois un message d'erreur
      res.status(404).send(`Project id ${id} not found`);
      // sinon
    } else {
      //si je trouve l'id, je renvoi le résultat unique du tableau à l'index 0
      res.status(statusCode).json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// //recherche du prjet par le nom
// const getOneByName = async (req, res) => {
//   // je récupère le nom du projet via une requête (.query)
//   const { name } = req.query;
//   try {
//     const [results] = await Projects.findOneByName(name);
//     // je teste que mon tableau est rempli et récupère un résultat
//     // if (results.length ===0) {
//     //         // si tableau = 0 càd vide, je renvois un message d'erreur
//     //   res.status(404).send(`Project name ${name} not found`);
//     //   //sinon
//     // } else {
//     //       //si je trouve l'id, je renvoi le résultat unique du tableau à l'index 0
//     //       res.json(results[0]);
//     // }
//     res.send(results);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

// création d'un nouveau projet
const createOne = async (req, res, next) => {
  const { project_name, project_description, projet_link, project_date } =
    req.body;

  if (!project_name || !project_description || !projet_link || !project_date) {
    res.status(400).send(`You must provide all mandatories datas`);
  } else {
    try {
      // j'indique les données que je dois fournir pour créer un nouveau projet
      const [result] = await Projects.createOne({
        project_name,
        project_description,
        projet_link,
        project_date,
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
  const { project_name, project_description, projet_link, project_date } =
    req.body;
  // console.log(id);
  // console.log(project_name, project_description, projet_link, project_date);
  if (!project_name && !project_description && !projet_link && !project_date) {
    res.status(400).send(`Datas invalid`);
    // si j'ai une valeur, alors
  } else {
    // je créé un objet temporaire pour stocker les données de mise à jour
    const projectToUpdate = {};
    // console.log(projectToUpdate);
    if (project_name) {
      projectToUpdate.project_name = project_name;
    }
    if (project_description) {
      projectToUpdate.project_description = project_description;
    }
    if (projet_link) {
      projectToUpdate.projet_link = projet_link;
    }
    if (project_date) {
      projectToUpdate.project_date = project_date;
    }

    try {
      const [result] = await Projects.updateOne(projectToUpdate, id);
      console.log(result);
      // si la propriété affected row =0 signifie pas de mise à jour
      if (result.affectedRows === 0) {
        res.status(404).send(`Project with id ${id} not found`);
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
    const [result] = await Projects.deleteOneById(id);
    if (result.affectedRows === 0) {
      res.status(404).send(`Project with id ${id} not found`);
    } else {
      res.status(204).send(`Project deleted`);
    }
  } catch (err) {
    res.status(500).send("erreur ligne 139");
  }
};

module.exports = {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
};
