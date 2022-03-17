const user = require('../models/user.model')
const permission = require('../models/permission.model')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const result = require('../helpers/response')
const redis = require('redis')
const redisClient = redis.createClient(6379);

class UserController{
    async register(req,res){
        try{
            const body = req.body;
            const data = await user.addUser(body);
            console.log(data)
            if (!data.sqlMessage) {
                result.OK(res,body,'regist success')
            } else {
                result.BAD_REQUEST(res,data.sqlMessage)
            }
        } catch (err) {
            console.log(err)
            result.BAD_REQUEST(res,'Bad request')
        }
    }
    async login(req,res){
        try{
            const body= req.body;
            const data = await user.getUserByEmail(body.email);
            if (!(body.email && body.password)) {
                return result.BAD_REQUEST(res,'password and email required')
            }
            if (data.length === 0) {
                return result.BAD_REQUEST(res,'email incorrect')
            }
            if (body.password != data[0].passwordHash) {
                return result.BAD_REQUEST(res,'password incorrect')
            } 
            let permiss={};
            const user_permiss = await permission.getPermissionByUser(data[0].id);
            _.forEach(user_permiss,(value)=>{
                const resource = value.resource;
                const action = value.action;
                permiss[resource] ? permiss[resource].push(action) : (permiss[resource] = [action]);
            });
            let payload ={
                user_id : data[0].id,
                permission : permiss
            }
            const token = jwt.sign( payload,process.env.SECRETKEY)
            redisClient.connect();
            redisClient.set('token', token )
            return result.OK(res,token,'login success')
        }           
        catch (err) {
            console.log(err)
            return result.BAD_REQUEST(res,'server error')
        }
    }
}
module.exports = new UserController;