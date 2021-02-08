const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const requireAuth = require("./middlewares/requireAuth");

const sequelize = require("./database/mysql");

const basicRoutes = require("./routes/basicRoutes");
const commentRoutes = require("./routes/commentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const likeRoutes = require("./routes/likeRoutes");
const contentRoutes = require("./routes/contentRoutes");

const User = require("./models/user");
const Comment = require("./models/comment");
const Content = require("./models/content");
const Season = require("./models/season");
const Episode = require("./models/episode");
const Like = require("./models/like");

Content.hasMany(Season);
Season.belongsTo(Content);

Season.hasMany(Episode);
Episode.belongsTo(Season);

Content.hasMany(Comment);
Episode.hasMany(Comment);
Comment.belongsTo(Content);
Comment.belongsTo(Episode);

User.hasMany(Comment);
Comment.belongsTo(User);

Comment.hasMany(Like);
Like.belongsTo(Comment);
User.hasMany(Like);
Like.belongsTo(User);

const app = express();

app.use(cors());
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
		.sync({
			//  force: true
		})
		.then(() => {
			console.log(`Hello Server is running at ${process.env.PORT}`);
		})
		.catch((e) => {
			throw e;
		});
});
