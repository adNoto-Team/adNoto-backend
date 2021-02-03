const express = require("express");
const router = express.Router();

const Comment = require("../models/comment");

router.get("/comment/", (req, res) => {
	Comment.findAll().then((comments) => {
		res.send(JSON.stringify(comments));
	});
});

router.get("/comment/:id", (req, res) => {
	Comment.findByPk(req.params.id).then((comment) => {
		res.send(comment);
	});
});

router.post("/comment", (req, res) => {
	const userId = req.body.userId;
	const contentId = req.body.contentId;
	const isMovie = req.body.isMovie;
	const text = req.body.text;

	Comment.create({ userId, contentId, isMovie, text }).then((response) => {
		res.send(response);
	});
});

module.exports = router;
