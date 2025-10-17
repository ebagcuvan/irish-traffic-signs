const fs = require('fs');
const path = require('path');
const axios = require('axios');

const API_URL = 'http://localhost:3003';

// Map category from JSON to database enum
function mapCategory(category) {
  const categoryMap = {
    'Warning Signs': 'WARNING',
    'Regulatory Signs': 'REGULATORY',
    'Mandatory Signs': 'MANDATORY',
    'Informational Signs': 'INFORMATIONAL',
    'Directional Signs': 'DIRECTIONAL',
    'Temporary Signs': 'WARNING',
    'Road Markings': 'INFORMATIONAL',
  };
  
  return categoryMap[category] || 'INFORMATIONAL';
}

// Determine difficulty level based on sign properties
function determineDifficultyLevel(sign) {
  if (sign.category === 'Warning Signs' && sign.tags?.includes('complex')) {
    return 'ADVANCED';
  }
  
  if (sign.category === 'Regulatory Signs' || sign.category === 'Mandatory Signs') {
    return 'INTERMEDIATE';
  }
  
  if (sign.category === 'Informational Signs' || sign.category === 'Directional Signs') {
    return 'BEGINNER';
  }
  
  return 'INTERMEDIATE';
}

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

// JSON dosyasından signs yükle
async function loadSignsFromJSON() {
  try {
    console.log('🔐 Logging in as admin...');
    const token = await loginAsAdmin();
    console.log('✅ Login successful');

    // JSON dosyasını oku
    const jsonPath = path.join(__dirname, '..', 'data', 'traffic_signs.json');
    const signsData = fs.readFileSync(jsonPath, 'utf8');
    const jsonData = JSON.parse(signsData);
    const signs = jsonData.signs;

    console.log(`📝 Loading ${signs.length} signs from JSON file...`);
    
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < signs.length; i++) {
      const sign = signs[i];
      
      // Map JSON fields to database schema
      const mappedSign = {
        irishName: sign.name,
        englishName: sign.name,
        description: sign.description || '',
        category: mapCategory(sign.category),
        difficultyLevel: determineDifficultyLevel(sign),
        imageUrl: sign.imagePath || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
        context: sign.meaning || sign.description || '',
      };
      
      console.log(`Loading sign ${i + 1}/${signs.length}: ${mappedSign.englishName}`);
      
      try {
        await addSign(token, mappedSign);
        console.log(`✅ Added: ${mappedSign.englishName}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Failed: ${mappedSign.englishName} - ${error.message}`);
        errorCount++;
      }
      
      // Rate limiting için kısa bekleme
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`🎉 Loading completed!`);
    console.log(`✅ Successfully added: ${successCount} signs`);
    console.log(`❌ Failed to add: ${errorCount} signs`);
  } catch (error) {
    console.error('❌ Error loading signs:', error.message);
  }
}

// Script'i çalıştır
loadSignsFromJSON();
