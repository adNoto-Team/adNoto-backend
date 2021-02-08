const express = require("express");
const router = express.Router();

const Comment = require("../models/comment");
const Like = require("../models/like");
const Content = require("../models/content");

router.get("/comment/like/:id", async (req, res) => {
	try {
		const [like, created] = await Like.findOrCreate({
			where: {
				commentId: req.params.id,
				userId: req.user.id,
			},
		});
		if (created === true) {
			res.send("You liked it!");
		} else {
			await like.destroy();
			res.send("Deleted");
		}
	} catch (e) {
		throw e;
	}
});

module.exports = router;
