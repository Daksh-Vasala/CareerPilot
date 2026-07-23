import { UploadApiResponse } from "cloudinary";
import cloudinary from "./cloudinary";

export async function uploadResume(
  buffer: Buffer,
  fileName: string,
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "career-pilot/resumes",
        resource_type: "raw",
        use_filename: true,
        filename_override: fileName,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result!);
      },
    );

    stream.end(buffer);
  });
}

export async function deleteResume(publicId: string) {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: "raw",
  });
}
