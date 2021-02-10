const Sequelize = require("sequelize");

const sequelize = require("../database/mysql");

const WatchLater = sequelize.define("watchLater", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	contentId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});

module.exports = WatchLater;
