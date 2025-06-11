import {db,products} from "../config/localDB.js"


export async function addToWatchlist(req,res){
     const userId = req.user.id;
     const {_id } = req.body

     const foundedItem =  products.find(item  =>item._id ===_id)
     const foundedUser =db.find(user=> user._id === userId)

     
    try{
        
        const watchlist= foundedUser.watchlist
         
        const existingItem = watchlist.find(item => item._id === foundedItem._id);
        
        if(existingItem){
            res.status(200).json({
                 userId: userId,
            user: foundedUser
            })
        }else{

            watchlist.push(
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


export async function removeFromWatchlist(req,res){
    const {_id} = req.body
    const userId= req.user.id

    try{
        const foundedItem =  products.find(item  =>item._id ===_id)
        const foundedUser = db.find(user=> user._id === userId)
        const userWatchlist=foundedUser.watchlist 


        const index = userWatchlist.findIndex(item =>item._id ===foundedItem._id)

        if(index !== -1){
            userWatchlist.splice(index,1)
        }

        res.status(200).json({
            userId: userId,
            user: foundedUser
        })
    }catch(error){
        console.log("Error remove from Watchlist " + error)
    }
}


export async function removeAllFromWatchlist(req,res){
    try{
        const userId = req.user.id;

    const foundedUser = db.find(user=> user._id === userId)
    foundedUser.watchlist=[]
    
    console.log(foundedUser)
    res.status(200).json({
            userId: userId,
            user: foundedUser
        })
    }catch(error){
        console.log("Error by removeAllFromWatchlist " + error)
    }
    
}

export function getWatchlist(req,res){
    const userId = req.user.id;

    const foundedUser = db.find(user=>user._id === userId)
    res.status(200).json({
            watchlist: foundedUser.watchlist
        })

}

export function findItemsByIdWatchlist(req,res){

    try{
        const {ids}= req.body

    const foundedItems = products.filter(item => ids.includes(item._id));

    
    console.log(foundedItems)

    res.status(200).json({foundedItems})
    }catch(error){
        console.log("Error ",error)
    }

}