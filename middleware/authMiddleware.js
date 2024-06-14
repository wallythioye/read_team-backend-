const jwt = require('jsonwebtoken');

const requireAuth =(req, res, next)=>{
    const token = req.cookie.jwt;

    //check json web token exists & is verified
    if(token){
        jwt.verify(token,'vivekeviv',(err, decodedToken)=>{
            if (err){
                console.log(err)
            }
            else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {

        console.log("You need to login")

    }
}

module.exports ={requireAuth}