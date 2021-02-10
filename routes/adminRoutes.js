const express = require("express");
const router = express.Router();
const multer = require("multer");

const Content = require("../models/content");
const Season = require("../models/season");
const Episode = require("../models/episode");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		const name = `pic${req.params.id}-${Math.floor(Math.random() * 500)}-${
			file.originalname
		}`;
		cb(null, name);
	},
});
const storage2 = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		const name = `bg${req.params.id}-${Math.floor(Math.random() * 500)}-${
			file.originalname
		}`;
		cb(null, name);
	},
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: fileFilter,
});
const uploadBg = multer({
	storage: storage2,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: fileFilter,
});
router.post(
	"/content/img/:id",
	upload.single("avatarPic"),
	async (req, res) => {
		const file = req.file;
		console.log(file);
		if (file) {
			const content = await Content.findByPk(req.params.id);
			content.avatar = file.destination + file.filename;
			await content.save();

			res.send({ complete: true });
		} else {
			res.send({
				complete: "false",
			});
		}
	}
);
router.post(
	"/content/coverimg/:id",
	uploadBg.single("coverPic"),
	async (req, res) => {
		const file = req.file;

		if (file) {
			const content = await Content.findByPk(req.params.id);
			content.coverPicture = file.destination + file.filename;
			await content.save();

			res.send({ complete: true });
		} else {
			res.send({
				complete: "false",
			});
		}
	}
);
router.post("/content/all", upload.single("avatarPic"), (req, res) => {
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
