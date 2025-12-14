# Gemini Image Generator

Generate images using Google Gemini AI and convert them to public URLs.

## Setup

1. Get a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Get a free imgbb API key from [imgbb API](https://api.imgbb.com/)
3. Configure the column in Glide with:
   - Your image prompt
   - Gemini API key
   - imgbb API key

## Parameters

- **Prompt**: The text description of the image you want to generate
- **Gemini API Key**: Your Google Gemini API key
- **imgbb API Key**: Your imgbb API key for hosting the generated image

## Result

Returns a public URL to the generated image hosted on imgbb.

## File Structure

```
gemini-image-generator/
├── README.md
├── glide.json
├── function.js
├── driver.js
└── index.html
```

## Usage in Glide

1. Upload this folder as an experimental code column
2. Add three column inputs:
   - Image Prompt (string)
   - Gemini API Key (string)
   - imgbb API Key (string)
3. The column will return a public URL to your generated image

## Notes

- Image generation may take 10-30 seconds
- Images are generated at 1:1 aspect ratio
- Images are permanently hosted on imgbb
- Both API keys should be kept secure