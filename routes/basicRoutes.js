const db = require("../database/mysql");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("Running");
});

router.get("/db", (req, res) => {
	db.query("SELECT * FROM testTable", (err, result) => {
		res.send(JSON.stringify(result));
	});
});
module.exports = router;
