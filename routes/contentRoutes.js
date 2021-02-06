const express = require("express");
const router = express.Router();

const Content = require("../models/content");
const Season = require("../models/season");
const Episode = require("../models/episode");

router.get("/feed", (req, res) => {
	
});

router.get("/content/:id", (req, res) => {
	res.send(content[req.params.id]);
});

module.exports = router;
