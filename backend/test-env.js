import 'dotenv/config';

console.log('Environment variables:');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Defined' : 'Not defined');
console.log('PORT:', process.env.PORT);
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Defined' : 'Not defined');
