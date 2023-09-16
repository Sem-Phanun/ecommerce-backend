const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

exports.requestAuth = (auth) => {
    return (req, res, next) => {
        var authorization = req.headers['authorization']
        var token = null
        if(authorization != null && authorization != ""){
            token = authorization.split(" ")
            token = token[1]
        }
        if(token == null){
            res.status(401).send({
                message: "Unauthorized."
            })
        }else{
            jwt.verify(token, process.env.ACCESS_TOKEN, (error,result) => {
                if(error){
                    res.status(401).send({message: "Unauthorized."})
                }else{
                    var permission = result.data.permission
                    req.user = result.data
                    req.user_id = result.data.user.customer_id;
                    if(auth == null){
                        next();
                    }else if(permission.includes(auth)){
                        next()
                    }else {
                        res.status(401).send({message: "Unauthorized."})
                    }
                }
            })
        }
    }
}

exports.reqestAuthV = (req, res, next) => {
    const authorization = req.header(process.env.TOKEN_KEY)
    var token = null
    if(authorization != null && authorization != ""){
        token = authorization.split(" ")
        token = token[1]
    }
    if(token == null){
        res.status(401).send({message: "Unauthorized!"})
    }else{
        jwt.verify(token, process.env.ACCESS_TOKEN, (error, data)=> {
            if(error){
                res.status(401).send({message: "Unauthorized!"})
            }else{
                res.user = data;
                next();
            }
        })
    }
}
