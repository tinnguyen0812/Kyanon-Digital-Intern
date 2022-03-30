"use strict";

const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");
const post = require("../models/post.model");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "post",
	// version: 1

	/**
	 * Mixins
	 */
	mixins: [DbService],
	adapter: new SqlAdapter("blog", "root", "180300", {
		host: "localhost",
		dialect: "mysql",
	}),
	model: post,
	/**
	 * Settings
	 */
	settings: {
		// Available fields in the responses
		// Validator for the `create` & `insert` actions.
		entityValidator: {
			authorId: "string|max:20",
			slug: "string|max:100",
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
		/**
		 * The "moleculer-db" mixin registers the following actions:
		 *  - list
		 *  - find
		 *  - count
		 *  - create
		 *  - insert
		 *  - update
		 *  - remove
		 */

		// --- ADDITIONAL ACTIONS ---
		test: {
			rest: "GET test",
			async handler() {
				console.log(this.adapter);
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
