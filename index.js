const app = require("./app")
const mongoose = require("mongoose")


const PORT =8080;

//database connection
const connectDb = async () =>{
    try{
     await mongoose.connect("mongodb://127.0.0.1:27017/MernSales");
     console.log("db is connected")
    }catch(error){
     console.log("db is not connected");
    }
 }


 app.listen(PORT,  async()=> {
    console.log("Backend server running");
    await connectDb();
})
