const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const basicRoutes = require("./routes/basicRoutes");
const contentRoutes = require("./routes/contentRoutes");

const app = express();

app.use(bodyParser.json());

app.use(basicRoutes);
app.use(contentRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Hello Server is running at ${process.env.PORT}`);
});
