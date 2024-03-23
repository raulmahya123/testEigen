module.exports = app => {
    const member = require("../controllers/members.controllers.js");
  
    let router = require("express").Router();
    // Create a new Mahasiswa
    router.post("/create", member.Create);
    // Retrieve all member
    router.get("/findcall", member.FindAll);
    // Retrieve all published member
    router.get("/:id", member.FindOne);
    // Retrieve a single member with id
    router.patch("/:id", member.Update);
    // Update a member with id
    router.delete("/:id", member.remove);
  
    app.use('/api/members', router);
  }
