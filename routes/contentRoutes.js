const express = require("express");
const router = express.Router();

const Content = require("../models/content");
const Season = require("../models/season");
const Episode = require("../models/episode");

router.get("/feed", (req, res) => {});

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
	const comments = await content.getComments();
	res.send({ ...content.dataValues, seasons, comments });
});

module.exports = router;
