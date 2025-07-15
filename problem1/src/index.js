
import dotenv from "dotenv";
dotenv.config();


import {app} from "./app.js";




app.listen(process.env.PORT ||8000,()=>{

console.log(`server is running on port ${process.env.PORT||8000}` )});


