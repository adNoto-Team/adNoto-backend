const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	// authorization === 'Bearer laksjdflaksdjasdfklj'

	if (!authorization) {
		return res.status(401).send({ error: "You must be logged in." });
	}

	const token = authorization.replace("Bearer ", "");
	jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
		if (err) {
			return res.status(401).send({ error: "You must be logged in." });
		}

		const { username } = payload;

		const thisUser = await User.findOne({ where: { username } });

		if (!thisUser) {
			return res.status(401).send({ error: "False JWT" });
		}
		req.user = thisUser;
		next();
	});
};
