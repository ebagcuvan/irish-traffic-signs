const axios = require('axios');

const API_URL = 'http://localhost:3001';

// Admin kullanıcısı ile giriş yap
async function loginAsAdmin() {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email: 'admin@irishtrafficsigns.ie',
      password: 'admin123'
    });
    return response.data.data.token;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
}

// Sign ekle
async function addSign(token, signData) {
  try {
    const response = await axios.post(`${API_URL}/api/signs`, signData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add sign:', error.response?.data || error.message);
    throw error;
  }
}

// Toplu sign ekleme
async function addMultipleSigns() {
  try {
    console.log('🔐 Logging in as admin...');
    const token = await loginAsAdmin();
    console.log('✅ Login successful');

    const signs = [
      {
        irishName: 'Níl Túirse',
        englishName: 'No Overtaking',
        description: 'Overtaking is prohibited on this section of road.',
        category: 'REGULATORY',
        difficultyLevel: 'INTERMEDIATE',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
        context: 'Used on roads where overtaking would be dangerous.'
      },
      {
        irishName: 'Rabhadh: Céimeanna',
        englishName: 'Warning: Pedestrian Crossing',
        description: 'Warning of a pedestrian crossing ahead.',
        category: 'WARNING',
        difficultyLevel: 'BEGINNER',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
        context: 'Used to warn drivers of pedestrian crossings.'
      },
      {
        irishName: 'Téigh Ar Aghaidh',
        englishName: 'Go Straight',
        description: 'You must go straight ahead. No turning allowed.',
        category: 'MANDATORY',
        difficultyLevel: 'INTERMEDIATE',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
        context: 'Used at intersections where only straight ahead is allowed.'
      }
    ];

    console.log(`📝 Adding ${signs.length} signs...`);
    
    for (let i = 0; i < signs.length; i++) {
      const sign = signs[i];
      console.log(`Adding sign ${i + 1}/${signs.length}: ${sign.englishName}`);
      
      await addSign(token, sign);
      console.log(`✅ Added: ${sign.englishName}`);
      
      // Rate limiting için kısa bekleme
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('🎉 All signs added successfully!');
  } catch (error) {
    console.error('❌ Error adding signs:', error.message);
  }
}

// Script'i çalıştır
addMultipleSigns();
