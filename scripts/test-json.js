const fs = require('fs');
const path = require('path');

// Test JSON dosyasını oku
function testJSON() {
  try {
    console.log('🔍 Testing JSON file...');
    
    const jsonPath = path.join(__dirname, '..', 'data', 'traffic_signs.json');
    const signsData = fs.readFileSync(jsonPath, 'utf8');
    const jsonData = JSON.parse(signsData);
    
    console.log(`✅ JSON file loaded successfully!`);
    console.log(`📊 Total signs: ${jsonData.signs.length}`);
    
    // İlk 5 sign'ı göster
    console.log('\n📋 First 5 signs:');
    jsonData.signs.slice(0, 5).forEach((sign, index) => {
      console.log(`${index + 1}. ${sign.name} (${sign.category})`);
    });
    
    // Kategorileri say
    const categories = {};
    jsonData.signs.forEach(sign => {
      categories[sign.category] = (categories[sign.category] || 0) + 1;
    });
    
    console.log('\n📊 Categories:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} signs`);
    });
    
    console.log('\n🎉 JSON file is ready to use!');
    
  } catch (error) {
    console.error('❌ Error reading JSON file:', error.message);
  }
}

testJSON();
