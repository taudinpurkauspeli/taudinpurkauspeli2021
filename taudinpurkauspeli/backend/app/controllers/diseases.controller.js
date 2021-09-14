const db = require("../models");
const Disease = db.diseases;
const Op = db.Sequelize.Op;

// Save a new disease
exports.create = (req, res) => {
    // Validate request - title
    if (!req.body.title) {
      res.status(400).send({
        message: "The disease has to have a name!"
      });
      return;
    }
  
    // Create a disease
    const disease = {
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
    };
  
    // Save disease in the database
    Disease.create(disease)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Unknown error occurred while creating the disease. Try again."
        });
      });
  };

// Retrieve all diseases
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Disease.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Unknown error occurred while retrieving diseases. Try again."
      });
    });
};

// Find a single disease (by id)
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Disease.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving disease with id=" + id
        });
      });
  };

// Update a disease (by id)
exports.update = (req, res) => {
    const id = req.params.id;
  
    Disease.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Disease was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update disease with id=${id}. Possible causes: disease title wrong or disease not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating disease with id=" + id
        });
      });
  };

// Delete a disease (by id)
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Disease.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Disease was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete disease with id=${id}. Possible causes: disease title wrong or disease not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete disease with id=" + id
        });
      });
  };

// Delete all diseases
exports.deleteAll = (req, res) => {
    Disease.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} diseases were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all diseases."
        });
      });
  };

// Find all spesified type of diseases
exports.findAllCategory = (req, res) => {
    Disease.findAll({ where: { category : category } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving diseases."
        });
      });
  };