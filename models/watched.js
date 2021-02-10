const Sequelize = require("sequelize");

const sequelize = require("../database/mysql");

const Watched = sequelize.define("watched", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	episodeId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});

module.exports = Watched;
