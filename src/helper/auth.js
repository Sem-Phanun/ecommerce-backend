const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

exports.requireAuth = (req, res, next) => {
    const authorization = req.header(process.env.TOKEN_KEY)
    var token = null
    if(authorization != null && authorization != ""){
        token = authorization.split(" ")
        token = token[1]
    }
    if(token == null){
        res.status(401).send({message: "Unauthorized!"})
    }else{
        jwt.verify(token, process.env.SECRET_KEY, (error, data)=> {
            if(error){
                res.status(401).send({message: "Unauthorized!"})
            }else{
                res.user = data;
                next();
            }
        })
    }
}
