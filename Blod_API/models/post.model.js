const db = require('../config/connect');
const query = db.promise();
const post ={
    async getAllPost(){
        try{
            const list = await query.query("Select * from post");
            return list[0];
        }catch(error){
            console.log(error)
        }
    },
    async getPostById(id){
        try{
            const post = await query.query("select * from post where id=?",[id])
            return post[0];
        }catch(error){
            console.log(error)
            return error;
        }
    },
    async addPost(post){
        try{
            const result = await query.query("insert into post(authorId,title,slug,createdAt) values(?,?,?,?)",[post.authorId,post.title,post.slug,post.createdAt])
            return result;
        }catch(error){
            console.log(error)
            return error
        }
    },
    async updatePost(id,post){
        try{
            const result = await query.query("update post set authorId=?,title=?,slug=? where id=?",[post.authorId,post.title,post.slug,id])
            return result;
        }catch(error){
            console.log(error)
            return error
        }
    },
    async deletepostById(id){
            const post = await query.query("delete from post where id=?",[id])
                .catch((err)=>{
                    throw err;
                })
            return post;
    }
};
module.exports = post;