import express from 'express';
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyBjSTPo1V55NXSzSzcQr2lnD-H_D4s0v6I');

router.post('/analyze-user', async (req, res) => {
  try {
    const { birthYear, name, gender, symptoms, sleepHabits, preferences } = req.body;
    if (!birthYear || !name) {
      return res.status(400).json({ success: false, error: 'Họ tên và năm sinh là bắt buộc' });
    }

    // Prepare the prompt for Gemini AI
    let prompt = `Bạn là một chuyên gia tư vấn sức khỏe. Hãy phân tích thông tin sau và đưa ra lời khuyên chi tiết:

Thông tin cá nhân:
- Họ tên: ${name}
- Năm sinh: ${birthYear}
- Giới tính: ${gender || 'Không xác định'}

`;

    if (symptoms) {
      prompt += `Triệu chứng: ${symptoms}\n`;
    }
    if (sleepHabits) {
      prompt += `Thói quen & thể chất: ${sleepHabits}\n`;
    }
    if (preferences) {
      prompt += `Câu hỏi/Thắc mắc: ${preferences}\n`;
    }

    prompt += `

Hãy đưa ra phân tích chi tiết bao gồm:
1. Đánh giá tình trạng sức khỏe hiện tại
2. Nguyên nhân có thể gây ra các vấn đề
3. Lời khuyên cụ thể để cải thiện sức khỏe
4. Các biện pháp phòng ngừa
5. Khi nào nên gặp bác sĩ

Trả lời bằng tiếng Việt, sử dụng ngôn ngữ dễ hiểu và thân thiện.`;

    // Generate response using Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const detailedAnalysis = response.text().replace(/\*/g, ' ');

    const analysis = {
      name,
      birthYear,
      detailedAnalysis
    };

    return res.json({ success: true, data: analysis });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Lỗi khi phân tích dữ liệu với AI' 
    });
  }
});

export default router;