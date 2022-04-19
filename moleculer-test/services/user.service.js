"use strict";

const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");
const user = require("../models/user.model");
const { QueryTypes } = require("@sequelize/core");
const permission = require("../services/permission.service");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const redis = require("redis");
const redisClient = redis.createClient(6379);

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "user",

	mixins: [DbService, permission],
	adapter: new SqlAdapter("mysql://root:180300@localhost:3306/blog"),
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
				const data = await this.adapter.find({
					//attributes: ["id", "email", "passwordHash"],
					query: {
						email: ctx.params.email,
						passwordHash: ctx.params.password,
					},
				});
				if (data.length === 0) {
					ctx.meta.$statusCode = 404;
					return "Wrong email or password";
				}
				let permiss = {};
				const role = await this.getRole(data[0].dataValues.id);
				_.forEach(role, (value) => {
					const resource = value.resource;
					const action = value.action;
					permiss[resource]
						? permiss[resource].push(action)
						: (permiss[resource] = [action]);
				});
				let payload = {
					user_id: data[0].dataValues.id,
					permission: permiss,
				};
				const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET);
				await redisClient.connect();
				redisClient.set(data[0].dataValues.id, token);
				ctx.meta.$statusCode = 200;
				return { token: token };
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
};
