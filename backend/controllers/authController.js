import { hashPassword, checkPassword} from "../utils/hashPassword.js";
import UserAuth from "../models/user.model.js"
import { accessTokenCreation} from "../utils/JwtSession.js";
import jwt from "jsonwebtoken"
import {db} from "../config/localDB.js"
import dotenv from "dotenv";
dotenv.config()
 



export async function RegisterUser(req,res){
    console.log(req.body)
      if(!req.body.name || !req.body.email || !req.body.password) res.sendStatus(400)
    else{
    
        try{
        const hashedPassword= await hashPassword(req.body.password)
        const newUser = new UserAuth({
            name:req.body.name,
            email: req.body.email,
            password:hashedPassword,
            token:null
        })

        /* const savedUser = await newUser.save() */
        db.push(newUser)
        res.status(200).json({message:"Successfully created a new user",
            user: newUser
        })
    }catch(error){

        res.status(400).send(error)

    }
    }
}


export async function LoginUser(req,res){
 try{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({message: "Missing required credentials"})
    }

    const email = req.body.email;
    const inputPassword = req.body.password

    /* const wantedUser = await UserAuth.findOne({email:email}) */
        const wantedUser = await db.find((user) => user.email === email)

    if(wantedUser==null){
        return res.status(404).json({message: "User not found"})

    }
    const hashedPassword = wantedUser.password;

    const passwordMatch = await checkPassword(inputPassword,hashedPassword)
    if(!passwordMatch){
        return res.status(401).json({ message: "Invalid email or password" });
    }else{

        const payload ={
            id: wantedUser._id,
            email: wantedUser.email

        }

        function CookieCreation(accessToken,name){

        res.cookie(name, accessToken,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge: 60*60*1000
        })

        }

        CookieCreation(accessTokenCreation(payload),"accessToken");


         wantedUser.refreshToken = accessTokenCreation(payload)

        res.status(200).json({
            message:"Successfully logged in", 
            user:wantedUser
        });

    }



    
 }catch(error){
    res.status(400).send(error)
 }


}

export async function LogoutUser(req,res){

    res.clearCookie("accessToken",{
        httpOnly:true,
            secure:false,
            sameSite:"strict"
    })

    res.status(200).json({message:"Cookie was cleared"})

}
export async function ShowAllUsers(req,res){


    const allUsers= await UserAuth.find()
    /* res.status(200).send(allUsers) */
    res.status(200).send(db)

}

export function generateNewAccessToken(req,res){

    const refreshToken = req.body.refreshToken
    if(!refreshToken)res.status(403).json({message:"No refresh token provided"})
    

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err,user)=>{
        if(err) return res.status(403).json({messages:"Refresh token is invalid"})
            else{

                 const payload ={
                 id:user.id,
                 email:user.email
                 }
                const newAccessToken = accessTokenCreation(payload)
                res.status(200).json({newAccessToken: newAccessToken})
            }
    })
    
}

export function Me(req, res) {
  const token = req.cookies.accessToken;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "User not logged in" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ id: user.id });
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}



