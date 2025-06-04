import {products} from "../config/localDB.js"



export async function allProducts(req,res){
    try{
res.status(200).json({products})
    }catch(error){
        res.send(500).json({message: error})
    }
    
    
}


