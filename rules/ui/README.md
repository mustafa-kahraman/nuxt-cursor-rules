# UI (Kullanıcı Arayüzü) Kuralları

Bu dizin, kullanıcı arayüzü bileşenleri ve davranışları ile ilgili kuralları içerir.

## Kurallar

- **[form-start.mdc](./form-start.mdc):** Nuxt UI, VeeValidate ve Zod kullanarak bir formun temel yapısını kurma ve doğrulama entegrasyonunu başlatma kurallarını tanımlar. Form oluşturmaya başlamak için ilk adımdır.
  ```vue
  <template>
    <UForm :schema="formSchema" :state="state" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>
      <UButton type="submit">Gönder</UButton>
    </UForm>
  </template>
  <script setup>
    // ... state, schema, onSubmit ...
  </script>
  ```
- **[form-error-handling.mdc](./form-error-handling.mdc):** Form gönderimi sonrası API hatalarını detaylı yönetme stratejileri (`<UAlert>`, `setErrors`, `useToast`).
- **[form-submission-patterns.mdc](./form-submission-patterns.mdc) (Planlanan):** Başarılı gönderim sonrası işlemler, farklı API yanıtlarına göre davranışlar gibi ileri seviye gönderim desenleri.
- **`./elements/`:** Form elemanlarının spesifik kullanımı için kurallar.
  - **[input.mdc](./elements/input.mdc):** `<UInput>` kullanımı (tipler, ikonlar, placeholder vb.).
  - **[textarea.mdc](./elements/textarea.mdc):** `<UTextarea>` kullanımı (rows, autoresize vb.).
  - **[selectmenu.mdc](./elements/selectmenu.mdc):** `<USelectMenu>` kullanımı (options, searchable, multiple vb.).
  - ... (diğer elemanlar)

## [form-validation.mdc](./form-validation.mdc):** Nuxt/Vue UI katmanında form doğrulamalarını standartlaştırır. Genellikle `vee-validate` kütüphanesi ve `@zod-schemas.mdc` içinde tanımlanan Zod şemaları ile birlikte kullanılır.
  ```vue
  <template>
    <Form :validation-schema="formSchema" @submit="onSubmit">
      <Field name="email" type="email" />
      <ErrorMessage name="email" />
      <button>Gönder</button>
    </Form>
  </template>
  <script setup>
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import { toTypedSchema } from '@vee-validate/zod';
    import { UserCreateAPISchema } from '@/server/validation/user.schema';

    const formSchema = toTypedSchema(UserCreateAPISchema);
    // ... onSubmit logic ...
  </script>
  ``` 