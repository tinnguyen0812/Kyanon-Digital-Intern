const Sequelize = require("sequelize");

module.exports = {
	name: "user_permission",
	define: {
		user_id: Sequelize.BIGINT,
		permission_id: Sequelize.BIGINT,
	},
};
