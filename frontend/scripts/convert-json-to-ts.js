const fs = require('fs');
const path = require('path');

// Read the JSON files
const trafficSignsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../frontend/public/data/traffic_signs.json'), 'utf8'));
const faqData = JSON.parse(fs.readFileSync(path.join(__dirname, '../frontend/public/data/faq.json'), 'utf8'));

// Create TypeScript data file
const tsContent = `// Auto-generated data file
export const trafficSignsData = ${JSON.stringify(trafficSignsData, null, 2)};

export const faqData = ${JSON.stringify(faqData, null, 2)};
`;

// Write to data.ts
fs.writeFileSync(path.join(__dirname, '../frontend/lib/data.ts'), tsContent);

console.log('Data files converted to TypeScript successfully!');
console.log(`Traffic signs: ${trafficSignsData.signs.length} items`);
console.log(`FAQ items: ${faqData.length} items`);
