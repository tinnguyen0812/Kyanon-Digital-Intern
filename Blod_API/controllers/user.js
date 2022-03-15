const user = require('../models/user.model')
const permission = require('../models/permission.model')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
class userController{
    async register(req,res){
        try{
            const body = req.body;
            const data = await user.addUser(body);
            console.log(data)
            if(!data.sqlMessage){
                res.status(200).send({mgs:"regist success",data:req.body}) 
            }else{
                res.status(400).send({mgs:data.sqlMessage})
            }
        }catch(err){
            console.log(err)
            res.status(400).send({msg:'Bad request'})
        }
    }
    async login(req,res){
        try{
            const body= req.body;
            const data = await user.getUserByEmail(body.email);
            if(!(body.email&&body.password)){
                return res.status(400).send({mgs:'email and password is require'})
            }
            if(data.length===0){
                return res.status(400).send({mgs:'email incorrect'})
            }else{
                if(body.password!=data[0].passwordHash){
                    return res.status(400).send({mgs:'password incorrect'})
                }else{
                    let permiss={};
                    const user_permiss = await permission.getPermissionByUser(data[0].id);
                    _.forEach(user_permiss,(value)=>{
                        const resource = value.resource;
                        const action = value.action;
                        permiss[resource]?permiss[resource].push(action): permiss[resource]=[action]
                    });
                    let payload ={
                        user_id:data[0].id,
                        permission:permiss
                    }
                    const token = jwt.sign(payload,"secret")
                    return res.status(200).send({token:token})
                }
            
            }
        }           
        catch(err){
            console.log(err)
            res.status(400).send({msg:'Bad request'})
        }
    }
}
module.exports = new userController;