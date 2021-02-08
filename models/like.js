const Sequelize = require("sequelize");

const sequelize = require("../database/mysql");

const Like = sequelize.define("like", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	commentId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});

module.exports = Like;
