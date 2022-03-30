const Sequelize = require("sequelize");

module.exports = {
	name: "user",
	define: {
		firstName: Sequelize.STRING,
		middleName: Sequelize.STRING,
		lastName: Sequelize.STRING,
		mobile: Sequelize.STRING,
		email: Sequelize.STRING,
		passwordHash: Sequelize.STRING,
		registeredAt: Sequelize.STRING,
	},
};
