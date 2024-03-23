module.exports = app => {
    const books = require("../controllers/book.controller");
  
    let router = require("express").Router();
    
    // Create a new Book
    router.post("/create", books.create);
  
    // Retrieve all books
    router.get("/findall", books.findAll);
  
    // Retrieve a single Book with id
    router.get("/:id", books.findOne);
  
    // Update a Book with id
    router.patch("/:id", books.update);
  
    // Delete a Book with id
    router.delete("/:id", books.remove);
  
    app.use('/api/books', router);
  }