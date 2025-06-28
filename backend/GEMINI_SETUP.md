# Gemini AI Setup Guide

## Prerequisites
1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Make sure you have the required dependencies installed

## Setup Instructions

### 1. Install Dependencies
```bash
npm install @google/generative-ai
```

### 2. Configure Environment Variables
Create a `.env` file in the backend directory with the following content:

```env
# Gemini AI API Key
GEMINI_API_KEY=your-actual-gemini-api-key-here

# Other environment variables (if needed)
PORT=5000
```

### 3. Get Your Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Replace `your-actual-gemini-api-key-here` in your `.env` file with the actual key

### 4. Test the Integration
1. Start your backend server: `npm run server`
2. Go to the TuViPage in your frontend
3. Fill in the form with health symptoms
4. Submit the form to test the Gemini AI integration

## Features
- AI-powered health analysis based on user symptoms
- Personalized recommendations
- Vietnamese language support
- Detailed health insights and advice

## Error Handling
If you encounter errors:
1. Check that your API key is correct
2. Ensure the `.env` file is in the backend directory
3. Verify that the Gemini API service is available
4. Check the console logs for detailed error messages 