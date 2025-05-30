import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret,
};
cloudinary.config(credentials);

export const imageStore = {
  getAllImages: async function () {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  uploadImage: async function (imagefile) {
    writeFileSync("./public/temp.img", imagefile);
    const response = await cloudinary.v2.uploader.upload("./public/temp.img");
    return response.url;
  },

  deleteImage: async function (img) {
    // Extract image id, AI helped with the split syntax
    const publicId = img.split("/").pop().split(".")[0];
    console.log("public ID:" , publicId);

    const response = await cloudinary.v2.uploader.destroy(publicId, {});
    console.log("Deleting image:" , img);

    console.log("Cloudinary:" , response);
  },
};
