const express = require("express");
const router = express.Router();

const Content = require("../models/content");
const Season = require("../models/season");
const Episode = require("../models/episode");

router.post("/content/all", (req, res) => {
	const vars = req.body;

	Content.create({
		name: vars.name,
		avatar: vars.avatar,
		thumbnail: vars.thumbnail,
		desc: vars.desc,
		director: vars.director,
		trailer: vars.trailer,
		startDate: vars.startDate,
		endDate: vars.endDate,
	})
		.then(async (content) => {
			await Promise.all(
				vars.seasons.map((season) => {
					content
						.createSeason({
							name: season.name,
							seasonNumber: season.seasonNumber,
						})
						.then(async (theSeason) => {
							await Promise.all(
								season.episodes.map((episode) => {
									return theSeason
										.createEpisode({
											name: episode.name,
											episodeNumber:
												episode.episodeNumber,
											picture: episode.picture,
											desc: episode.desc,
											seasonId: episode.seasonId,
											airDate: episode.airDate,
										})
										.then((theEpisode) => {
											return Promise.resolve();
										});
								})
							);

							return Promise.resolve();
						})
						.catch((e) => {
							console.log(e);
						});
				})
			);
		})
		.then((a) => {
			res.send("Complete!");
		});
});

router.get("/content/:id", (req, res) => {
	res.send(content[req.params.id]);
});

module.exports = router;
