import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { HTTPException } from "hono/http-exception";

// Default to local storage if no cloud provider is configured
const STORAGE_TYPE = process.env.STORAGE_TYPE || "local";
const LOCAL_STORAGE_PATH = process.env.LOCAL_STORAGE_PATH || "./public/uploads";

export interface StorageResult {
  fileName: string;
  filePath: string;
  fileUrl: string;
  mimeType: string;
}

export class StorageService {
  /**
   * Save base64 image data to storage
   * @param base64Data Base64 encoded image data from Gemini API
   * @param mimeType The MIME type of the image
   * @param userId The ID of the user who generated the image
   * @returns Information about the saved file
   */
  async saveBase64Image(
    base64Data: string,
    mimeType: string,
    userId: string | number
  ): Promise<StorageResult> {
    try {
      // Generate a unique file name
      const fileExtension = this.getFileExtensionFromMimeType(mimeType);
      const fileName = `${uuidv4()}.${fileExtension}`;

      // Convert base64 to buffer
      const buffer = Buffer.from(base64Data, "base64");

      // Use the appropriate storage method based on configuration
      switch (STORAGE_TYPE) {
        case "local":
          return await this.saveToLocalStorage(
            buffer,
            fileName,
            mimeType,
            userId
          );
        // Add cases for other cloud providers as needed
        // case "s3":
        //   return await this.saveToS3(buffer, fileName, mimeType, userId);
        default:
          return await this.saveToLocalStorage(
            buffer,
            fileName,
            mimeType,
            userId
          );
      }
    } catch (error) {
      console.error("Error saving image:", error);
      throw new HTTPException(500, {
        message: "Error saving image to storage",
      });
    }
  }

  /**
   * Save file to local storage
   */
  private async saveToLocalStorage(
    buffer: Buffer,
    fileName: string,
    mimeType: string,
    userId: string | number
  ): Promise<StorageResult> {
    // Create user-specific directory to organize uploads
    const userDir = path.join(LOCAL_STORAGE_PATH, String(userId));
    const filePath = path.join(userDir, fileName);

    // Make sure the directory exists
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(filePath, buffer);

    // Build the URL for the file
    const baseUrl = process.env.API_URL || "http://localhost:3000";
    const fileUrl = `${baseUrl}/uploads/${String(userId)}/${fileName}`;

    return {
      fileName,
      filePath,
      fileUrl,
      mimeType,
    };
  }

  /**
   * Get file extension from MIME type
   */
  private getFileExtensionFromMimeType(mimeType: string): string {
    switch (mimeType) {
      case "image/jpeg":
        return "jpg";
      case "image/png":
        return "png";
      case "image/gif":
        return "gif";
      case "image/webp":
        return "webp";
      default:
        return "jpg"; // Default to jpg
    }
  }

  // Add methods for other cloud storage providers as needed
  // private async saveToS3(...) { ... }
}

export const storageService = new StorageService();
