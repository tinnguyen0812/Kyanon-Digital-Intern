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
	name: "authenticate",
	actions: {
		localAction(req, ctx, next, action) {
			return function (ctx) {
				checkToken(req, ctx);
				return next(ctx)
					.then((res) => {
						// Do something with the response
						return "da check dc token";
					})
					.catch((err) => {
						// Handle error or throw further
						return err;
					});
			};
		},
	},
	methods: {
		async checkToken(req, ctx) {
			if (
				req.headers.authorization &&
				req.headers.authorization.startsWith("Bearer")
			) {
				const token = req.headers.authorization.split(" ")[1];
				console.log(process.env.JWT_TOKEN_SECRET);
				const verified = jwt.verify(
					token,
					process.env.JWT_TOKEN_SECRET
				);
				const tokenRedis = await redisClient.get(verified.user_id);
				console.log(verified);
				// Check the token. Tip: call a service which verify the token. E.g. `accounts.resolveToken`
				if (token == tokenRedis) {
					// Returns the resolved user. It will be set to the `ctx.meta.user`
					return next();
				} else {
					// Invalid token
					ctx.meta.$statusCode = 403;
					return "Invalid token";
				}
			} else {
				// No token. Throw an error or do nothing if anonymous access is allowed.
				ctx.meta.$statusCode = 500;
				return "Pls give me a token";
			}
		},
	},
};
