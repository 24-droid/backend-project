import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadOnCloudinary=async (localFilePath)=>{
    try {
        if(!localFilePath) return null
        const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto" // This defines the type of extension of file whether it is .pdf , .jpg or video.
        })
        console.log("file is uploaded on cloudinary", response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // This removes the locally saved temporary file as the upload operation failed.
        return null;
    }
}
export default uploadOnCloudinary