import axios from 'axios';

const BASE_URL = process.env.API_URL || 'http://localhost:5000';

async function testAuthEndpoints() {
    console.log('Testing Authentication Endpoints...\n');
    
    try {
        // Test health endpoint
        console.log('1. Testing health endpoint...');
        const healthResponse = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Health check passed:', healthResponse.data);
        
        // Test register endpoint
        console.log('\n2. Testing register endpoint...');
        const testUser = {
            name: 'Test User',
            email: `test${Date.now()}@example.com`,
            password: 'testpassword123'
        };
        
        const registerResponse = await axios.post(`${BASE_URL}/api/user/register`, testUser);
        console.log('✅ Register successful:', {
            success: registerResponse.data.success,
            userName: registerResponse.data.userName,
            hasToken: !!registerResponse.data.token
        });
        
        // Test login endpoint
        console.log('\n3. Testing login endpoint...');
        const loginResponse = await axios.post(`${BASE_URL}/api/user/login`, {
            email: testUser.email,
            password: testUser.password
        });
        console.log('✅ Login successful:', {
            success: loginResponse.data.success,
            userName: loginResponse.data.userName,
            hasToken: !!loginResponse.data.token
        });
        
        console.log('\n🎉 All authentication tests passed!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        console.error('Status:', error.response?.status);
        console.error('Headers:', error.response?.headers);
    }
}

testAuthEndpoints(); 