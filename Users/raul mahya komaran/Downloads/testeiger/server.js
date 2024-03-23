const express = require('express');
const app = express();
const db = require('./app/models');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDocs = require('./app/utils/swagger');

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to the database!");
}).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
require('./app/routes/member.routes')(app);
require('./app/routes/book.routes')(app);
require('./app/routes/pinjam.routes')(app);

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
