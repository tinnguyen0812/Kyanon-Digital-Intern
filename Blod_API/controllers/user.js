const user = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
                    const token = jwt.sign({id:data[0].id},"secret")
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