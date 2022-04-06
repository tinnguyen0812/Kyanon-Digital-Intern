"use strict";

const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");
const user = require("../models/user.model");
const permission = require("../models/permission.model");
const user_permission = require("../models/user_permission.model");
const { QueryTypes } = require("@sequelize/core");
const jwt = require("jsonwebtoken");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "permission",

	mixins: [DbService],
	adapter: new SqlAdapter("mysql://root:180300@localhost:3306/blog"),
	model: user_permission,

	/**
	 * Action Hooks
	 */
	hooks: {},

	/**
	 * Actions
	 */
	actions: {},

	/**
	 * Methods
	 */
	methods: {
		async getRole(id) {
			try {
				const data = await this.adapter.db.query(
					"SELECT resource,action FROM permissions ,user_permissions WHERE user_permissions.permission_id=permissions.id AND user_id =?",
					{
						replacements: [id],
						type: QueryTypes.SELECT,
					}
				);
				console.log(data);
				return data;
			} catch (err) {
				return err;
			}
		},
	},
};
