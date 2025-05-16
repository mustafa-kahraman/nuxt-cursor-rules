import { ref } from 'vue';
import type { Ref } from 'vue';
import type { ZodTypeAny, z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import { normalizeError } from '~/utils/error';
import type { IApiError } from '~/utils/error';

// Composable'ın kabul edeceği opsiyonlar için arayüz
interface UseFormHandlerOptions<T extends ZodTypeAny, R> {
  schema: T;
  // Form verilerini alıp bir sonuç (veya hata) döndüren asenkron fonksiyon
  onSubmit: (formData: z.output<T>) => Promise<R>; 
  // Başarı durumunda çağrılacak opsiyonel callback
  onSuccess?: (result: R) => void;
  // Hata durumunda çağrılacak opsiyonel callback (normalize edilmiş hatayı alır)
  onError?: (error: IApiError) => void; 
}

// Composable'ın döndüreceği değerler için arayüz
interface UseFormHandlerReturn<T extends ZodTypeAny> {
  isLoading: Ref<boolean>;
  error: Ref<IApiError | null>;
  // Component'teki <UForm @submit> olayına bağlanacak fonksiyon
  submit: (event: FormSubmitEvent<z.output<T>>) => Promise<void>; 
}

/**
 * Nuxt UI ve Zod ile form gönderimini yönetmek için bir composable.
 *
 * @param options Şema, onSubmit fonksiyonu ve opsiyonel callback'ler.
 * @returns isLoading state'i, error state'i ve submit fonksiyonu.
 */
export function useFormHandler<T extends ZodTypeAny, R>(
  options: UseFormHandlerOptions<T, R>
): UseFormHandlerReturn<T> {
  const { schema, onSubmit, onSuccess, onError } = options;

  const isLoading = ref(false);
  const error = ref<IApiError | null>(null);

  /**
   * Form gönderimini yöneten fonksiyon. <UForm @submit> olayına bağlanır.
   */
  async function submit(event: FormSubmitEvent<z.output<T>>): Promise<void> {
    isLoading.value = true;
    error.value = null;
    // Formun kendi referansına doğrudan erişemediğimiz için
    // alan bazlı hataları temizleme işini component'e bırakıyoruz (formRef.value?.clear())

    try {
      // event.data zaten Zod tarafından doğrulanmış ve parse edilmiş olmalı
      const result = await onSubmit(event.data);

      // Başarı callback'i varsa çağır
      if (onSuccess) {
        onSuccess(result);
      }

    } catch (err: unknown) {
      const normalizedError = normalizeError(
        err,
        'FORM_HANDLER_ERROR',
        'Form işlenirken bir hata oluştu.'
      );
      error.value = normalizedError;

      // Hata callback'i varsa çağır
      if (onError) {
        onError(normalizedError);
      } else {
        // Callback yoksa en azından konsola logla
        console.error('[useFormHandler] Error:', normalizedError);
      }
      
      // Başarı callback'i olmadığı için hatayı tekrar fırlatmak yerine
      // error state'inin güncellenmesi yeterli olacaktır.
      // Component bu error state'ini izleyerek UI'ı güncelleyebilir.

    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    error,
    submit,
  };
} 