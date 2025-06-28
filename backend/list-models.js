import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

async function listModels() {
  try {
    console.log('Listing available Gemini models...');
    
    const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyBjSTPo1V55NXSzSzcQr2lnD-H_D4s0v6I';
    
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // List all available models
    const models = await genAI.listModels();
    
    console.log('Available models:');
    models.forEach(model => {
      console.log(`- ${model.name}`);
    });
    
  } catch (error) {
    console.error('❌ Error listing models:', error.message);
  }
}

listModels(); 