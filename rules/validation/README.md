# Validation (Doğrulama) Kuralları

Bu dizin, veri doğrulama ile ilgili kuralları içerir.

## Kurallar

- **[zod-schemas.mdc](./zod-schemas.mdc):** Uygulama genelinde veri doğrulaması için kullanılacak Zod şemalarını merkezi olarak tanımlar. `@types-schema-models.mdc` içindeki tiplerle entegre çalışır ve hem API hem de UI katmanında tutarlı doğrulama sağlar.
  ```typescript
  import { z } from 'zod';
  import { BaseSchema } from './base.schema'; // Varsayımsal
  import { UserRole } from '@/types/shared.types';

  export const UserSchema = BaseSchema.extend({
    name: z.string().min(1, "İsim gereklidir"),
    email: z.string().email("Geçersiz e-posta"),
    role: z.nativeEnum(UserRole),
  });

  export const UserCreateAPISchema = UserSchema.omit({ _id: true, createdAt: true, updatedAt: true });
  ``` 