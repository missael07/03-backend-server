//Imports
require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

//Data Base Connection
dbConnection();

//Enabled CORS
app.use(cors({ origin: true }));

app.get('/', (req, res) => res.json({
    ok: true,
    msg: 'Hello World!'
}));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})



