var fs = require("fs");
const prompt = require('prompt')
var buf = new Buffer(1024);

prompt.start()
prompt.get(['path','content'],function(err,res){
    if(err){
        console.error(err)
    }
    fs.open(res.path,'r+',function(err,fd){
        if(err){
            return console.error(err)
        }
        fs.read(fd,buf,0,buf.length,0,function(err,bytes){
            if(err){
                console.error(err)
            }
            if(bytes>0){
                console.log("content before write:")
                console.log(buf.slice(0,bytes).toString());
            }
        });
        fs.writeFile(res.path,res.content,{flag:'w+'},function(err){
            if(err){
                console.error(err)
            }
            console.log('write data success');

            fs.read(fd,buf,0,buf.length,0,function(err,bytes){
                if(err){
                    console.error(err)
                }
                if(bytes>0){
                    console.log("Content after write:")
                    console.log(buf.slice(0,bytes).toString());
                }
                fs.close(fd, function(err){
                    if (err){
                       console.log(err);
                    } 
                 });
            });

        })

    });
})
