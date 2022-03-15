const category = require('../models/category.model')

class categoryController{
    async List(req,res){
        try{
            const data = await category.getAllCategory();
            if(data.length === 0){
                res.status(404).send({msg:"list is empty"})
            }
            res.status(200).send({data:data})
        }catch(error){
            console.log(error);
            res.status(404).send('msg:Not found')
        }
    }
    async Detail(req,res){
        try{
            const data = await post.category.getcategoryById(req.params.id);
            if(data.length===0){
                res.status(404).send({msg:`Not category have id=${req.params.id}`})
            }
            else res.status(200).send({data:data})
        }catch(error){
            console.log(error);
            res.status(404).send('msg:Not found')
        }
    }
    async Create(req,res){
        try{
            const data = await category.addcategory(req.body);
            if( data[0].affectedRows===0){
                res.status(400).send({msg:"insert unsuccess"})
            }
            res.status(200).send({msg:"insert success",data:req.body})
        }catch(error){
            console.log(error);
            res.status(404).send('msg:Not found')
        }
    }
    async Update(req,res){
        try{
            const data = await category.updatecategory(req.params.id,req.body);
            res.status(200).send({data:data})
        }catch(error){
            console.log(error);
            res.status(404).send('msg:Not found')
        }
    }
    async Delete(req,res){
        try{
            const data = await category.deletecategoryById(req.params.id);
            if( data[0].affectedRows===0)
            {
                res.status(404).send({msg:'Delete unsuccess'})
            }
            res.status(200).send({msg:'Delete success'})
        }catch(error){
            console.log(error);
            res.status(404).send('msg:Not found')
        }
    }
}
module.exports = new categoryController;