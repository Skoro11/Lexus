import {db} from "../config/localDB.js"
import jwt from "jsonwebtoken"

export async function AddToCart(req,res){

    const {accessToken, productId, name, price,quantity}= req.body
    const decoded= jwt.decode(accessToken)
    const userId =decoded.id 
    

    const item={
        productId:productId,
        name:name,
        price:price,
        quantity:quantity
    }
    const foundedUser=db.find(user =>user._id === userId)
    const userCart= foundedUser.cart
    

     const filteredItem = userCart.find(item => item.productId ===productId)
    
    

    if(filteredItem){
    
        filteredItem.quantity +=quantity;
        
    }else{
         foundedUser.cart.push(item);

    }
      if(foundedUser){
        res.status(200).json({user:foundedUser})
    }else{
        res.status(404).json({message: "User not found"})
    }

    
   
}


export async function RemoveFromCart(req, res) {
  const { accessToken, productId, quantity } = req.body;
  const decoded = jwt.decode(accessToken);
  const userId = decoded.id;

  const foundedUser = db.find(user => user._id === userId);

  if (!foundedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const userCart = foundedUser.cart;
  const itemIndex = userCart.findIndex(item => item.productId === productId);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  userCart[itemIndex].quantity -= quantity;

  if (userCart[itemIndex].quantity <= 0) {
    userCart.splice(itemIndex, 1);
  }
  return res.status(200).json({ user: foundedUser });
}


export async function RemoveAllFromCart(req,res){

    const { accessToken} = req.body;
     const decoded = jwt.decode(accessToken);
    const userId = decoded.id;

    const foundedUser = db.find(user => user._id === userId);

  if (!foundedUser) {
    return res.status(404).json({ message: "User not found" });
  }
     foundedUser.cart =[];

      return res.status(200).json({ user: foundedUser });
}