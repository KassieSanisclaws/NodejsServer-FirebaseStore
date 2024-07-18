const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables:
dotenv.config();

// Server Express:
const firebaseServer = express();

// CORS Middleware:
firebaseServer.use(cors());

// Body Parser Middleware:
firebaseServer.use(bodyParser.json());
firebaseServer.use(bodyParser.urlencoded({ extended: false }));

firebaseServer.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes:
firebaseServer.get("/", (req, res) => {
  res.send("Server Running!"); 
});

// Sever Error Handling:
firebaseServer.use((err, req, res, next) => {
  res.status(500).send({ message: err.message})
});

// Server Success:
const port = process.env.SERVER_PORT || 3000;
firebaseServer.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});

module.exports = firebaseServer;