import model_human from './model_human.png';
import model_buzz from './model_buzz.png';
import model_skeleton from './model_skeleton.png';
import model_cherry from './model_cherry.png';

export const MODEL_IMAGES = {
  'Model người': model_human,
  'Model Buzz Lightyear': model_buzz,
  'Model skeleton': model_skeleton,
  'Model cây cherry': model_cherry,
  // Fallback image nếu không tìm thấy ảnh tương ứng
  default: model_human
};

// Hàm helper để lấy ảnh dựa trên tên model
export const getModelImage = (modelName) => {
  return MODEL_IMAGES[modelName] || MODEL_IMAGES.default;
};