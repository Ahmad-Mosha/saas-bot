import { generateImageResponse } from "./src/services/gemini-service";
import { imageStorageService } from "./src/services/imageStorageService";
import fs from "fs";
import path from "path";

// Define test prompt
const TEST_PROMPT =
  "A beautiful mountain landscape with a lake, photorealistic style";

// Test the image generation functionality
async function testImageGeneration() {
  console.log("Testing image generation with Gemini API...");
  console.log(`Prompt: "${TEST_PROMPT}"`);

  try {
    // Use the recommended model for image generation
    const modelName = "gemini-2.0-flash-exp-image-generation";
    console.log(`Using model: ${modelName}`);

    // Generate the image
    const result = await generateImageResponse(modelName, TEST_PROMPT);

    if (!result) {
      console.error("No result returned from generateImageResponse");
      return;
    }

    console.log(`Successfully generated image of type: ${result.mimeType}`);

    // Save the image to a file for inspection using our image storage service
    const imageUrl = imageStorageService.saveImage(
      result.data,
      result.mimeType
    );

    console.log("==============================================");
    console.log("IMAGE GENERATION SUCCESSFUL!");
    console.log("==============================================");
    console.log(`Image URL: ${imageUrl}`);
    console.log(`Full URL: http://localhost:3000${imageUrl}`);
    console.log("==============================================");
    console.log("Test your API in Postman or browser with the URL above");
    console.log("==============================================");
  } catch (error) {
    console.error("Error during image generation test:", error);
  }
}

// Run the test
testImageGeneration().catch(console.error);
