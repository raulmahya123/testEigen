const dbconfig = require('../config/mongodb.js');
const mongoose = require('mongoose');

module.exports = {
    mongoose,
    url: dbconfig.url,
    Member: require('./member.model.js')(mongoose),
    Book: require('./book.model.js')(mongoose),
    History: require('./history.model.js')(mongoose),
}