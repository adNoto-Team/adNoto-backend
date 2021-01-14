const express = require("express");
const router = express.Router();

var content = require("../data/content.json");

router.get("/content/", (req, res) => {
	res.send(content);
});

router.get("/content/:id", (req, res) => {
	res.send(content[req.params.id]);
});

module.exports = router;
