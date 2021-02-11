const express = require("express");
const router = express.Router();

const WatchLater = require("../models/watchLater");
const Watched = require("../models/watched");

router.get("/content/watch/:id", async (req, res) => {
	try {
		const [watchLater, created] = await WatchLater.findOrCreate({
			where: {
				contentId: req.params.id,
				userId: req.user.id,
			},
			defaults: {
				watched: true,
			},
		});
		if (created === true) {
			res.send("Added to watched");
		} else {
			if (watchLater) {
				if (watchLater.watched === true) {
					await watchLater.destroy();
					res.send("Removed it from watched");
				} else {
					watchLater.watched = true;
					await watchLater.save();

					res.send("Changed to watched from watch later");
				}
			} else {
				res.send("ERROR");
			}
		}
	} catch (e) {
		throw e;
	}
});

router.get("/content/watchlater/:id", async (req, res) => {
	try {
		const [watchLater, created] = await WatchLater.findOrCreate({
			where: {
				contentId: req.params.id,
				userId: req.user.id,
			},
			defaults: {
				watched: false,
			},
		});
		if (created === true) {
			res.send("Added to watch later");
		} else {
			if (watchLater) {
				if (watchLater.watched === false) {
					await watchLater.destroy();
					res.send("Removed it from watch later list");
				} else {
					watchLater.watched = false;
					await watchLater.save();

					res.send("Changed to watch later from watched");
				}
			} else {
				res.send("ERROR");
			}
		}
	} catch (e) {
		throw e;
	}
});

router.get("/episode/watch/:id", async (req, res) => {
	try {
		const [watched, created] = await Watched.findOrCreate({
			where: {
				episodeId: req.params.id,
				userId: req.user.id,
			},
		});
		if (created === true) {
			res.send("Added episode to watched");
		} else {
			if (watched) {
				await watched.destroy();
				res.send("Removed episode from watched");
			} else {
				res.send("ERROR");
			}
		}
	} catch (e) {
		res.send(e);
	}
});

module.exports = router;
