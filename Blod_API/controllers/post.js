const post = require('../models/post.model')
const _ = require('lodash')

class postController{
    async List(req,res){
            const data = await post.getAllPost();
            if(data.length === 0){
                res.status(404).send({msg:"list is empty"})
            }
            res.status(200).send({data:data})
    }
    async Detail(req,res){
            const data = await post.getPostById(req.params.id);
            if(data.length===0){
                res.status(404).send({msg:`Not post have id=${req.params.id}`})
            }
            else res.status(200).send({data:data})
    }
    async Create(req,res){
        try{
            const data = await post.addPost(req.body);
            if(!data.sqlMessage){
                res.status(200).send({mgs:"create success",data:req.body}) 
            }else{
                res.status(400).send({mgs:data.sqlMessage})
            }    
        }catch(error){
            console.log(error);
            res.status(404).send('msg:Not found')
        }
    }
    async Update(req,res){
        try{
            const data = await post.updatePost(req.params.id,req.body);
            res.status(200).send({data:data})
        }catch(error){
            console.log(error);
            res.status(404).send('msg:Not found')
        }
    }
    async Delete(req,res){
        try{
            const data = await post.deletepostById(req.params.id);
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
module.exports = new postController;