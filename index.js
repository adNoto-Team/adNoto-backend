const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const basicRoutes = require("./routes/basicRoutes");
const commentRoutes = require("./routes/commentRoutes");
const adminRoutes = require("./routes/adminRoutes");

const sequelize = require("./database/mysql");
// const contentRoutes = require("./routes/contentRoutes");

const Comment = require("./models/comment");
const Content = require("./models/content");
const Season = require("./models/season");
const Episode = require("./models/episode");

Content.hasMany(Season);
Season.belongsTo(Content);

Season.hasMany(Episode);
Episode.belongsTo(Season);

const app = express();

app.use(bodyParser.json());

app.use(basicRoutes);
app.use(commentRoutes);
app.use(adminRoutes);

app.listen(process.env.PORT, () => {
	sequelize
		.sync({ force: true })
		.then(() => {
			console.log(`Hello Server is running at ${process.env.PORT}`);
		})
		.catch((e) => {
			throw e;
		});
});
