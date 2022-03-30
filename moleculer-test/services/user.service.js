"use strict";

const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");
const user = require("../models/user.model");
const { QueryTypes } = require("@sequelize/core");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "user",

	mixins: [DbService],
	adapter: new SqlAdapter("blog", "root", "180300", {
		host: "localhost",
		dialect: "mysql",
	}),
	model: user,
	/**
	 * Settings
	 */
	settings: {
		// Available fields in the responses
		// Validator for the `create` & `insert` actions.
		entityValidator: {
			email: "string|max:20",
			passwordHash: "string|min:6",
		},
	},

	/**
	 * Action Hooks
	 */
	hooks: {
		before: {
			/**
			 * Register a before hook for the `create` action.
			 * It sets a default value for the quantity field.
			 *
			 */
		},
	},

	/**
	 * Actions
	 */
	actions: {
		login: {
			rest: "POST login",
			async handler(ctx, res) {
				const email = ctx.params.email;
				console.log("email", email);
				const data = await this.adapter.find({ query: { email } });
				console.log(data);
				return "test post service";
			},
		},
	},

	/**
	 * Methods
	 */
	methods: {},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {
		console.log("connected service prodcut");
		// await this.adapter.collection.createIndex({ name: 1 });
	},
};
