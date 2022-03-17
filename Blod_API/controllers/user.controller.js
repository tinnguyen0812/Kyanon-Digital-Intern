const user = require("../models/user.model");
const permission = require("../models/permission.model");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const result = require("../helpers/response");
const { loginValidate, registerValidate } = require("../helpers/validation");
const { StatusCodes } = require("http-status-codes");
const redis = require("redis");
const redisClient = redis.createClient(6379);
redisClient.connect();
class UserController {
  async register(req, res) {
    const { error } = registerValidate(req.body);
    if (error) return result.BAD_REQUEST(res, error.details[0].message);
    try {
      const body = req.body;
      const data = await user.addUser(body);
      console.log(data);
      if (!data.sqlMessage) {
        result.OK(res, body, "regist success");
      } else {
        result.BAD_REQUEST(res, data.sqlMessage);
      }
    } catch (err) {
      console.log(err);
      return result.BAD_REQUEST(res, "Bad request");
    }
  }

  async login(req, res) {
    // const { error } = loginValidate(req.body);
    // if (error) return result.BAD_REQUEST(res, error.details[0].message);
    try {
      const body = req.body;
      const data = await user.getUserByEmail(body.email);
      if (data.length === 0) {
        return result.BAD_REQUEST(res, "email incorrect");
      }
      if (body.password != data[0].passwordHash) {
        return result.BAD_REQUEST(res, "password incorrect");
      }
      let permiss = {};
      const user_permiss = await permission.getPermissionByUser(data[0].id);
      _.forEach(user_permiss, (value) => {
        const resource = value.resource;
        const action = value.action;
        permiss[resource]
          ? permiss[resource].push(action)
          : (permiss[resource] = [action]);
      });
      let payload = {
        user_id: data[0].id,
        permission: permiss,
      };
      const token = jwt.sign(payload, process.env.SECRETKEY, {
        expiresIn: "1h",
      });
      redisClient.set(data[0].id, token);
      return result.OK(res, token, "login success");
    } catch (err) {
      console.log(err);
      return result.BAD_REQUEST(res, "server error");
    }
  }

  async logout(req, res) {
    try {
      const token =
        req.headers.authorization.split(" ")[process.env.token_value_index];
      const verified = jwt.verify(token, process.env.SECRETKEY);
      const id = verified.user_id;
      await redisClient.del(id);
      return result.OK(res, "", "logout success");
    } catch (error) {
      return result.BAD_REQUEST(res, "server error");
    }
  }

  async addPermision(req, res) {
    try {
      const body = req.body;
      const data = await permission.addPermission(
        body.user_id,
        body.permission_id,
      );
      if (data.affectedRows === 0) {
        return result.BAD_REQUEST(res, "add permission unsuccessfully");
      }
      console.log(data.affectedRows);
      redisClient.del(body.user_id);
      return res
        .status(StatusCodes.OK)
        .send({ message: "add permission successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  async delPermision(req, res) {
    try {
      const body = req.body;
      const data = await permission.deletePermission(body.permission_id);
      await redisClient.del(body.user_id);
      if (data.affectedRows === 0) {
        return result.BAD_REQUEST(res, "delete permission unsuccessfully");
      }
      console.log(data.affectedRows);
      redisClient.del(body.user_id);
      return res
        .status(StatusCodes.OK)
        .send({ msg: "delete permission successfully" });
    } catch (error) {
      return result.BAD_REQUEST(res, "server error");
    }
  }
}
module.exports = new UserController();
