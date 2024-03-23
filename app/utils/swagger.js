const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation for your Express application',
        },
    },
    apis: [path.join(__dirname, '../app/controllers/*.js')], // Update the path according to your project structure
};

const specs = swaggerJsdoc(options);

module.exports = specs;
