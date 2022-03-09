const request = require('request')
var fs = require("fs");
const prompt = require('prompt');
var path='content_from_page.txt'
var url = ''

prompt.start()
prompt.get(['path'],function(err,res){
    if(err){
        console.error(err)
    }
    url=res.path;
    request(url,function(err,res,body){
        if(err){
            console.error(err)
        }
        fs.open(path,'w+',function(err,fd){
            if(err){
                return console.error(err)
            }
            fs.writeFile(path,body,{flag:'a+'},function(err){
                if(err){
                    console.error(err)
                }
                console.log('write data success');
                fs.close(fd, function(err){
                    if (err){
                    console.log(err);
                    } 
                });
            })
        });
    })
})