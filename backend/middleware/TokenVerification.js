import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
dotenv.config()


export function authenticateToken(req,res,next){
const authHeader = req.headers["authorization"]
const token = authHeader && authHeader.split(" ")[1];
if(!token) return res.status(403).json({message:"There is no access token"})
    else{

    jwt.verify(token, process.env.JWT_SECRET, (err,user) =>{

        if(err) return res.status(403).json({message:"Access token is invalid"})
        req.user=user;
    next()
    })

    }
}


export function authenticateTokenFromCookie(req,res,next){
    const token = req.cookies.accessToken

    if(!token){
        return res.status(401).json({message: "No token provided"})
    }
    next()
       
}