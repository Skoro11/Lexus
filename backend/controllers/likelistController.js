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


export async function removeFromLikeList(req,res){
    const {_id} = req.body
    const userId= req.user.id

    try{
        const foundedItem =  products.find(item  =>item._id ===_id)
        const foundedUser = db.find(user=> user._id === userId)
        const userLikelist=foundedUser.likelist 


        const index = userLikelist.findIndex(item =>item._id ===foundedItem._id)

        if(index !== -1){
            userLikelist.splice(index,1)
        }

        res.status(200).json({
            userId: userId,
            user: foundedUser
        })
    }catch(error){
        console.log("Error remove from like list " + error)
    }
}


export async function removeAllFromLikeList(req,res){
    try{
        const userId = req.user.id;

    const foundedUser = db.find(user=> user._id === userId)
    foundedUser.likelist=[]
    
    console.log(foundedUser)
    res.status(200).json({
            userId: userId,
            user: foundedUser
        })
    }catch(error){
        console.log("Error by removeAllFromLikeList " + error)
    }
    
}

export function getLikeList(req,res){
    const userId = req.user.id;

    const foundedUser = db.find(user=>user._id === userId)
    res.status(200).json({
            likelist: foundedUser.likelist
        })

}

export function findItemsById(req,res){

    try{
        const {ids}= req.body

    const foundedItems = products.filter(item => ids.includes(item._id));

    
    console.log("Founded items FindItemsById",foundedItems)

    res.status(200).json({foundedItems})
    }catch(error){
        console.log("Error ",error)
    }

}