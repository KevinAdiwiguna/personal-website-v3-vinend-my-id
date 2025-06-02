import { v2 as cloudinary } from 'cloudinary'


const cloudname = process.env.CLOUDINARY_CLOUD_NAME!;
const apikey = process.env.CLOUDINARY_API_KEY!;
const apisecret = process.env.CLOUDINARY_API_KEY_SECRET!;

if (!cloudname || !apikey || !apisecret) {
	throw new Error("Cloudinary credentials are missing");
}

cloudinary.config({
  cloud_name: cloudname,
  api_key: apikey,
  api_secret: apisecret
})

export default cloudinary
