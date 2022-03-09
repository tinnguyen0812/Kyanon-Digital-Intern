const passport = require('passport');
const LocalStrategy = require('passport-local');
const user={
    username:'test123',
    password:'123456',
    id:'1'
}
passport.use(new LocalStrategy(
    (username,pass, done) => {
        if(user.username === username && user.password === pass){
            return(done,user)
            }
            else{
                return done(null, false, { errors: { 'email or password': 'is invalid' } });
            } 
       })
   )