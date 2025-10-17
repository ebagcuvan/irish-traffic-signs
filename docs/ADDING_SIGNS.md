# Traffic Signs Ekleme Rehberi

Bu rehber, sisteme yeni traffic signs eklemenin farklı yöntemlerini açıklar.

## 🎯 Yöntem 1: Hazır JSON Dosyası ile (En Kolay)

### 1. Mevcut JSON Dosyasını Kullan
`data/traffic_signs.json` dosyanız zaten hazır! Bu dosyada 4000+ traffic sign bulunuyor.

### 2. Yeni Sign Eklemek İçin
`data/traffic_signs.json` dosyasını açın ve `signs` array'ine yeni sign'ı ekleyin:

```json
{
  "id": "new_sign_001",
  "name": "New Sign Name",
  "category": "Warning Signs",
  "categories": ["Warning Signs"],
  "imagePath": "assets/images/signs/newsign.png",
  "description": "Detaylı açıklama buraya yazılır.",
  "meaning": "İşaretin anlamı ve ne yapılması gerektiği.",
  "tags": ["new", "sign", "warning"],
  "shape": "Triangular",
  "color": "Red and white"
}
```

### 3. Kategoriler (JSON'da kullanılan)
- `Warning Signs` - Uyarı işaretleri
- `Regulatory Signs` - Düzenleyici işaretler  
- `Mandatory Signs` - Zorunlu işaretler
- `Informational Signs` - Bilgilendirici işaretler
- `Directional Signs` - Yön işaretleri
- `Temporary Signs` - Geçici işaretler
- `Road Markings` - Yol işaretleri

### 4. Zorluk Seviyeleri (Otomatik Belirlenir)
- `BEGINNER` - Informational ve Directional signs
- `INTERMEDIATE` - Regulatory ve Mandatory signs  
- `ADVANCED` - Complex warning signs

### 5. JSON'u Yükle
```bash
npm run load:signs
```

## 🎯 Yöntem 2: Admin Panel (Web Arayüzü)

1. `http://localhost:3000/admin` adresine gidin
2. Admin kullanıcısı ile giriş yapın:
   - Email: `admin@irishtrafficsigns.ie`
   - Password: `admin123`
3. Form doldurarak sign ekleyin

## 🎯 Yöntem 3: API ile Programatik

### Script ile
```bash
npm run add:signs
```

### Manuel API Çağrısı
```bash
# 1. Admin olarak giriş yap
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@irishtrafficsigns.ie","password":"admin123"}'

# 2. Token'ı kullanarak sign ekle
curl -X POST http://localhost:3001/api/signs \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "irishName": "Yeni İşaret",
    "englishName": "New Sign",
    "description": "Açıklama",
    "category": "WARNING",
    "difficultyLevel": "BEGINNER",
    "imageUrl": "https://example.com/image.jpg",
    "context": "Kullanım yeri"
  }'
```

## 📝 Örnek Sign Ekleme

### JSON Dosyasına Ekleme
`data/traffic-signs.json` dosyasının sonuna şunu ekleyin:

```json
{
  "irishName": "Níl Túirse",
  "englishName": "No Overtaking",
  "description": "Overtaking is prohibited on this section of road.",
  "category": "REGULATORY",
  "difficultyLevel": "INTERMEDIATE",
  "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300",
  "context": "Used on roads where overtaking would be dangerous."
}
```

Sonra çalıştırın:
```bash
npm run load:signs
```

## 🔧 Gereksinimler

- Backend çalışıyor olmalı (`npm run dev:backend`)
- Admin kullanıcısı oluşturulmuş olmalı
- Veritabanı bağlantısı kurulmuş olmalı

## 📋 İpuçları

1. **Görsel URL'leri**: Unsplash, Pexels gibi ücretsiz görsel servislerini kullanın
2. **İrlanda Adları**: Gerçek İrlanda dilindeki isimleri kullanın
3. **Açıklamalar**: Net ve anlaşılır açıklamalar yazın
4. **Kategoriler**: Doğru kategoriyi seçin
5. **Zorluk**: Öğrenme zorluğuna göre seviye belirleyin

## 🚀 Hızlı Başlangıç

1. `data/traffic-signs.json` dosyasını açın
2. Yeni sign'ı ekleyin
3. `npm run load:signs` komutunu çalıştırın
4. `http://localhost:3000/signs` adresinde kontrol edin

Bu kadar! Artık yeni traffic signs ekleyebilirsiniz. 🎉
