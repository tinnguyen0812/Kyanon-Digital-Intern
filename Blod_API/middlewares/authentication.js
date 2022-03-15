const jwt = require('jsonwebtoken');
const token_value_index = 1;
module.exports = function (req,res,next) {
    var token=''
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         token = req.headers.authorization.split(" ")[token_value_index]
    }
    if (!token) return res.status(401).send('Access denied');
    try {
        const verified = jwt.verify(token,"secret");
        console.log(verified)
        req.user = verified;
        next();
    }catch (err){
        res.status(400).send('Invalid token')
    }
}