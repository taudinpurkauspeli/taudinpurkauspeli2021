const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded -
// remember this format for postman etc edits
app.use(bodyParser.urlencoded({ extended: true }));

// mainpage
app.get('/', (req, res) => {
  res.json({ message: 'Testing if this works.' });
});

// dependency on routes (diseases)
require('./app/routes/disease.routes')(app);

// setting up port/listening on server ... (may change this)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Huom! No forced synchronization,
// make sure you eighter don't have the tables/databases,
// or that they are correct. May be able to alter them, but...
const db = require('./app/models');

db.sequelize.sync({ alter: true }).then(() => {
  console.log('altered the tables');
});
