const express = require("express");
const router = express.Router();

const Comment = require("../models/comment");
const Episode = require("../models/episode");
const Content = require("../models/content");

router.get("/comment/:id", (req, res) => {
	Comment.findByPk(req.params.id).then((comment) => {
		res.send(comment);
	});
});

router.post("/comment/episode/:id", async (req, res) => {
	const episode = await Episode.findByPk(req.params.id);

	const comment = await episode.createComment({
		userId: req.user.id,
		text: req.body.text,
		isSpoiler: req.body.isSpoiler,
	});

	res.send(comment);
	// Comment.create({ userId, contentId, isMovie, text }).then((response) => {
	// 	res.send(response);
	// });
});
router.get("/comment/episode/:id", async (req, res) => {
	const episode = await Episode.findByPk(req.params.id);

	const comments = await episode.getComments();
	res.send(comments);
	// Comment.create({ userId, contentId, isMovie, text }).then((response) => {
	// 	res.send(response);
	// });
});

router.post("/comment/content/:id", async (req, res) => {
	const content = await Content.findByPk(req.params.id);

	const comment = await content.createComment({
		userId: req.user.id,
		text: req.body.text,
		isSpoiler: req.body.isSpoiler,
	});

	res.send(comment);
	// Comment.create({ userId, contentId, isMovie, text }).then((response) => {
	// 	res.send(response);
	// });
});
router.get("/comment/content/:id", async (req, res) => {
	const content = await Content.findByPk(req.params.id);

	const comments = await content.getComments();
	res.send(comments);
	// Comment.create({ userId, contentId, isMovie, text }).then((response) => {
	// 	res.send(response);
	// });
});

module.exports = router;
