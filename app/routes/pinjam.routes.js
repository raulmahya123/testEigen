
module.exports = app => {

    const bookController = require('../controllers/pinjam.controller.js');
    const memberController = require('../controllers/pinjam.controller.js');

    let router = require('express').Router();
    // Book routes
    router.post('/members/:memberId/books/:bookId/borrow', bookController.borrowBook);
    router.put('/members/:memberId/books/:historyId/return', bookController.returnBook);
    router.get('/books', bookController.findAllBooks);

    // // Member routes
    router.get('/members', memberController.findAllMembers);

    app.use('/api/pinjam', router);
};
