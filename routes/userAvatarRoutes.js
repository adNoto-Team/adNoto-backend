const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		const name = `user${req.user.id}-${Date.now()}-${file.originalname}`;
		cb(null, name);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
	fileFilter: fileFilter,
});

router.post("/user/avatar", upload.single("avatarPic"), async (req, res) => {
	const file = req.file;

	if (file) {
		req.user.avatar = file.destination + file.filename;
		await req.user.save();

		res.send({ complete: true });
	} else {
		res.send({
			complete: false,
		});
	}
});

module.exports = router;
