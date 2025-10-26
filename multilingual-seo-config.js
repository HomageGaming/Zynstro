/**
 * ZYNSTRO - MULTILINGUAL SEO CONFIGURATION
 * Complete internationalization and SEO setup for global markets
 */

// =====================================================
// 1. LANGUAGE & REGION CONFIGURATION
// =====================================================

const MULTILINGUAL_CONFIG = {
    defaultLanguage: 'en',
    defaultRegion: 'US',
    supportedLanguages: [
        // English variants
        { code: 'en', name: 'English', nativeName: 'English', region: null, currency: 'USD' },
        { code: 'en-US', name: 'English (US)', nativeName: 'English (US)', region: 'US', currency: 'USD' },
        { code: 'en-GB', name: 'English (UK)', nativeName: 'English (UK)', region: 'GB', currency: 'GBP' },
        { code: 'en-AU', name: 'English (Australia)', nativeName: 'English (AU)', region: 'AU', currency: 'AUD' },
        { code: 'en-CA', name: 'English (Canada)', nativeName: 'English (CA)', region: 'CA', currency: 'CAD' },
        
        // Spanish variants
        { code: 'es', name: 'Spanish', nativeName: 'Español', region: null, currency: 'EUR' },
        { code: 'es-ES', name: 'Spanish (Spain)', nativeName: 'Español (España)', region: 'ES', currency: 'EUR' },
        { code: 'es-MX', name: 'Spanish (Mexico)', nativeName: 'Español (México)', region: 'MX', currency: 'MXN' },
        { code: 'es-AR', name: 'Spanish (Argentina)', nativeName: 'Español (Argentina)', region: 'AR', currency: 'ARS' },
        
        // French variants
        { code: 'fr', name: 'French', nativeName: 'Français', region: null, currency: 'EUR' },
        { code: 'fr-FR', name: 'French (France)', nativeName: 'Français (France)', region: 'FR', currency: 'EUR' },
        { code: 'fr-CA', name: 'French (Canada)', nativeName: 'Français (Canada)', region: 'CA', currency: 'CAD' },
        
        // German
        { code: 'de', name: 'German', nativeName: 'Deutsch', region: null, currency: 'EUR' },
        { code: 'de-DE', name: 'German (Germany)', nativeName: 'Deutsch (Deutschland)', region: 'DE', currency: 'EUR' },
        { code: 'de-AT', name: 'German (Austria)', nativeName: 'Deutsch (Österreich)', region: 'AT', currency: 'EUR' },
        
        // Portuguese
        { code: 'pt', name: 'Portuguese', nativeName: 'Português', region: null, currency: 'EUR' },
        { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', region: 'BR', currency: 'BRL' },
        { code: 'pt-PT', name: 'Portuguese (Portugal)', nativeName: 'Português (Portugal)', region: 'PT', currency: 'EUR' },
        
        // Italian
        { code: 'it', name: 'Italian', nativeName: 'Italiano', region: null, currency: 'EUR' },
        { code: 'it-IT', name: 'Italian (Italy)', nativeName: 'Italiano (Italia)', region: 'IT', currency: 'EUR' },
        
        // Arabic
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', region: null, currency: 'USD', rtl: true },
        { code: 'ar-SA', name: 'Arabic (Saudi Arabia)', nativeName: 'العربية (السعودية)', region: 'SA', currency: 'SAR', rtl: true },
        { code: 'ar-AE', name: 'Arabic (UAE)', nativeName: 'العربية (الإمارات)', region: 'AE', currency: 'AED', rtl: true },
        
        // Chinese
        { code: 'zh', name: 'Chinese', nativeName: '中文', region: null, currency: 'CNY' },
        { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '中文(简体)', region: 'CN', currency: 'CNY' },
        { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '中文(繁體)', region: 'TW', currency: 'TWD' },
        
        // Japanese
        { code: 'ja', name: 'Japanese', nativeName: '日本語', region: null, currency: 'JPY' },
        { code: 'ja-JP', name: 'Japanese (Japan)', nativeName: '日本語 (日本)', region: 'JP', currency: 'JPY' },
        
        // Korean
        { code: 'ko', name: 'Korean', nativeName: '한국어', region: null, currency: 'KRW' },
        { code: 'ko-KR', name: 'Korean (South Korea)', nativeName: '한국어 (대한민국)', region: 'KR', currency: 'KRW' },
        
        // Dutch
        { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', region: null, currency: 'EUR' },
        { code: 'nl-NL', name: 'Dutch (Netherlands)', nativeName: 'Nederlands (Nederland)', region: 'NL', currency: 'EUR' },
        
        // Russian
        { code: 'ru', name: 'Russian', nativeName: 'Русский', region: null, currency: 'RUB' },
        { code: 'ru-RU', name: 'Russian (Russia)', nativeName: 'Русский (Россия)', region: 'RU', currency: 'RUB' },
        
        // Hindi
        { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: null, currency: 'INR' },
        { code: 'hi-IN', name: 'Hindi (India)', nativeName: 'हिन्दी (भारत)', region: 'IN', currency: 'INR' },
        
        // Urdu
        { code: 'ur', name: 'Urdu', nativeName: 'اردو', region: null, currency: 'PKR', rtl: true },
        { code: 'ur-PK', name: 'Urdu (Pakistan)', nativeName: 'اردو (پاکستان)', region: 'PK', currency: 'PKR', rtl: true }
    ]
};

// =====================================================
// 2. URL STRUCTURE CONFIGURATION
// =====================================================

const URL_STRUCTURE = {
    // Choose one: 'subdirectory', 'subdomain', 'cctld'
    strategy: 'subdirectory', // Recommended for most cases
    
    baseUrl: 'https://zynstro.com',
    
    // Subdirectory examples: /es/, /fr/, /de/
    getSubdirectoryUrl: (lang, path = '') => {
        const base = URL_STRUCTURE.baseUrl;
        return lang === 'en' ? `${base}${path}` : `${base}/${lang}${path}`;
    },
    
    // Subdomain examples: es.zynstro.com, fr.zynstro.com
    getSubdomainUrl: (lang, path = '') => {
        return lang === 'en' 
            ? `https://www.zynstro.com${path}` 
            : `https://${lang}.zynstro.com${path}`;
    },
    
    // ccTLD examples: zynstro.es, zynstro.fr, zynstro.de
    getCcTLDUrl: (lang, path = '') => {
        const tldMap = {
            'en': 'com', 'es': 'es', 'fr': 'fr', 'de': 'de',
            'it': 'it', 'pt': 'pt', 'nl': 'nl', 'ru': 'ru',
            'jp': 'jp', 'cn': 'cn', 'kr': 'kr'
        };
        const baseLang = lang.split('-')[0];
        const tld = tldMap[baseLang] || 'com';
        return `https://zynstro.${tld}${path}`;
    },
    
    getCurrentUrl: function(lang, path = '') {
        switch(this.strategy) {
            case 'subdirectory':
                return this.getSubdirectoryUrl(lang, path);
            case 'subdomain':
                return this.getSubdomainUrl(lang, path);
            case 'cctld':
                return this.getCcTLDUrl(lang, path);
            default:
                return this.getSubdirectoryUrl(lang, path);
        }
    }
};

// =====================================================
// 3. HREFLANG TAG GENERATOR
// =====================================================

class HreflangManager {
    constructor(currentPath = '/') {
        this.currentPath = currentPath;
    }
    
    generateHreflangTags() {
        const tags = [];
        
        // Add x-default for international visitors
        tags.push({
            rel: 'alternate',
            hreflang: 'x-default',
            href: URL_STRUCTURE.getCurrentUrl('en', this.currentPath)
        });
        
        // Add all language variants
        MULTILINGUAL_CONFIG.supportedLanguages.forEach(lang => {
            tags.push({
                rel: 'alternate',
                hreflang: lang.code,
                href: URL_STRUCTURE.getCurrentUrl(lang.code, this.currentPath)
            });
        });
        
        return tags;
    }
    
    injectHreflangTags() {
        const tags = this.generateHreflangTags();
        const head = document.head;
        
        // Remove existing hreflang tags
        document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(tag => tag.remove());
        
        // Inject new tags
        tags.forEach(tag => {
            const link = document.createElement('link');
            link.rel = tag.rel;
            link.hreflang = tag.hreflang;
            link.href = tag.href;
            head.appendChild(link);
        });
    }
    
    getHreflangHTML() {
        const tags = this.generateHreflangTags();
        return tags.map(tag => 
            `<link rel="${tag.rel}" hreflang="${tag.hreflang}" href="${tag.href}" />`
        ).join('\n    ');
    }
}

// =====================================================
// 4. LANGUAGE DETECTION & PERSISTENCE
// =====================================================

class LanguageManager {
    constructor() {
        this.storageKey = 'zynstro_preferred_language';
        this.currentLanguage = this.detectLanguage();
    }
    
    detectLanguage() {
        // 1. Check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && this.isValidLanguage(urlLang)) {
            return urlLang;
        }
        
        // 2. Check cookie/localStorage
        const storedLang = this.getStoredLanguage();
        if (storedLang && this.isValidLanguage(storedLang)) {
            return storedLang;
        }
        
        // 3. Check URL path (for subdirectory strategy)
        if (URL_STRUCTURE.strategy === 'subdirectory') {
            const pathLang = this.getLanguageFromPath();
            if (pathLang && this.isValidLanguage(pathLang)) {
                return pathLang;
            }
        }
        
        // 4. Check browser language
        const browserLang = this.getBrowserLanguage();
        if (browserLang && this.isValidLanguage(browserLang)) {
            return browserLang;
        }
        
        // 5. Fallback to default
        return MULTILINGUAL_CONFIG.defaultLanguage;
    }
    
    getLanguageFromPath() {
        const pathParts = window.location.pathname.split('/').filter(p => p);
        if (pathParts.length > 0) {
            return pathParts[0];
        }
        return null;
    }
    
    getBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        // Try exact match first
        if (this.isValidLanguage(browserLang)) {
            return browserLang;
        }
        // Try base language
        const baseLang = browserLang.split('-')[0];
        if (this.isValidLanguage(baseLang)) {
            return baseLang;
        }
        return null;
    }
    
    isValidLanguage(langCode) {
        return MULTILINGUAL_CONFIG.supportedLanguages.some(
            lang => lang.code === langCode
        );
    }
    
    getStoredLanguage() {
        // Try localStorage first
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) return stored;
        } catch (e) {
            console.warn('localStorage not available');
        }
        
        // Fallback to cookie
        const cookie = document.cookie.split('; ').find(row => row.startsWith(`${this.storageKey}=`));
        return cookie ? cookie.split('=')[1] : null;
    }
    
    setLanguage(langCode) {
        if (!this.isValidLanguage(langCode)) {
            console.error('Invalid language code:', langCode);
            return false;
        }
        
        this.currentLanguage = langCode;
        
        // Store in localStorage
        try {
            localStorage.setItem(this.storageKey, langCode);
        } catch (e) {
            console.warn('localStorage not available');
        }
        
        // Store in cookie (365 days)
        const expires = new Date();
        expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
        document.cookie = `${this.storageKey}=${langCode}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
        
        return true;
    }
    
    getCurrentLanguageData() {
        return MULTILINGUAL_CONFIG.supportedLanguages.find(
            lang => lang.code === this.currentLanguage
        ) || MULTILINGUAL_CONFIG.supportedLanguages[0];
    }
    
    switchLanguage(langCode, redirect = true) {
        if (this.setLanguage(langCode)) {
            if (redirect) {
                const currentPath = window.location.pathname;
                const newUrl = URL_STRUCTURE.getCurrentUrl(langCode, currentPath);
                window.location.href = newUrl;
            }
            return true;
        }
        return false;
    }
}

// =====================================================
// 5. GEO-TARGETING FUNCTIONS
// =====================================================

class GeoTargeting {
    static async detectUserCountry() {
        try {
            // Use multiple geo-detection APIs as fallbacks
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return {
                country: data.country_code,
                region: data.region,
                city: data.city,
                currency: data.currency,
                timezone: data.timezone
            };
        } catch (error) {
            console.warn('Geo-detection failed:', error);
            return null;
        }
    }
    
    static async suggestLanguageForCountry(countryCode) {
        const countryLanguageMap = {
            'US': 'en-US', 'GB': 'en-GB', 'AU': 'en-AU', 'CA': 'en-CA',
            'ES': 'es-ES', 'MX': 'es-MX', 'AR': 'es-AR',
            'FR': 'fr-FR',
            'DE': 'de-DE', 'AT': 'de-AT',
            'BR': 'pt-BR', 'PT': 'pt-PT',
            'IT': 'it-IT',
            'SA': 'ar-SA', 'AE': 'ar-AE',
            'CN': 'zh-CN', 'TW': 'zh-TW',
            'JP': 'ja-JP',
            'KR': 'ko-KR',
            'NL': 'nl-NL',
            'RU': 'ru-RU',
            'IN': 'hi-IN'
        };
        
        return countryLanguageMap[countryCode] || 'en';
    }
    
    static injectGeoMetaTags(countryCode) {
        // Remove existing geo tags
        document.querySelectorAll('meta[name="geo.region"]').forEach(tag => tag.remove());
        document.querySelectorAll('meta[name="geo.placename"]').forEach(tag => tag.remove());
        
        // Inject new tags
        const metaRegion = document.createElement('meta');
        metaRegion.name = 'geo.region';
        metaRegion.content = countryCode;
        document.head.appendChild(metaRegion);
    }
}

// =====================================================
// 6. CURRENCY & LOCALIZATION
// =====================================================

class CurrencyConverter {
    constructor() {
        this.rates = {};
        this.baseCurrency = 'USD';
        this.lastUpdate = null;
    }
    
    async fetchExchangeRates() {
        try {
            // Use a free exchange rate API
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            this.rates = data.rates;
            this.lastUpdate = new Date();
            return true;
        } catch (error) {
            console.error('Failed to fetch exchange rates:', error);
            return false;
        }
    }
    
    convert(amount, fromCurrency, toCurrency) {
        if (!this.rates[fromCurrency] || !this.rates[toCurrency]) {
            return amount;
        }
        
        // Convert to USD first, then to target currency
        const inUSD = amount / this.rates[fromCurrency];
        return inUSD * this.rates[toCurrency];
    }
    
    formatCurrency(amount, currencyCode, locale) {
        try {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currencyCode
            }).format(amount);
        } catch (error) {
            return `${currencyCode} ${amount.toFixed(2)}`;
        }
    }
    
    // Prevent duplicate content by using JavaScript conversion
    displayLocalizedPrice(basePrice, baseCurrency, targetCurrency, locale) {
        const convertedAmount = this.convert(basePrice, baseCurrency, targetCurrency);
        return this.formatCurrency(convertedAmount, targetCurrency, locale);
    }
}

// =====================================================
// 7. DATE & NUMBER LOCALIZATION
// =====================================================

class LocalizationFormatter {
    static formatDate(date, locale) {
        try {
            return new Intl.DateTimeFormat(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        } catch (error) {
            return date.toLocaleDateString();
        }
    }
    
    static formatNumber(number, locale) {
        try {
            return new Intl.NumberFormat(locale).format(number);
        } catch (error) {
            return number.toString();
        }
    }
    
    static formatTime(date, locale) {
        try {
            return new Intl.DateTimeFormat(locale, {
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        } catch (error) {
            return date.toLocaleTimeString();
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MULTILINGUAL_CONFIG,
        URL_STRUCTURE,
        HreflangManager,
        LanguageManager,
        GeoTargeting,
        CurrencyConverter,
        LocalizationFormatter
    };
}
