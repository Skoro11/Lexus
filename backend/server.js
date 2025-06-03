import app from "./app.js"
const port =process.env.PORT

import { DbConnection } from "./config/db.js"
app.listen(port, async ()=>{
    try{
        await DbConnection(process.env.MONGO_DB_CONNECTION_STRING)
        console.log("Backend is listening on http://localhost:"+ port )
    }catch(error){
        console.log(error)
    }
})
