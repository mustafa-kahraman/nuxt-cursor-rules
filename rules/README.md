# Nuxt CursorAI Kuralları

Bu dizin, Nuxt.js projelerinde kod tutarlılığını ve en iyi uygulamaları sağlamak için tasarlanmış CursorAI kural dosyalarını içerir.

## Kural Kategorileri

- **[API](./api/):** API endpoint'leri, hata yönetimi ve API dokümantasyonu ile ilgili kurallar.
  - [API Endpoints](./api/api-endpoints.mdc)
  - ... (varsa diğer API kuralları)
- **[Database](./database/):** Veritabanı şemaları, modelleri (örn. Mongoose) ve önbellekleme ile ilgili kurallar.
  - [Mongoose Models](./database/mongoose-models.mdc)
  - ... (varsa diğer veritabanı kuralları)
- **[Types](./types/):** Uygulama genelinde kullanılan TypeScript tipleri, arayüzleri ve enumları.
  - [Types, Schemas & Models](./types/types-schema-models.mdc)
- **[Validation](./validation/):** Merkezi veri doğrulama şemaları (örn. Zod).
  - [Zod Schemas](./validation/zod-schemas.mdc)
- **[UI](./ui/):** Kullanıcı arayüzü bileşenleri, form başlatma, hata yönetimi ve eleman kullanımı ile ilgili kurallar.
  - [Form Başlatma](./ui/form-start.mdc)
  - ... (planlanan diğer UI kuralları için ./ui/README.md dosyasına bakın)
- **[Security](./security/):** Rol tabanlı erişim kontrolü (RBAC) ve genel güvenlik uygulamaları.
  - ... (varsa güvenlik kuralları)
- **[Testing](./testing/):** Test stratejileri ve izleme.
  - ... (varsa test kuralları)

Her kural, belirli bir konuya odaklanır ve projenin ilgili bölümünde tutarlılık sağlamayı hedefler. Kural dosyaları genellikle birbirine referans vererek (`@kural-dosyasi.mdc`) modüler bir yapı oluşturur.

Kural şablonu için [rule-template.mdc](../rule-template.mdc) dosyasına bakın. 