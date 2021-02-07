const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const bcrypt = require("bcrypt");

const User = require("../models/User");

router.post("/signup", async (req, res) => {
	if (
		!req.body.username ||
		!req.body.password ||
		!req.body.name ||
		!req.body.surname ||
		!req.body.mail
	) {
		res.send("Fields required are not present");
	} else
		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				throw err;
			}
			if (!req.body.password) {
				res.status(401).send("No password");
			}
			bcrypt.hash(req.body.password, salt, async (err, hash) => {
				if (err) {
					throw err;
				}
				try {
					const [user, created] = await User.findOrCreate({
						where: {
							[Op.or]: [
								{ username: req.body.username },
								{ mail: req.body.mail },
							],
						},
						defaults: {
							username: req.body.username,
							mail: req.body.mail,
							password: hash,
							name: req.body.name,
							surname: req.body.surname,
						},
					});

					if (created && user && user._options.isNewRecord) {
						const token = jwt.sign(
							{ username: req.body.username },
							process.env.SECRET_KEY
						);

						res.send({
							created: true,
							message: "User created",
							login: true,
							token,
						});
					} else if (!created && user && !user._options.isNewRecord) {
						res.send({
							created: false,
							message: "User already exists!",
						});
					} else {
						res.send({ created, message: "ERROR", error: true });
					}
				} catch (e) {
					throw e;
				}
			});
		});
});

router.post("/login", async (req, res) => {
	if (!req.body.username || !req.body.password) {
		res.send("Fields required are not present");
	} else
		try {
			const user = await User.findOne({
				where: { username: req.body.username },
			});
			if (user) {
				bcrypt.compare(
					req.body.password,
					user.password,
					async (err, isMatch) => {
						if (err) {
							console.log(
								"Error sadly : " +
									JSON.stringify(err, undefined, 2)
							);
						}

						if (!isMatch) {
							res.send({
								login: false,
								message: "Incorrect username or password!",
							});
						} else {
							const token = jwt.sign(
								{ username: user.username },
								process.env.SECRET_KEY
							);
							res.send({
								token,
								login: true,
								message: "Logged in",
							});
						}
					}
				);
			}
			if (!user) {
				res.send({
					login: false,
					message: "No matching username",
				});
			}
		} catch (error) {
			throw error;
		}
});

module.exports = router;
