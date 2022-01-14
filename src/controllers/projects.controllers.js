const { Projects } = require("../models");

// recherche de tous les projets
const getAll = async (req, res) => {
  try {
    const [results] = await Projects.findAll();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// recherche du projet par l'Id
const getOneById = async (req, res) => {
  //je récupère l'id qui est dans les paramètres
  const { id } = req.params;
  try {
    const [results] = await Projects.findOneById(id);
    // je teste que mon tableau est rempli et récupère un résultat
    if (results.length === 0) {
      // si tableau = 0 càd vide, je renvois un message d'erreur
      res.status(404).send("Project id ${id} not found");
      // sinon
    } else {
      //si je trouve l'id, je renvoi le résultat unique du tableau à l'index 0
      res.json(results[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//recherche du prjet par le nom
const getOneByName = async (req, res) => {
  try {
    const [results] = await Projects.findOneByName(name);
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// création d'un nouveau projet
const createOne = async (req, res) => {
  const { project_name, project_description, project_link, project_date } =
    req.body;

  if (
    !project_name &&
    !project_description &&
    !project_link &&
    !datecreated &&
    !project_date
  ) {
    res.status(400).send("You must provide all mandatories datas");
  } else {
    try {
      const [results] = await Projects.createOne({
        project_name,
        project_description,
        project_link,
        datecreated,
        project_date,
      });
      req.id = results.insertId;
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const { project_name, project_description, project_link, project_date } =
    req.body;

  if (!project_name && !project_description && !project_link && !project_date) {
    res.status(400).send("You must provide all mandatories datas");
  } else {
    const projectToUpdate = {};
    if (project_name) {
      projectToUpdate.project_name = project_name;
    }
    if (project_description) {
      projectToUpdate.project_description = project_description;
    }
    if (project_link) {
      projectToUpdate.project_link = project_link;
    }
    if (project_date) {
      projectToUpdate.project_date = project_date;
    }
  }

  try {
    const [result] = await Projects.updateOne({ projectToUpdate, id });
    if (result.affectedRows === 0) {
      res.status(404).send("Project with id ${id} not found");
    } else {
      res.status(204);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await Projects.deleteOneById(id);
    if (result.affectedRows === 0) {
      res.status(404).send("Project with id ${id} not found");
    } else {
      res.status(204);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAll,
  getOneById,
  getOneByName,
  createOne,
  updateOne,
  deleteOne,
};
