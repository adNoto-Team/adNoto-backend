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
const watchLaterRoutes = require("./routes/watchLaterRoutes");
const userRoutes = require("./routes/userRoutes");
const userAvatarRoutes = require("./routes/userAvatarRoutes");

const User = require("./models/user");
const Comment = require("./models/comment");
const Content = require("./models/content");
const Season = require("./models/season");
const Episode = require("./models/episode");
const Like = require("./models/like");
const WatchLater = require("./models/watchLater");
const Watched = require("./models/watched");

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

Content.hasMany(WatchLater);
WatchLater.belongsTo(Content);
User.hasMany(WatchLater);
WatchLater.belongsTo(User);

Episode.hasMany(Watched);
Watched.belongsTo(Episode);
User.hasMany(Watched);
Watched.belongsTo(User);

const app = express();

app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(bodyParser.json());

app.use(basicRoutes);
app.use(authRoutes);
app.use(requireAuth);
app.use(contentRoutes);
//In routes below this line you got to put a bearer and jwt in your calls

app.use(commentRoutes);
app.use("/admin", adminRoutes);
app.use(likeRoutes);
app.use(watchLaterRoutes);
app.use(userRoutes);
app.use(userAvatarRoutes);

app.listen(process.env.PORT, () => {
	sequelize
		.sync({
			//force: true,
		})
		.then(() => {
			console.log(`Hello Server is running at ${process.env.PORT}`);
		})
		.catch((e) => {
			throw e;
		});
});
