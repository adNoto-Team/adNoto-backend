const express = require("express");
const router = express.Router();

const Comment = require("../models/comment");
const Like = require("../models/like");
const Content = require("../models/content");
const WatchLater = require("../models/watchLater");
const sequelize = require("sequelize");
const Watched = require("../models/watched");
const Episode = require("../models/episode");
const User = require("../models/user");

router.get("/user/:username", async (req, res) => {
	let currentEpisode;
	let season;
	let content;
	try {
		const user = await User.findOne({
			where: { username: req.params.username },
		});
		console.log(user);
		const likedComments = await Comment.findAll({
			group: ["comment.id"],
			includeIgnoreAttributes: false,
			include: [
				{
					model: Like,
				},
			],
			where: {
				userId: user.id,
			},
			attributes: [
				"id",
				"text",
				"contentId",
				"episodeId",
				"userId",
				[
					sequelize.fn("COUNT", sequelize.col("likes.commentId")),
					"liked",
				],
			],
			order: [
				[
					sequelize.fn("COUNT", sequelize.col("likes.commentId")),
					"DESC",
				],
			],
		});

		const commentArr = [];
		for await (const comment of likedComments) {
			if (comment.episodeId !== null) {
				currentEpisode = await Episode.findByPk(comment.episodeId);
				season = await currentEpisode.getSeason();
				content = await season.getContent();
			} else {
				content = await Content.findByPk(comment.contentId);
			}
			commentArr.push({
				comment: comment.dataValues,
				content: content.dataValues,
			});
		}

		const watching = await Watched.findAll({
			where: {
				userId: user.id,
			},
		});
		const watchingArr = [];

		for await (const watch of watching) {
			currentEpisode = await Episode.findByPk(watch.episodeId);
			season = await currentEpisode.getSeason();
			content = await season.getContent();
			watchingArr.push({
				watched: watch.dataValues,
				content: content.dataValues,
			});
		}
		const willWatch = await WatchLater.findAll({
			where: {
				userId: user.id,
			},
		});
		const willWatchArr = [];

		for await (const willWatchContent of willWatch) {
			content = await Content.findByPk(willWatchContent.contentId);
			willWatchArr.push({
				willWatch: willWatchContent.dataValues,
				content: content.dataValues,
			});
		}
		const commentNum = await Comment.count({
			where: { userId: user.id },
		});
		res.send({
			user: {
				...req.user.dataValues,
				password: null,
			},
			commentArr,
			watchingArr,
			willWatchArr,
			commentNum,
		});
	} catch (e) {
		throw e;
	}
});

router.get("/profile", async (req, res) => {
	let currentEpisode;
	let season;
	let content;
	try {
		const likedComments = await Comment.findAll({
			group: ["comment.id"],
			includeIgnoreAttributes: false,
			include: [
				{
					model: Like,
				},
			],
			where: {
				userId: req.user.id,
			},
			attributes: [
				"id",
				"text",
				"contentId",
				"episodeId",
				"userId",
				[
					sequelize.fn("COUNT", sequelize.col("likes.commentId")),
					"liked",
				],
			],
			order: [
				[
					sequelize.fn("COUNT", sequelize.col("likes.commentId")),
					"DESC",
				],
			],
		});

		const commentArr = [];
		for await (const comment of likedComments) {
			if (comment.episodeId !== null) {
				currentEpisode = await Episode.findByPk(comment.episodeId);
				season = await currentEpisode.getSeason();
				content = await season.getContent();
			} else {
				content = await Content.findByPk(comment.contentId);
			}
			commentArr.push({
				comment: comment.dataValues,
				content: content.dataValues,
			});
		}

		const watching = await Watched.findAll({
			where: {
				userId: req.user.id,
			},
		});
		const watchingArr = [];

		for await (const watch of watching) {
			currentEpisode = await Episode.findByPk(watch.episodeId);
			season = await currentEpisode.getSeason();
			content = await season.getContent();
			watchingArr.push({
				watched: watch.dataValues,
				content: content.dataValues,
			});
		}
		const willWatch = await WatchLater.findAll({
			where: {
				userId: req.user.id,
			},
		});
		const willWatchArr = [];

		for await (const willWatchContent of willWatch) {
			content = await Content.findByPk(willWatchContent.contentId);
			willWatchArr.push({
				willWatch: willWatchContent.dataValues,
				content: content.dataValues,
			});
		}
		const commentNum = await Comment.count({
			where: { userId: req.user.id },
		});
		res.send({
			user: {
				...req.user.dataValues,
				password: null,
			},
			commentArr,
			watchingArr,
			willWatchArr,
			commentNum,
		});
	} catch (e) {
		throw e;
	}
});

module.exports = router;
