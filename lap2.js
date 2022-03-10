const request = require('request')
var fs = require("fs");
const prompt = require('prompt');
const path='content_from_page.txt'
var url = 'https://en.wikipedia.org/wiki/Node.js'

function writeData(path,content){
    return new Promise((resolve,reject)=>{
        fs.writeFile(path,content,{flag:'w'},function(err){
            if(err){
                reject(err)
            }
            resolve('write data success');
        })
    })
}
request(url,function(err,res,body){
    if(err){
        console.error(err)
    }
    writeData(path,body)
    .then((res)=>{console.log(res)})
})