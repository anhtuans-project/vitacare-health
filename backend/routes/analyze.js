import express from 'express';

const router = express.Router();

router.post('/analyze-user', async (req, res) => {
  try {
    const { birthYear, name, gender, symptoms, sleepHabits, preferences } = req.body;
    if (!birthYear || !name) {
      return res.status(400).json({ success: false, error: 'Họ tên và năm sinh là bắt buộc' });
    }

    // Tạo phân tích chi tiết (chỉ tư vấn sức khỏe, không có phong thủy)
    let detailedAnalysis = '';
    if (symptoms) {
      detailedAnalysis += `🔎 Triệu chứng: ${symptoms}\n- Mất ngủ là tình trạng khó đi vào giấc ngủ, ngủ không sâu hoặc thức dậy nhiều lần trong đêm.\n`;
      detailedAnalysis += '- Các nguyên nhân phổ biến gồm căng thẳng, lo âu, sử dụng thiết bị điện tử trước khi ngủ, uống cà phê hoặc rượu bia buổi tối, rối loạn đồng hồ sinh học, hoặc các bệnh lý nền như trầm cảm, đau mãn tính.\n';
      detailedAnalysis += '- Hậu quả của mất ngủ kéo dài có thể gây mệt mỏi, giảm tập trung, suy giảm trí nhớ, dễ cáu gắt, tăng nguy cơ mắc bệnh tim mạch, tiểu đường và béo phì.\n';
      detailedAnalysis += '- Nếu tình trạng mất ngủ kéo dài trên 2 tuần, bạn nên gặp bác sĩ chuyên khoa để được tư vấn và điều trị phù hợp.\n';
    }
    if (sleepHabits) {
      detailedAnalysis += `\n💡 Thói quen & thể chất: ${sleepHabits}\n- Ngủ muộn ảnh hưởng đến sinh học, giảm chất lượng giấc ngủ và ảnh hưởng đến sức khỏe tổng thể.\n`;
      detailedAnalysis += 'Bạn nên tập thói quen đi ngủ trước 23h, tránh sử dụng điện thoại/máy tính ít nhất 30 phút trước khi ngủ, tạo môi trường ngủ yên tĩnh, thoáng mát.\n';
    }
    if (preferences) {
      detailedAnalysis += `\n❓ Hỏi đáp: ${preferences}\n- Để cải thiện mất ngủ, bạn nên:\n`;
      detailedAnalysis += '  • Thiết lập giờ đi ngủ và thức dậy cố định mỗi ngày, kể cả cuối tuần.\n';
      detailedAnalysis += '  • Hạn chế uống cà phê, rượu bia sau 16h.\n';
      detailedAnalysis += '  • Tập thể dục nhẹ nhàng vào ban ngày, tránh vận động mạnh gần giờ ngủ.\n';
      detailedAnalysis += '  • Thư giãn trước khi ngủ: nghe nhạc nhẹ, thiền, đọc sách giấy hoặc ngồi thiền.\n';
      detailedAnalysis += '  • Nếu vẫn khó ngủ kéo dài, nên gặp chuyên gia y tế.\n';
    }

    const analysis = {
      name,
      birthYear,
      detailedAnalysis
    };

    return res.json({ success: true, data: analysis });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || 'Lỗi khi phân tích dữ liệu' });
  }
});

export default router;