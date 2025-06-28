import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

async function testGeminiAPI() {
  try {
    console.log('Testing Gemini API integration...');
    
    // Use the hardcoded key for testing
    const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyBjSTPo1V55NXSzSzcQr2lnD-H_D4s0v6I';
    
    if (!apiKey || apiKey === 'your-api-key-here') {
      console.error('❌ GEMINI_API_KEY is not defined in environment variables');
      console.log('Please create a .env file with your Gemini API key');
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try different model names
    const modelNames = ['gemini-pro', 'gemini-1.0-pro', 'gemini-1.5-pro', 'gemini-1.5-flash'];
    
    for (const modelName of modelNames) {
      try {
        console.log(`\nTrying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });

        const testPrompt = `Bạn là một chuyên gia tư vấn sức khỏe. Hãy đưa ra lời khuyên ngắn gọn cho người bị mất ngủ. Trả lời bằng tiếng Việt.`;

        console.log('Sending test request to Gemini API...');
        const result = await model.generateContent(testPrompt);
        const response = await result.response;
        const text = response.text();

        console.log(`✅ Gemini API test successful with model: ${modelName}!`);
        console.log('Response:', text);
        return; // Exit on success
        
      } catch (modelError) {
        console.log(`❌ Model ${modelName} failed:`, modelError.message);
      }
    }
    
    console.log('\n❌ All model attempts failed');
    
  } catch (error) {
    console.error('❌ Gemini API test failed:', error.message);
    if (error.message.includes('API_KEY')) {
      console.log('Please check your GEMINI_API_KEY in the .env file');
    }
  }
}

testGeminiAPI(); 