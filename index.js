const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const basicRoutes = require("./routes/basicRoutes");
const commentRoutes = require("./routes/commentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const likeRoutes = require("./routes/likeRoutes");
const contentRoutes = require("./routes/contentRoutes");

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
app.use(authRoutes);
app.use(contentRoutes);
//In routes below this line you got to put a bearer and jwt in your calls
app.use(requireAuth);

app.use(commentRoutes);
app.use("/admin", adminRoutes);
app.use(likeRoutes);

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
