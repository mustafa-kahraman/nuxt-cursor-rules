# Types Kuralları

Bu dizin, uygulama genelinde kullanılan TypeScript tipleri, arayüzleri ve enumları ile ilgili kuralları içerir.

## Kurallar

- **[types-schema-models.mdc](./types-schema-models.mdc):** Uygulama genelindeki temel veri yapıları için TypeScript arayüzlerini, tiplerini, enumlarını ve potansiyel olarak Zod gibi doğrulama şemalarını tanımlar. Kod tutarlılığını artırır ve tipler için merkezi bir kaynak sağlar.
  ```typescript
  // Örnek Arayüz
  export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
  }

  // Örnek Enum
  export enum UserRole {
    Admin = 'ADMIN',
    Editor = 'EDITOR',
  }
  ``` 