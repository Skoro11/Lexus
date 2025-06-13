import { products } from "../config/localDB.js"

export async function getAllProducts (req,res){
    res.status(200).json({AllItems:products})





}

export async function addNewProduct(req,res){

const{_id,slug,image,stars,name,price,tag,numOfReviews,discountedPrice,description,category,specialCategory}= req.body
    
 let newProduct={
      _id:_id,
      slug:slug,
      image:image,
      stars:stars,
      name:name,
      price:price,
      tag:tag,
      numOfReviews:numOfReviews,
      discountedPrice:discountedPrice,
      description:description,
      category:category,
      specialCategory: specialCategory
    }

    console.log(newProduct)
    products.push(newProduct)
    res.status(200).json(products)

}

export async function removeProduct(req, res) {
  const { _id } = req.body;

  const output = products.findIndex(item => String(item._id) === String(_id));

  if (output !== -1) {
    products.splice(output, 1);
    console.log("Deleted index:", output);
    res.status(200).json(products);
  } else {
    console.warn("No item found with _id:", _id);
    res.status(404).json({ error: "Item not found" });
  }
}


export async function updateProduct(req,res){
    
    const updates = req.body
    const product = products.find(item => item._id === updates._id)

   for (let key in updates) {
        if (product[key] !== undefined && product[key] !== null) {
            product[key] = updates[key];
        }
    }
    
    res.status(200).json(product)
}