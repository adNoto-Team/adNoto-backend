const Sequelize = require("sequelize");

const sequelize = require("../database/mysql");

const Episode = sequelize.define("episode", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	episodeNumber: Sequelize.INTEGER,
	picture: Sequelize.TEXT,
	desc: Sequelize.TEXT,
	airDate: Sequelize.DATE,
	seasonId: Sequelize.INTEGER,
});

module.exports = Episode;
