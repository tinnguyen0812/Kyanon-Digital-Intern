const Sequelize = require("sequelize");

module.exports = {
	name: "permission",
	define: {
		resource: Sequelize.STRING,
		action: Sequelize.STRING,
	},
};
