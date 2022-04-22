const jwt = require("jsonwebtoken");
const token_value_index = 1;
const redis = require("redis");
const redisClient = redis.createClient(6379);
const result = require("../helpers/response");
let permission;
redisClient.connect();
const checkToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[token_value_index];
  } else {
    return result.NOT_FOUND(res, "Pls insert token");
  }
  const verified = jwt.verify(token, process.env.SECRETKEY);
  permission = verified.permission;
  const tokenRedis = await redisClient.get(verified.user_id);
  if (token === tokenRedis) {
    try {
      next();
    } catch (err) {
      result.BAD_REQUEST(res, "server error");
    }
  } else {
    return result.FORBIDEN(res, "Invalid token");
  }
};
const checkPermission = (req, res, next) => {
  const action = req.method;
  const resource = req.originalUrl.substring(1, 5);
  if (permission[resource]) {
    const arrAct = permission[resource];
    if (arrAct.includes(action)) {
      next();
    } else {
      return result.FORBIDEN(
        res,
        `user don't have excute ${action} on ${resource}`,
      );
    }
  } else {
    return result.FORBIDEN(res, `user don't have permission on ${resource}`);
  }
};
module.exports = { checkPermission, checkToken };
