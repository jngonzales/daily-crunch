// Translation service using MyMemory API (free translation service)
export class TranslationService {
  private static readonly TRANSLATION_API_URL = 'https://api.mymemory.translated.net/get';
  
  // Cache to avoid translating the same text multiple times
  private static translationCache = new Map<string, string>();
  
  // Detect if text is likely non-English (simple heuristic)
  static isLikelyNonEnglish(text: string): boolean {
    if (!text || text.length < 10) return false;
    
    // Common non-English characters and patterns
    const nonEnglishPatterns = [
      /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/i, // Accented characters
      /[αβγδεζηθικλμνξοπρστυφχψω]/i, // Greek
      /[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]/i, // Cyrillic
      /[一-龯]/i, // Chinese/Japanese
      /[가-힣]/i, // Korean
      /[ا-ي]/i, // Arabic
      /[ก-๙]/i, // Thai
      /[आ-ह]/i, // Hindi
      /[ä|ö|ü|ß]/i, // German
      /[ñ|¿|¡]/i, // Spanish
      /[ç|à|é|è|ê|ô]/i, // French
      /[ø|å|æ]/i, // Norwegian/Danish
      /[ä|ö|å]/i, // Swedish
    ];
    
    // Check if text contains non-English patterns
    const hasNonEnglishChars = nonEnglishPatterns.some(pattern => pattern.test(text));
    
    // Also check for common non-English words
    const commonNonEnglishWords = [
      'der', 'die', 'das', 'und', 'oder', // German
      'le', 'la', 'les', 'et', 'ou', 'de', 'du', 'des', // French
      'el', 'la', 'los', 'las', 'y', 'o', 'de', 'del', // Spanish
      'il', 'la', 'i', 'le', 'e', 'o', 'di', 'da', // Italian
      'den', 'det', 'och', 'eller', 'av', // Swedish
      'den', 'det', 'og', 'eller', 'av', // Norwegian
      'de', 'het', 'en', 'of', 'van', // Dutch
      'на', 'и', 'в', 'с', 'не', 'за', // Russian
      'の', 'に', 'は', 'を', 'が', 'で', // Japanese
    ];
    
    const words = text.toLowerCase().split(/\s+/).slice(0, 20); // Check first 20 words
    const hasNonEnglishWords = words.some(word => commonNonEnglishWords.includes(word));
    
    return hasNonEnglishChars || hasNonEnglishWords;
  }
  
  // Translate text to English
  static async translateToEnglish(text: string): Promise<string> {
    if (!text || text.trim().length === 0) return text;
    
    // Check cache first
    const cacheKey = text.substring(0, 100); // Use first 100 chars as cache key
    if (this.translationCache.has(cacheKey)) {
      return this.translationCache.get(cacheKey)!;
    }
    
    // If text appears to be English, return as-is
    if (!this.isLikelyNonEnglish(text)) {
      this.translationCache.set(cacheKey, text);
      return text;
    }
    
    try {
      // Limit text length to avoid API limits
      const textToTranslate = text.length > 500 ? text.substring(0, 500) + '...' : text;
      
      const url = `${this.TRANSLATION_API_URL}?q=${encodeURIComponent(textToTranslate)}&langpair=autodetect|en`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        const translatedText = data.responseData.translatedText;
        
        // Cache the translation
        this.translationCache.set(cacheKey, translatedText);
        
        return translatedText;
      } else {
        console.warn('Translation failed, returning original text');
        return text;
      }
    } catch (error) {
      console.warn('Translation error:', error);
      return text; // Return original text if translation fails
    }
  }
  
  // Translate article titles and summaries
  static async translateArticleContent(title: string, summary: string[]): Promise<{title: string, summary: string[]}> {
    try {
      // Translate title
      const translatedTitle = await this.translateToEnglish(title);
      
      // Translate summary points
      const translatedSummary = await Promise.all(
        summary.map(point => this.translateToEnglish(point))
      );
      
      return {
        title: translatedTitle,
        summary: translatedSummary
      };
    } catch (error) {
      console.warn('Failed to translate article content:', error);
      return { title, summary }; // Return original content if translation fails
    }
  }
  
  // Clear translation cache (useful for memory management)
  static clearCache(): void {
    this.translationCache.clear();
  }
}