const express = require('express');
const router = express.Router();
var passport = require('passport');
const jwt = require('jsonwebtoken')
const data={
    username:'test123',
    password:'123456',
    id:'1'
}
router.post('/',(req,res,next)=>{
    const user = req.body;
  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  if(data.username !=user.username || data.password!=user.password){
      res.status(400).json({
          message:'username or password incorrect'
      })
  }else{
    const token = jwt.sign({username:data.username,id:data.id},"secret");
    res.status(200).json({
        message:'login success',
        token:token
    });
    }  
})

module.exports = router;