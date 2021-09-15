module.exports = app => {
    const diseases = require("../controllers/diseases.controller.js");
  
    var router = require("express").Router();
  
    // Create a new disease
    router.post("/", diseases.create);
  
    // Retrieve all diseases
    router.get("/", diseases.findAll);
  
    // Retrieve a single disease by id
    router.get("/:id", diseases.findOne);
  
    // Update a disease by id
    router.put("/:id", diseases.update);
  
    // Delete a disease by id
    router.delete("/:id", diseases.delete);
  
    // Delete all diseases
    router.delete("/", diseases.deleteAll);

    // Retrieve all specific catagory diseases - especially modify this.
    router.get("/category", diseases.findAllCategory);
  
    app.use('/api/diseases', router);
  };