const Sequelize = require("sequelize");

module.exports = {
	name: "post",
	define: {
		authorId: Sequelize.STRING,
		title: Sequelize.STRING,
		slug: Sequelize.STRING,
		createdAt: Sequelize.STRING,
	},
};
