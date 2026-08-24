import axios from "axios";

const cloudName = "djx2edbwi";
const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

class CloudinaryService {
    async upload(image) {
        if (!image) return "";
        try {
            let formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "vAssistant");

            const res = await axios.post(uploadUrl, formData);
            return res.data.secure_url;
        } catch (error) {
            console.error("Cloudinary upload failed:", error);
            throw new Error("Failed to upload image. Please check your connection or provide an image URL directly.");
        }
    }
}

export default new CloudinaryService();