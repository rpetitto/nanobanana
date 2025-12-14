window.function = async function (prompt, geminiApiKey, imgbbApiKey) {
  try {
    // Validate inputs
    if (!prompt?.value) {
      throw new Error("Prompt is required");
    }
    if (!geminiApiKey?.value) {
      throw new Error("Gemini API Key is required");
    }
    if (!imgbbApiKey?.value) {
      throw new Error("imgbb API Key is required");
    }

    const promptText = prompt.value;
    const geminiKey = geminiApiKey.value;
    const imgbbKey = imgbbApiKey.value;

    // Step 1: Generate image with Google Gemini
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": ${geminiKey}
        },
        body: JSON.stringify({
    "contents": [{
      "parts": [
        {"text": promptText}
      ]
    }]
  }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      throw new Error(`Gemini API error: ${errorText}`);
    }

    const geminiData = await geminiResponse.json();
    
    // Extract base64 image from response
    if (!geminiData.generatedImages || geminiData.generatedImages.length === 0) {
      throw new Error("No image generated");
    }

    const base64Image = geminiData.generatedImages[0].image.imageBytes;

    // Step 2: Upload base64 image to imgbb
    const formData = new FormData();
    formData.append("image", base64Image);

    const imgbbResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!imgbbResponse.ok) {
      const errorText = await imgbbResponse.text();
      throw new Error(`imgbb API error: ${errorText}`);
    }

    const imgbbData = await imgbbResponse.json();

    if (!imgbbData.success) {
      throw new Error("Failed to upload image to imgbb");
    }

    // Return the public URL
    return imgbbData.data.url;

  } catch (error) {
    throw new Error(`Image generation failed: ${error.message}`);
  }
}
