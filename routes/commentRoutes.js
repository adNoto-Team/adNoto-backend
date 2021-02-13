const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");

const Comment = require("../models/comment");
const Episode = require("../models/episode");
const Content = require("../models/content");
const Like = require("../models/like");
const User = require("../models/user");

router.get("/comment/:id", (req, res) => {
	Comment.findByPk(req.params.id).then((comment) => {
		res.send(comment);
	});
});

router.post("/comment/episode/:id", async (req, res) => {
	const episode = await Episode.findByPk(req.params.id);

	const comment = await episode.createComment({
		userId: req.user.id,
		text: req.body.text,
		isSpoiler: req.body.isSpoiler,
	});

	res.send(comment);
});
router.get("/comment/episode/:id", async (req, res) => {
	const episode = await Episode.findByPk(req.params.id);

	const comments = await episode.getComments();

	const result = [];
	for await (const comment of comments) {
		const likes = await Like.findAll({
			attributes: [
				[sequelize.fn("COUNT", sequelize.col("like.userId")), "likes"],
			],
			where: {
				commentId: comment.id,
			},
		});
		const user = await User.findByPk(comment.userId);
		result.push({
			comment: {
				...comment.dataValues,

				liked: likes[0].dataValues.likes,
			},
			user: {
				username: user.dataValues.username,
				avatar: user.dataValues.avatar,
			},
		});
	}
	const watchedEp = await req.user.getWatcheds({
		where: { userId: req.user.id, episodeId: req.params.id },
	});
	res.send({ ...result, watched: watchedEp.length > 0 ? true : false });
});

router.post("/comment/content/:id", async (req, res) => {
	const content = await Content.findByPk(req.params.id);

	const comment = await content.createComment({
		userId: req.user.id,
		text: req.body.text,
		isSpoiler: req.body.isSpoiler,
	});

	res.send(comment);
	// Comment.create({ userId, contentId, isMovie, text }).then((response) => {
	// 	res.send(response);
	// });
});
router.get("/comment/content/:id", async (req, res) => {
	const content = await Content.findByPk(req.params.id);

	const comments = await content.getComments();
	const result = [];
	for await (const comment of comments) {
		const likes = await Like.findAll({
			attributes: [
				[sequelize.fn("COUNT", sequelize.col("like.userId")), "likes"],
			],
			where: {
				commentId: comment.id,
			},
		});
		const user = await User.findByPk(comment.userId);
		console.log(likes[0].dataValues.likes);
		result.push({
			comment: {
				...comment.dataValues,
				liked: likes[0].dataValues.likes,
			},
			user: {
				username: user.dataValues.username,
				avatar: user.dataValues.avatar,
			},
		});
	}

	res.send(result);
	// Comment.create({ userId, contentId, isMovie, text }).then((response) => {
	// 	res.send(response);
	// });
});

module.exports = router;
