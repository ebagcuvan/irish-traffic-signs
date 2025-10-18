const axios = require('axios');

const API_URL = 'http://localhost:3003';

async function testBackend() {
  console.log('🔍 Testing backend connection...');
  
  try {
    // Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test signs endpoint
    console.log('2. Testing signs endpoint...');
    const signsResponse = await axios.get(`${API_URL}/api/signs?limit=5`);
    console.log('✅ Signs API working');
    console.log('📊 Response:', {
      success: signsResponse.data.success,
      dataLength: signsResponse.data.data?.length || 0,
      pagination: signsResponse.data.pagination
    });
    
    if (signsResponse.data.data?.length > 0) {
      console.log('📋 First sign:', signsResponse.data.data[0]);
    }
    
    console.log('🎉 Backend is working correctly!');
    
  } catch (error) {
    console.error('❌ Backend test failed:');
    
    if (error.code === 'ECONNREFUSED') {
      console.error('   Backend is not running on port 3001');
      console.error('   Start it with: npm run dev:backend');
    } else if (error.response) {
      console.error('   HTTP Error:', error.response.status, error.response.statusText);
      console.error('   Response:', error.response.data);
    } else {
      console.error('   Error:', error.message);
    }
  }
}

testBackend();
