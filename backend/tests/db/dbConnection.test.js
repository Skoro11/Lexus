import mongoose from "mongoose"
import { DbConnection } from "../../config/db"; 
import dotenv from "dotenv"
dotenv.config()

describe("Testing MongoDb connection",()=>{

    const MongoDbConnectionString= process.env.MONGO_DB_CONNECTION_STRING 
    const WrongConnectionString = 12314553535
    test("Should connect to MongoDb, this is correct string", async ()=>{
       await DbConnection(MongoDbConnectionString);

            expect(mongoose.connection.readyState).toBe(1)

        await mongoose.connection.close();
    })

    test("Should not connect to MongoDB, wrong connection string", async()=>{
        await DbConnection(WrongConnectionString);
        expect(mongoose.connection.readyState).toBe(0)

        await mongoose.connection.close();
    })

})