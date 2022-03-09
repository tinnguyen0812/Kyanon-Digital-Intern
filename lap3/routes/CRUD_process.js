const fs = require('fs');
const express = require('express');
const router = express.Router();
const verify = require('./verify')
const dataPath = "E:\\Kyanon-Digital-Intern\\lap3\\data.json"

const saveData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}
function makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
};

router.post('/create',verify,(req,res)=>{
    var existData = getData();
    const newId = makeid(4);
    existData[newId]=req.body;
    saveData(existData);
    res.send({success:true, msg:'data added successfully'})

})
router.get('/read',verify,(req,res)=>{
    const data= getData()
    
    res.send(data);
})
router.put('/update/:id',verify,(req,res)=>{
    var existData = getData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
        const Id = req.params['id'];
        existData[Id] = req.body;
        saveData(existData);
        res.send(`data has been updated`)
      }, true);
})
router.delete('/del/:id',verify,(req,res)=>{
    fs.readFile(dataPath, 'utf8', (err, data) => {
        var existData = getData()
        const userId = req.params['id'];
        delete existData[userId]; 
        saveData(existData);
        res.send(`data with id ${userId} has been deleted`)
      }, true);
})
module.exports = router;