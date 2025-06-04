import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()



export function accessTokenCreation(payload){

const signedJWT = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: "15m"})
return signedJWT


}


export function refreshTokenCreation(payload){

    const refreshToken =jwt.sign(payload,process.env.REFRESH_TOKEN,{expiresIn: "7d"})
    return refreshToken
}




