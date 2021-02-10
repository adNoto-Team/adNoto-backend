const express = require("express");
const router = express.Router();

const Content = require("../models/content");
const Season = require("../models/season");
const Episode = require("../models/episode");
const Comment = require("../models/comment");

const sequelize = require("sequelize");

router.get("/feed", async (req, res) => {
	const result = await Content.findAll({
		order: [[sequelize.literal("updatedAt"), "DESC"]],
	});
	res.send(result);
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
	res.send({ ...content.dataValues, seasons });
});

module.exports = router;
