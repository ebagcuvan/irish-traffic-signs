# Google Search Console ve Indexing API Kurulum Rehberi

Bu rehber, sitemap'inizi Google'a otomatik olarak göndermek için gerekli kurulumları açıklar.

## 1. Google Search Console Kurulumu

### Adım 1: Google Search Console'a Giriş
1. [Google Search Console](https://search.google.com/search-console/) adresine gidin
2. Google hesabınızla giriş yapın
3. "Add Property" butonuna tıklayın

### Adım 2: Site Ekleme
1. "URL prefix" seçeneğini seçin
2. Site URL'nizi girin: `https://irish-traffic-signs.vercel.app`
3. "Continue" butonuna tıklayın
4. Doğrulama yöntemini seçin (HTML dosyası veya meta tag önerilir)

### Adım 3: Site Doğrulama
- HTML dosyası yöntemi seçildiyse: Verilen dosyayı `public/` klasörüne koyun
- Meta tag yöntemi seçildiyse: Verilen meta tag'i `app/layout.tsx` dosyasına ekleyin

## 2. Google Cloud Console Kurulumu

### Adım 1: Proje Oluşturma
1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. Yeni proje oluşturun veya mevcut projeyi seçin

### Adım 2: Indexing API'yi Etkinleştirme
1. Sol menüden "APIs & Services" > "Library" seçin
2. "Indexing API" arayın ve seçin
3. "Enable" butonuna tıklayın

### Adım 3: Service Account Oluşturma
1. "APIs & Services" > "Credentials" seçin
2. "Create Credentials" > "Service Account" seçin
3. Service account adı girin (örn: "sitemap-indexer")
4. "Create and Continue" butonuna tıklayın
5. Role olarak "Editor" seçin
6. "Done" butonuna tıklayın

### Adım 4: Service Account Key Oluşturma
1. Oluşturulan service account'a tıklayın
2. "Keys" sekmesine gidin
3. "Add Key" > "Create new key" seçin
4. "JSON" formatını seçin
5. "Create" butonuna tıklayın
6. İndirilen JSON dosyasını güvenli bir yerde saklayın

## 3. Environment Variables Kurulumu

### Vercel'de Environment Variables Ekleme
1. Vercel dashboard'a gidin
2. Projenizi seçin
3. "Settings" > "Environment Variables" seçin
4. Aşağıdaki değişkenleri ekleyin:

```
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...} // JSON dosyasının içeriği
WEBHOOK_SECRET=your-secret-key-here
CRON_SECRET=your-cron-secret-here
```

### Local Development için .env.local
```bash
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
WEBHOOK_SECRET=your-secret-key-here
CRON_SECRET=your-cron-secret-here
```

## 4. Sitemap Test Etme

### Manuel Test
```bash
# Sitemap'i kontrol et
curl https://irish-traffic-signs.vercel.app/sitemap.xml

# Google'a ping gönder
curl -X GET https://irish-traffic-signs.vercel.app/api/sitemap-ping

# Cron job'u test et
curl -X GET https://irish-traffic-signs.vercel.app/api/cron/sitemap \
  -H "x-cron-secret: your-cron-secret-here"
```

### Webhook Test
```bash
curl -X POST https://irish-traffic-signs.vercel.app/api/webhook/sitemap \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: your-secret-key-here" \
  -d '{"event":"sitemap.updated","data":{}}'
```

## 5. Otomatik Güncelleme

### Cron Job
- Her 6 saatte bir sitemap otomatik olarak Google'a ping edilir
- Vercel'de cron job otomatik olarak çalışır

### Manuel Güncelleme
- Yeni içerik eklendiğinde webhook kullanabilirsiniz
- API endpoint'leri ile manuel güncelleme yapabilirsiniz

## 6. Monitoring

### Google Search Console'da Kontrol
1. "Sitemaps" bölümüne gidin
2. Sitemap'inizin durumunu kontrol edin
3. "Coverage" bölümünde indexlenen sayfaları görün

### Logs
- Vercel dashboard'da function logs'ları kontrol edin
- Console'da hata mesajlarını takip edin

## 7. Troubleshooting

### Yaygın Hatalar
1. **401 Unauthorized**: Service account key'i kontrol edin
2. **403 Forbidden**: Indexing API'nin etkin olduğundan emin olun
3. **404 Not Found**: Sitemap URL'ini kontrol edin

### Debug
```bash
# Sitemap'i kontrol et
curl -I https://irish-traffic-signs.vercel.app/sitemap.xml

# API response'ları kontrol et
curl -v https://irish-traffic-signs.vercel.app/api/sitemap-ping
```

## 8. Güvenlik

- Service account key'ini asla public repository'de paylaşmayın
- Webhook secret'larını güçlü tutun
- Environment variables'ları düzenli olarak rotate edin
