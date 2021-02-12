const express = require("express");
const router = express.Router();

const Content = require("../models/content");
const Season = require("../models/season");
const Episode = require("../models/episode");
const Comment = require("../models/comment");
const Like = require("../models/like");

const sequelize = require("sequelize");
const User = require("../models/user");

router.get("/feed", async (req, res) => {
	const result = await Content.findAll({
		// order: [[sequelize.literal("updatedAt"), "DESC"]],
		order: sequelize.literal("rand()"),
		limit: 20,
	});
	res.send(result);
});

router.get("/content/random", async (req, res) => {
	const result = await Content.findAll({
		order: sequelize.literal("rand()"),
		limit: 1,
	});

	res.send(result[0]);
});

router.get("/content/:id", async (req, res) => {
	const content = await Content.findByPk(req.params.id);
	const seasons = [];
	let episodes = [];
	let ListOfSeasons = await content.getSeasons();
	for await (const season of ListOfSeasons) {
		episodes = [];
		let ListOfEpisodes = await season.getEpisodes();
		for await (const episode of ListOfEpisodes) {
			episodes.push(episode);
		}

		seasons.push({ ...season.dataValues, episodes });
	}
	const comments = await content.getComments({
		group: ["comment.id"],

		attributes: [
			"id",
			"text",
			"contentId",
			"episodeId",
			"isSpoiler",
			"userId",
			[sequelize.fn("COUNT", sequelize.col("likes.commentId")), "liked"],
		],
		includeIgnoreAttributes: false,
		include: [
			{
				model: Like,
			},
		],
	});
	const commentsArr = [];
	for await (const comment of comments) {
		const user = await User.findByPk(comment.userId);
		commentsArr.push({
			comment,
			user: {
				username: user.username,
				avatar: user.avatar,
			},
		});
	}

	const watchLater = await req.user.getWatchLaters({
		where: {
			contentId: req.params.id,
		},
	});

	res.send({
		...content.dataValues,
		seasons,
		commentsArr,
		watched: watchLater.lenght > 0 ? watchLater[0] : null,
	});
});

module.exports = router;
