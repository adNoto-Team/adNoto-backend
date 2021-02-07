const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const requireAuth = require("./middlewares/requireAuth");

const basicRoutes = require("./routes/basicRoutes");
const commentRoutes = require("./routes/commentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./database/mysql");
// const contentRoutes = require("./routes/contentRoutes");

const User = require("./models/user");
const Comment = require("./models/comment");
const Content = require("./models/content");
const Season = require("./models/season");
const Episode = require("./models/episode");

Content.hasMany(Season);
Season.belongsTo(Content);

Season.hasMany(Episode);
Episode.belongsTo(Season);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(basicRoutes);
app.use(authRoutes);
//In routes below this line you got to put a bearer and jwt in your calls
app.use(requireAuth);

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
