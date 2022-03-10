var fs = require("fs");
const prompt = require('prompt')


function readData(path){
    return new Promise(function(resolve,reject){
        fs.readFile(path,(err,data)=>{
            if(err){
                reject(err)
            }
            resolve(data.toString())
        })
    })
}
function writeData(path,content){
    return new Promise(function(resolve,reject){
        fs.writeFile(path,content,{flag:'w'},function(err){
            if(err){
                reject(err)
            }
            resolve('write data success');
        })
    })
}

prompt.start()
prompt.get(['path','content'],function(err,res){
    if(err){
        console.error(err)
    }
    writeData(res.path,res.content)
    .then(function(res){console.log(res)})
    readData(res.path)
    .then(function(res){console.log(res)})
})
