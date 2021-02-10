const express = require("express");
const router = express.Router();

const WatchLater = require("../models/watchLater");

router.get("/content/watch/:id", async (req, res) => {
	try {
		const [like, created] = await WatchLater.findOrCreate({
			where: {
				contentId: req.params.id,
				userId: req.user.id,
			},
		});
		if (created === true) {
			res.send("Added to watch later");
		} else {
			await like.destroy();
			res.send("Removed from watch later");
		}
	} catch (e) {
		throw e;
	}
});

module.exports = router;
