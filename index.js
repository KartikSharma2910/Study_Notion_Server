/* All Imports */
const express = require("express");
require("dotenv").config();

/* Creating App Instanse */
const app = express();

/* Including Middleware */
app.use(express.json());

/* Basic App Requirements for Creating Server */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server Successfully started at ${PORT}`));
