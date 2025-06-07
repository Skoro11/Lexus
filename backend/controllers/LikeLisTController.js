import {db,products} from "../config/localDB.js"


export async function addToLikeList(req,res){
     const userId = req.user.id;
     const {_id } = req.body

     const foundedItem =  products.find(item  =>item._id ===_id)
     const foundedUser =db.find(user=> user._id === userId)

     
    try{
        
        const likelist= foundedUser.likelist
         
        const existingItem = likelist.find(item => item._id === foundedItem._id);
        
        if(existingItem){
            res.status(200).json({
                 userId: userId,
            user: foundedUser
            })
        }else{

            likelist.push(
                {_id:foundedItem._id,
                 name:foundedItem.name
                }
            )

            res.status(200).json({
            userId: userId,
            user: foundedUser
        })

        }

        

       


    }catch(error){
        res.status(200).json({message: "Something went wrong"})
        console.log("Error "+ error)
    }
    

}
