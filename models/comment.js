const Sequelize = require("sequelize");

const sequelize = require("../database/mysql");

const Comment = sequelize.define("comment", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	contentId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	episodeId: Sequelize.INTEGER,
	text: Sequelize.TEXT,
	isSpoiler: Sequelize.BOOLEAN,
});

module.exports = Comment;
