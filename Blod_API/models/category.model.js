const { errorMonitor } = require('prompt');
const db = require('../config/connect');
const query = db.promise();
const category ={
    async getAllCategory(){
        try{
            const data = await query.query('select * from category')
            return data[0];
        }catch(error){
            console(error)
        }
    },
    async getcategoryById(id){
        try{
            const category =await query.query("select * from category where id=?",[id])
            if(!category){
                return null
            }
            return category[0];
        }catch(error){
            console(error)
        }
    },
    async addcategory(category){
        try{
            const result= await query.query('insert into category(parentId,title,metaTitle,slug) values(?,?,?,?)',[category.parentId,category.title,category.metaTitle,category.slug])
            return result;
        }catch(error){
            console.log(error)
        }
    },
    async updatecategory(id,category){
        try{
            const result = await query.query("update category set parentId=?,title=?,metaTitle=? where id=?",[category.parentId,category.title,category.metaTitle,id])
            if(!result){
                return null
            }
            return result;
        }catch(error){
            console(error)
        }
        
    },
    async deletecategoryById(id){
        try{
            const category = await query.query("delete from category where id=?",[id]);
            if(!category){
                return null
            }
            return category;
        }catch(error){
            console(error)
        }
    }
};
module.exports = category;