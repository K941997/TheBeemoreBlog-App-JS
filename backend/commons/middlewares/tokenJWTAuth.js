const jwt = require('jsonwebtoken');

const tokenJWTAuth = async(req, res, next) => {

        //Access Authorization from Header:
        const Authorization = req.header("authorization")
        
        if (!Authorization) {
            req.user = null;
            next();
        } else {
            //Get token from Authorization:
            const token = Authorization.replace("Bearer", "");

            //Verify token:
            try{
                const {userId} =  jwt.verify(token, process.env.ACCESS_TOKEN_JWT_KEY);
                req.user = {userId};
                next();
            } catch(err) {
                req.user = null;
                next();
            }
        }
            
        
        

       
   
}

module.exports = tokenJWTAuth;
