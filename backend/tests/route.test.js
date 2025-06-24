import app from "../app.js"
import request from "supertest"





describe("First API test",()=>{

    test("GET / that responds with this is the backend", async ()=>{
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual("This is the note taking backend")
    })


})