"use strict";

const ApiGateway = require("moleculer-web");
const redis = require("redis");
const redisClient = redis.createClient(6379);
const jwt = require("jsonwebtoken");
redisClient.connect();
const E = require("moleculer-web").Errors;
const middlewares = require("../middlewares/my.middlewares");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 * @typedef {import('http').IncomingMessage} IncomingRequest Incoming HTTP Request
 * @typedef {import('http').ServerResponse} ServerResponse HTTP Server Response
 */

module.exports = {
	name: "admin",
	mixins: [ApiGateway, middlewares],

	// More info about settings: https://moleculer.services/docs/0.14/moleculer-web.html
	settings: {
		// Exposed port
		port: process.env.PORT || 3500,

		// Exposed IP
		ip: "0.0.0.0",

		// Global Express middlewares. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Middlewares
		use: [],

		routes: [
			{
				path: `admin/`,

				whitelist: ["permission.*"],

				// Route-level Express middlewares. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Middlewares
				use: [],

				// Enable/disable parameter merging method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Disable-merging
				mergeParams: true,

				// Enable authentication. Implement the logic into `authenticate` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authentication
				authentication: false,

				// Enable authorization. Implement the logic into `authorize` method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Authorization
				authorization: false,

				// The auto-alias feature allows you to declare your route alias directly in your services.
				// The gateway will dynamically build the full routes from service schema.
				autoAliases: true,

				aliases: {},

				/**
				 * Before call hook. You can check the request.
				 * @param {Context} ctx
				 * @param {Object} route
				 * @param {IncomingRequest} req
				 * @param {ServerResponse} res
				 * @param {Object} data
				 *
				onBeforeCall(ctx, route, req, res) {
					// Set request headers to context meta
					ctx.meta.userAgent = req.headers["user-agent"];
				}, */

				/**
				 * After call hook. You can modify the data.
				 * @param {Context} ctx
				 * @param {Object} route
				 * @param {IncomingRequest} req
				 * @param {ServerResponse} res
				 * @param {Object} data
				onAfterCall(ctx, route, req, res, data) {
					// Async function which return with Promise
					return doSomething(ctx, res, data);
				}, */

				// Calling options. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Calling-options
				callingOptions: {},

				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB",
					},
					urlencoded: {
						extended: true,
						limit: "1MB",
					},
				},

				// Mapping policy setting. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Mapping-policy
				mappingPolicy: "all", // Available values: "all", "restrict"

				// Enable/disable logging
				logging: true,
			},
		],

		// Do not log client side errors (does not log an error response when the error.code is 400<=X<500)
		log4XXResponses: false,
		// Logging the request parameters. Set to any log level to enable it. E.g. "info"
		logRequestParams: null,
		// Logging the response data. Set to any log level to enable it. E.g. "info"
		logResponseData: null,

		// Serve assets from "public" folder. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Serve-static-files
		assets: {
			folder: "public",

			// Options to `server-static` module
			options: {},
		},
	},

	methods: {
		/**
		 * Authenticate the request. It check the `Authorization` token value in the request header.
		 * Check the token value & resolve the user by the token.
		 * The resolved user will be available in `ctx.meta.user`
		 *
		 * PLEASE NOTE, IT'S JUST AN EXAMPLE IMPLEMENTATION. DO NOT USE IN PRODUCTION!
		 *
		 * @param {Context} ctx
		 * @param {Object} route
		 * @param {IncomingRequest} req
		 * @returns {Promise}
		 */
		async authenticate(ctx, route, req) {
			// Read the token from header
			if (
				req.headers.authorization &&
				req.headers.authorization.startsWith("Bearer")
			) {
				const token = req.headers.authorization.split(" ")[1];
				const verified = await jwt.verify(
					token,
					process.env.JWT_TOKEN_SECRET
				);
				const tokenRedis = await redisClient.get(verified.user_id);
				// Check the token. Tip: call a service which verify the token. E.g. `accounts.resolveToken`
				if (token == tokenRedis) {
					ctx.meta.user = verified;
					// Returns the resolved user. It will be set to the `ctx.meta.user`
					return Promise.resolve(ctx);
				} else {
					// Invalid token

					return Promise.reject(
						new E.UnAuthorizedError(E.ERR_INVALID_TOKEN)
					);
				}
			} else {
				// No token. Throw an error or do nothing if anonymous access is allowed.
				return Promise.reject(new E.UnAuthorizedError(E.ERR_NO_TOKEN));
			}
		},

		/**
		 * Authorize the request. Check that the authenticated user has right to access the resource.
		 *
		 * PLEASE NOTE, IT'S JUST AN EXAMPLE IMPLEMENTATION. DO NOT USE IN PRODUCTION!
		 *
		 * @param {Context} ctx
		 * @param {Object} route
		 * @param {IncomingRequest} req
		 * @returns {Promise}
		 */
		async authorize(ctx, route, req) {
			// Get the authenticated user.
			const res = await this.authenticate(ctx, route, req);
			const user_permiss = ctx.meta.user.permission;
			console.log(ctx.meta.user);
			const action = req.method;
			const resource = req.url.substring(1, 5);
			if (user_permiss[resource]) {
				const actArray = user_permiss[resource];
				if (actArray.includes(action)) {
					return Promise.resolve();
				} else {
					return Promise.reject(
						new E.ForbiddenError(
							`User don't have ${action} on ${resource}`
						)
					);
				}
			} else {
				return Promise.reject(
					new E.ForbiddenError(
						`User don't have permission on ${resource}`
					)
				);
			}
		},
	},
};
