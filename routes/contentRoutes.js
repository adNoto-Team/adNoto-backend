const express = require("express");
const router = express.Router();

const Content = require("../models/content");
const Season = require("../models/season");
const Episode = require("../models/episode");

router.get("/feed", (req, res) => {});

router.get("/content/:id", async (req, res) => {
	const content = await Content.findByPk(req.params.id);
	const seasons = [];
	for await (const season of content.getSeason()) {
		const episodes = [];

		seasons.push(season.dataValues);
	}
	res.send(content);
});

module.exports = router;
