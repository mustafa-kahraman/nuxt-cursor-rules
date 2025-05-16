/**
 * API veya istemci taraflı hatalar için standartlaştırılmış hata arayüzü.
 */
export interface IApiError {
  /**
   * Hatayı kategorize eden benzersiz bir kod (örn. 'VALIDATION_ERROR', 'NETWORK_ERROR', 'AUTH_REQUIRED').
   */
  code: string;
  /**
   * Kullanıcıya gösterilebilecek veya loglanabilecek açıklayıcı hata mesajı.
   */
  message: string;
  /**
   * Hata hakkında ek detaylar (örn. form alanlarına özel hatalar, stack trace).
   */
  details?: any;
}

/**
 * Çeşitli hata formatlarını standart bir IApiError nesnesine dönüştürür.
 *
 * @param error Yakalanan hata nesnesi (Error, string, object vb.).
 * @param defaultCode Hata kodu çözümlenemezse kullanılacak varsayılan kod.
 * @param defaultMessage Hata mesajı çözümlenemezse kullanılacak varsayılan mesaj.
 * @returns Standartlaştırılmış IApiError nesnesi.
 */
export function normalizeError(
  error: unknown,
  defaultCode = 'UNEXPECTED_ERROR',
  defaultMessage = 'Beklenmedik bir hata oluştu.'
): IApiError {
  let code = defaultCode;
  let message = defaultMessage;
  let details: any | undefined;

  if (error instanceof Error) {
    message = error.message;
    // Gerçek API çağrılarında, Nuxt $fetch hatası olup olmadığını kontrol edebiliriz
    // ve 'error.data' içindeki detayları ayrıştırabiliriz.
    if (typeof (error as any).data === 'object' && (error as any).data !== null) {
      const errorData = (error as any).data;
      code = errorData.code || errorData.statusCode || defaultCode;
      message = errorData.message || message; // API'den gelen mesajı önceliklendir
      details = errorData.errors || errorData.details || errorData; // Tüm datayı details'e koy
    } else {
        // Generic Error için basit bir kod türetmeye çalışabiliriz
        if (error.name) {
            code = error.name.toUpperCase().replace(/ERROR$/, '') + '_ERROR';
        }
    }
    // Stack trace'i production'da loglamak için details'e eklenebilir
    // if (process.env.NODE_ENV !== 'production') {
    //   details = { ...details, stack: error.stack };
    // }
  } else if (typeof error === 'string') {
    message = error;
    code = 'GENERIC_STRING_ERROR';
  } else if (typeof error === 'object' && error !== null) {
    // Doğrudan code/message/details içeren bir obje mi?
    if ('message' in error && typeof error.message === 'string') {
      message = error.message;
    }
    if ('code' in error && typeof error.code === 'string') {
      code = error.code;
    }
    if ('details' in error) {
      details = error.details;
    }
     // Axios benzeri `response.data` yapısı?
    else if ('response' in error && typeof (error as any).response?.data === 'object') {
        const responseData = (error as any).response.data;
        code = responseData.code || responseData.statusCode || defaultCode;
        message = responseData.message || message;
        details = responseData.errors || responseData.details || responseData;
    }
    // Nuxt $fetch `error.data` (instanceof Error dışında yakalanmış olabilir)
    else if ('data' in error && typeof (error as any).data === 'object') {
        const errorData = (error as any).data;
        code = errorData.code || errorData.statusCode || defaultCode;
        message = errorData.message || message;
        details = errorData.errors || errorData.details || errorData;
    }
    // Veya en azından bir message alanı var mı?
    else if ('message' in error && typeof error.message === 'string') {
        message = error.message;
        code = 'OBJECT_WITH_MESSAGE';
    }
     // Hiçbir şey yoksa, objeyi olduğu gibi details'e koy
    else if (!details && Object.keys(error).length > 0) {
        details = { ...error };
    }
  }

  // Details'in her zaman bir obje olmasını sağlayalım (primitive değilse)
  if (details !== undefined && typeof details !== 'object') {
      details = { value: details };
  }

  return {
    code,
    message,
    details,
  };
} 