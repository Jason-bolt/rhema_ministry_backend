import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import envs from "../../../../config/envs";

cloudinary.config({
  cloud_name: envs.CLOUDINARY_CLOUD_NAME,
  api_key: envs.CLOUDINARY_API_KEY,
  api_secret: envs.CLOUDINARY_API_SECRET,
});

class UploadController {
  upload = async (req: Request, res: Response) => {
    try {
      const file = (req as any).file;
      if (!file) {
        return res.status(400).json({ success: false, message: "No file provided" });
      }

      const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "rhema_ministries" },
          (error, result) => {
            if (error || !result) reject(error ?? new Error("Upload failed"));
            else resolve(result);
          },
        );
        stream.end(file.buffer);
      });

      return res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        data: { url: result.secure_url },
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: `Failed to upload file: ${error.message}`,
      });
    }
  };
}

const uploadController = new UploadController();
export default uploadController;
