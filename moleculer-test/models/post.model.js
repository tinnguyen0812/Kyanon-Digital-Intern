const Sequelize = require("sequelize");

module.exports = {
	name: "post",
	define: {
		authorId: Sequelize.BIGINT,
		title: Sequelize.STRING,
		slug: Sequelize.STRING,
	},
};
