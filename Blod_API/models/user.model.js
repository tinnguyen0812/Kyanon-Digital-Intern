const temp = require('../config/connect')
const db = temp.promise();
const user ={
    async getAllUser(){
        const list = await db.query("Select * from user");
        if(list.lenght ===0 ){
            return null
        }
        return list
    },
    async getUserByEmail(email){
        try{
            const user = await db.query("select id,email,passwordHash from user where email=?",[email])
            return user[0];
        }catch(error){
            console.log(error)
            return error;
        }
    },
    async getUserById(id){
        const user = await db.query("select * from user where id=?",[id])
        if(!user){
            return null
        }
        return user;
    },
    async addUser(user){
        try{
            const result = await db.query("insert into user(email,passwordHash,registeredAt) values(?,?,?)",[user.email,user.password,user.registeredAt])
            return result;
        }catch(err){
            return err;
        }

    },
    async deleteUserById(id){
        const user = await db.query("delete from user where id=?",[id]);
        if(!user){
            return null
        }
        return user;
    }
};
module.exports = user;