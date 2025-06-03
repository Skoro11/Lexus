import mongoose from "mongoose"

export async function DbConnection(connectionString){

    try{
        await mongoose.connect(connectionString)
        console.log("MongoDb Connected")
  
    }catch(error){
        console.log("Problem with connecting to MongoDb " + error)

    }


}