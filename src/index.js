// As this is our main file hence we import dotenv here such that it gets available to all the files
import dotenv from "dotenv";
import connectDB from "./db/index.js";
//The dotenv config file takes an object inside it the path contains the location of .env file for our file it is in the home directory
dotenv.config({
    path:'./env'
});
connectDB()


