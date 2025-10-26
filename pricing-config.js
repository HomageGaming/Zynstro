/**
 * ZYNSTRO PRICING CONFIGURATION
 * Multi-currency pricing system with automatic conversion
 * Supports all 37 language variants
 */

// ================================================================
// PRICING PLANS CONFIGURATION
// ================================================================

const PRICING_PLANS = {
    // Base prices in USD
    baseCurrency: 'USD',
    
    plans: [
        {
            id: 'free',
            name: {
                en: 'Free',
                es: 'Gratis',
                fr: 'Gratuit',
                de: 'Kostenlos',
                pt: 'Grátis',
                it: 'Gratuito',
                ar: 'مجاني',
                zh: '免费',
                ja: '無料',
                ko: '무료',
                nl: 'Gratis',
                ru: 'Бесплатно',
                hi: 'मुफ़्त',
                ur: 'مفت'
            },
            price: 0,
            billingCycle: 'month',
            features: [
                { id: 'names', limit: 10, unlimited: false },
                { id: 'domains', limit: 5, unlimited: false },
                { id: 'trademark', included: true },
                { id: 'brandingScore', included: true },
                { id: 'history', included: false },
                { id: 'favorites', included: false },
                { id: 'export', included: false },
                { id: 'support', level: 'community' },
                { id: 'aiGenerations', limit: 10, unlimited: false }
            ],
            popular: false,
            recommended: false,
            cta: {
                en: 'Get Started Free',
                es: 'Comenzar Gratis',
                fr: 'Commencer Gratuitement',
                de: 'Kostenlos Starten',
                pt: 'Começar Grátis',
                ur: 'مفت شروع کریں'
            }
        },
        {
            id: 'starter',
            name: {
                en: 'Starter',
                es: 'Inicial',
                fr: 'Débutant',
                de: 'Starter',
                pt: 'Iniciante',
                it: 'Base',
                ar: 'المبتدئ',
                zh: '入门版',
                ja: 'スターター',
                ko: '스타터',
                nl: 'Starter',
                ru: 'Стартовый',
                hi: 'शुरुआती',
                ur: 'ابتدائی'
            },
            price: 9.99,
            billingCycle: 'month',
            features: [
                { id: 'names', limit: 100, unlimited: false },
                { id: 'domains', limit: 50, unlimited: false },
                { id: 'trademark', included: true },
                { id: 'brandingScore', included: true },
                { id: 'history', included: true },
                { id: 'favorites', included: true },
                { id: 'export', included: true },
                { id: 'support', level: 'email' },
                { id: 'aiGenerations', limit: 100, unlimited: false }
            ],
            popular: false,
            recommended: false,
            cta: {
                en: 'Start 7-Day Trial',
                es: 'Prueba 7 Días Gratis',
                fr: 'Essai Gratuit 7 Jours',
                de: '7-Tage-Test Starten',
                pt: 'Teste 7 Dias Grátis',
                ur: '7 دن کی آزمائش شروع کریں'
            }
        },
        {
            id: 'professional',
            name: {
                en: 'Professional',
                es: 'Profesional',
                fr: 'Professionnel',
                de: 'Professionell',
                pt: 'Profissional',
                it: 'Professionale',
                ar: 'احترافي',
                zh: '专业版',
                ja: 'プロフェッショナル',
                ko: '프로페셔널',
                nl: 'Professioneel',
                ru: 'Профессиональный',
                hi: 'पेशेवर',
                ur: 'پیشہ ورانہ'
            },
            price: 29.99,
            billingCycle: 'month',
            features: [
                { id: 'names', unlimited: true },
                { id: 'domains', unlimited: true },
                { id: 'trademark', included: true },
                { id: 'brandingScore', included: true },
                { id: 'history', included: true },
                { id: 'favorites', included: true },
                { id: 'export', included: true },
                { id: 'support', level: 'priority' },
                { id: 'aiGenerations', unlimited: true },
                { id: 'analytics', included: true },
                { id: 'team', members: 3 },
                { id: 'api', included: true }
            ],
            popular: true,
            recommended: true,
            cta: {
                en: 'Start Free Trial',
                es: 'Prueba Gratis',
                fr: 'Essai Gratuit',
                de: 'Kostenlos Testen',
                pt: 'Teste Grátis',
                ur: 'مفت آزمائش شروع کریں'
            }
        },
        {
            id: 'enterprise',
            name: {
                en: 'Enterprise',
                es: 'Empresarial',
                fr: 'Entreprise',
                de: 'Unternehmen',
                pt: 'Empresarial',
                it: 'Enterprise',
                ar: 'للشركات',
                zh: '企业版',
                ja: 'エンタープライズ',
                ko: '엔터프라이즈',
                nl: 'Enterprise',
                ru: 'Корпоративный',
                hi: 'उद्यम',
                ur: 'انٹرپرائز'
            },
            price: 'custom',
            billingCycle: 'custom',
            features: [
                { id: 'names', unlimited: true },
                { id: 'domains', unlimited: true },
                { id: 'trademark', included: true },
                { id: 'brandingScore', included: true },
                { id: 'history', included: true },
                { id: 'favorites', included: true },
                { id: 'export', included: true },
                { id: 'support', level: 'dedicated' },
                { id: 'aiGenerations', unlimited: true },
                { id: 'analytics', included: true },
                { id: 'team', unlimited: true },
                { id: 'api', included: true },
                { id: 'whitelabel', included: true },
                { id: 'customIntegration', included: true },
                { id: 'sla', included: true }
            ],
            popular: false,
            recommended: false,
            cta: {
                en: 'Contact Sales',
                es: 'Contactar Ventas',
                fr: 'Contacter les Ventes',
                de: 'Vertrieb Kontaktieren',
                pt: 'Contatar Vendas',
                ur: 'سیلز سے رابطہ کریں'
            }
        }
    ],
    
    // Annual discount (20% off)
    annualDiscount: 0.20,
    
    // Feature translations
    featureNames: {
        names: {
            en: 'Business Name Generations',
            es: 'Generaciones de Nombres',
            fr: 'Générations de Noms',
            de: 'Namengenerierungen',
            pt: 'Gerações de Nomes',
            ur: 'نام جنریشن'
        },
        domains: {
            en: 'Domain Availability Checks',
            es: 'Verificaciones de Dominio',
            fr: 'Vérifications de Domaine',
            de: 'Domain-Verfügbarkeiten',
            pt: 'Verificações de Domínio',
            ur: 'ڈومین دستیابی چیک'
        },
        trademark: {
            en: 'Trademark Risk Assessment',
            es: 'Evaluación de Riesgo de Marca',
            fr: 'Évaluation des Risques de Marque',
            de: 'Markenrisikobewertung',
            pt: 'Avaliação de Risco de Marca',
            ur: 'ٹریڈ مارک خطرے کی تشخیص'
        },
        brandingScore: {
            en: 'Branding Score Analysis',
            es: 'Análisis de Puntuación de Marca',
            fr: 'Analyse du Score de Marque',
            de: 'Branding-Score-Analyse',
            pt: 'Análise de Pontuação de Marca',
            ur: 'برانڈنگ اسکور تجزیہ'
        },
        history: {
            en: 'Search History',
            es: 'Historial de Búsqueda',
            fr: 'Historique de Recherche',
            de: 'Suchverlauf',
            pt: 'Histórico de Pesquisa',
            ur: 'تلاش کی تاریخ'
        },
        favorites: {
            en: 'Save Favorites',
            es: 'Guardar Favoritos',
            fr: 'Enregistrer les Favoris',
            de: 'Favoriten Speichern',
            pt: 'Salvar Favoritos',
            ur: 'پسندیدہ محفوظ کریں'
        },
        export: {
            en: 'Export Results',
            es: 'Exportar Resultados',
            fr: 'Exporter les Résultats',
            de: 'Ergebnisse Exportieren',
            pt: 'Exportar Resultados',
            ur: 'نتائج برآمد کریں'
        },
        support: {
            en: 'Customer Support',
            es: 'Soporte al Cliente',
            fr: 'Support Client',
            de: 'Kundensupport',
            pt: 'Suporte ao Cliente',
            ur: 'کسٹمر سپورٹ'
        },
        analytics: {
            en: 'Advanced Analytics',
            es: 'Análisis Avanzados',
            fr: 'Analyses Avancées',
            de: 'Erweiterte Analysen',
            pt: 'Análises Avançadas',
            ur: 'جدید تجزیہ کاری'
        },
        team: {
            en: 'Team Members',
            es: 'Miembros del Equipo',
            fr: 'Membres de l\'Équipe',
            de: 'Teammitglieder',
            pt: 'Membros da Equipe',
            ur: 'ٹیم کے ارکان'
        },
        api: {
            en: 'API Access',
            es: 'Acceso a API',
            fr: 'Accès API',
            de: 'API-Zugriff',
            pt: 'Acesso à API',
            ur: 'API رسائی'
        },
        whitelabel: {
            en: 'White Label Solution',
            es: 'Solución de Marca Blanca',
            fr: 'Solution en Marque Blanche',
            de: 'White-Label-Lösung',
            pt: 'Solução White Label',
            ur: 'وائٹ لیبل حل'
        },
        customIntegration: {
            en: 'Custom Integrations',
            es: 'Integraciones Personalizadas',
            fr: 'Intégrations Personnalisées',
            de: 'Benutzerdefinierte Integrationen',
            pt: 'Integrações Personalizadas',
            ur: 'حسب ضرورت انضمام'
        },
        sla: {
            en: '99.9% SLA Guarantee',
            es: 'Garantía SLA del 99.9%',
            fr: 'Garantie SLA 99.9%',
            de: '99.9% SLA-Garantie',
            pt: 'Garantia SLA de 99.9%',
            ur: '99.9% SLA گارنٹی'
        }
    }
};

// ================================================================
// CURRENCY CONFIGURATION
// ================================================================

const CURRENCY_CONFIG = {
    // Exchange rates (update daily via API)
    exchangeRates: {
        'USD': 1.00,      // US Dollar (base)
        'EUR': 0.92,      // Euro
        'GBP': 0.79,      // British Pound
        'CAD': 1.36,      // Canadian Dollar
        'AUD': 1.52,      // Australian Dollar
        'MXN': 17.05,     // Mexican Peso
        'ARS': 350.00,    // Argentine Peso
        'BRL': 4.97,      // Brazilian Real
        'CLP': 900.00,    // Chilean Peso
        'JPY': 149.50,    // Japanese Yen
        'CNY': 7.24,      // Chinese Yuan
        'KRW': 1320.00,   // South Korean Won
        'INR': 83.12,     // Indian Rupee
        'PKR': 278.50,    // Pakistani Rupee
        'RUB': 92.00,     // Russian Ruble
        'SAR': 3.75,      // Saudi Riyal
        'AED': 3.67,      // UAE Dirham
        'TRY': 28.50,     // Turkish Lira
        'CHF': 0.88,      // Swiss Franc
        'SEK': 10.50,     // Swedish Krona
        'NOK': 10.60,     // Norwegian Krone
        'DKK': 6.85,      // Danish Krone
        'PLN': 4.05,      // Polish Złoty
        'CZK': 23.00,     // Czech Koruna
        'HUF': 360.00,    // Hungarian Forint
        'RON': 4.58,      // Romanian Leu
        'BGN': 1.80,      // Bulgarian Lev
        'HRK': 6.93,      // Croatian Kuna
        'ILS': 3.65,      // Israeli Shekel
        'ZAR': 18.75,     // South African Rand
        'NZD': 1.65,      // New Zealand Dollar
        'SGD': 1.34,      // Singapore Dollar
        'HKD': 7.82,      // Hong Kong Dollar
        'THB': 35.50,     // Thai Baht
        'MYR': 4.70,      // Malaysian Ringgit
        'IDR': 15600.00,  // Indonesian Rupiah
        'PHP': 56.00,     // Philippine Peso
        'VND': 24500.00   // Vietnamese Dong
    },
    
    // Currency symbols
    symbols: {
        'USD': '$', 'EUR': '€', 'GBP': '£', 'CAD': 'CA$', 'AUD': 'A$',
        'MXN': 'MX$', 'ARS': 'AR$', 'BRL': 'R$', 'CLP': 'CL$',
        'JPY': '¥', 'CNY': '¥', 'KRW': '₩', 'INR': '₹', 'PKR': '₨',
        'RUB': '₽', 'SAR': 'SR', 'AED': 'د.إ', 'TRY': '₺',
        'CHF': 'Fr', 'SEK': 'kr', 'NOK': 'kr', 'DKK': 'kr',
        'PLN': 'zł', 'CZK': 'Kč', 'HUF': 'Ft', 'RON': 'lei',
        'BGN': 'лв', 'HRK': 'kn', 'ILS': '₪', 'ZAR': 'R',
        'NZD': 'NZ$', 'SGD': 'S$', 'HKD': 'HK$', 'THB': '฿',
        'MYR': 'RM', 'IDR': 'Rp', 'PHP': '₱', 'VND': '₫'
    },
    
    // Language to currency mapping
    languageToCurrency: {
        'en': 'USD', 'en-US': 'USD', 'en-GB': 'GBP', 'en-AU': 'AUD', 'en-CA': 'CAD',
        'es': 'EUR', 'es-ES': 'EUR', 'es-MX': 'MXN', 'es-AR': 'ARS',
        'fr': 'EUR', 'fr-FR': 'EUR', 'fr-CA': 'CAD',
        'de': 'EUR', 'de-DE': 'EUR', 'de-AT': 'EUR',
        'pt': 'EUR', 'pt-BR': 'BRL', 'pt-PT': 'EUR',
        'it': 'EUR', 'it-IT': 'EUR',
        'ar': 'SAR', 'ar-SA': 'SAR', 'ar-AE': 'AED',
        'zh': 'CNY', 'zh-CN': 'CNY', 'zh-TW': 'TWD',
        'ja': 'JPY', 'ja-JP': 'JPY',
        'ko': 'KRW', 'ko-KR': 'KRW',
        'nl': 'EUR', 'nl-NL': 'EUR',
        'ru': 'RUB', 'ru-RU': 'RUB',
        'hi': 'INR', 'hi-IN': 'INR',
        'ur': 'PKR', 'ur-PK': 'PKR'
    },
    
    // Decimal places for currencies
    decimalPlaces: {
        'JPY': 0, 'KRW': 0, 'VND': 0, 'IDR': 0,  // Zero decimal currencies
        'default': 2
    }
};

// ================================================================
// PRICING MANAGER CLASS
// ================================================================

class PricingManager {
    constructor() {
        this.plans = PRICING_PLANS.plans;
        this.baseCurrency = PRICING_PLANS.baseCurrency;
        this.currentCurrency = 'USD';
        this.currentLanguage = 'en';
        this.billingCycle = 'monthly'; // 'monthly' or 'annual'
    }
    
    /**
     * Initialize pricing with language and currency
     */
    init(language = 'en') {
        this.currentLanguage = language;
        this.currentCurrency = this.getCurrencyForLanguage(language);
        this.detectUserPreferences();
    }
    
    /**
     * Get currency for language
     */
    getCurrencyForLanguage(language) {
        return CURRENCY_CONFIG.languageToCurrency[language] || 'USD';
    }
    
    /**
     * Detect user preferences from cookie/localStorage
     */
    detectUserPreferences() {
        // Check for saved currency preference
        const savedCurrency = localStorage.getItem('preferred_currency');
        if (savedCurrency && CURRENCY_CONFIG.exchangeRates[savedCurrency]) {
            this.currentCurrency = savedCurrency;
        }
        
        // Check for saved billing cycle
        const savedCycle = localStorage.getItem('billing_cycle');
        if (savedCycle === 'annual' || savedCycle === 'monthly') {
            this.billingCycle = savedCycle;
        }
    }
    
    /**
     * Convert price from USD to target currency
     */
    convertPrice(priceUSD, targetCurrency = this.currentCurrency) {
        if (priceUSD === 'custom' || priceUSD === 0) {
            return priceUSD;
        }
        
        const rate = CURRENCY_CONFIG.exchangeRates[targetCurrency] || 1;
        const convertedPrice = priceUSD * rate;
        
        // Round to appropriate decimal places
        const decimals = CURRENCY_CONFIG.decimalPlaces[targetCurrency] || 
                        CURRENCY_CONFIG.decimalPlaces.default;
        
        return Math.round(convertedPrice * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }
    
    /**
     * Format price with currency symbol
     */
    formatPrice(price, currency = this.currentCurrency, language = this.currentLanguage) {
        if (price === 'custom') {
            return this.getCustomPriceText(language);
        }
        
        if (price === 0) {
            return this.getFreeText(language);
        }
        
        const symbol = CURRENCY_CONFIG.symbols[currency] || currency;
        const decimals = CURRENCY_CONFIG.decimalPlaces[currency] || 
                        CURRENCY_CONFIG.decimalPlaces.default;
        
        // Use Intl.NumberFormat for localized formatting
        const formatter = new Intl.NumberFormat(this.getLocale(language), {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
        
        return formatter.format(price);
    }
    
    /**
     * Get locale for language
     */
    getLocale(language) {
        const localeMap = {
            'en': 'en-US', 'en-US': 'en-US', 'en-GB': 'en-GB', 'en-AU': 'en-AU', 'en-CA': 'en-CA',
            'es': 'es-ES', 'es-ES': 'es-ES', 'es-MX': 'es-MX', 'es-AR': 'es-AR',
            'fr': 'fr-FR', 'fr-FR': 'fr-FR', 'fr-CA': 'fr-CA',
            'de': 'de-DE', 'de-DE': 'de-DE', 'de-AT': 'de-AT',
            'pt': 'pt-PT', 'pt-BR': 'pt-BR', 'pt-PT': 'pt-PT',
            'it': 'it-IT', 'ja': 'ja-JP', 'ko': 'ko-KR',
            'zh': 'zh-CN', 'zh-CN': 'zh-CN', 'zh-TW': 'zh-TW',
            'ar': 'ar-SA', 'ar-SA': 'ar-SA', 'ar-AE': 'ar-AE',
            'nl': 'nl-NL', 'ru': 'ru-RU', 'hi': 'hi-IN', 'ur': 'ur-PK'
        };
        return localeMap[language] || 'en-US';
    }
    
    /**
     * Get "Free" text in language
     */
    getFreeText(language) {
        const freeTexts = {
            en: 'Free', es: 'Gratis', fr: 'Gratuit', de: 'Kostenlos',
            pt: 'Grátis', it: 'Gratuito', ar: 'مجاني', zh: '免费',
            ja: '無料', ko: '무료', nl: 'Gratis', ru: 'Бесплатно',
            hi: 'मुफ़्त', ur: 'مفت'
        };
        return freeTexts[language.split('-')[0]] || 'Free';
    }
    
    /**
     * Get "Custom" price text in language
     */
    getCustomPriceText(language) {
        const customTexts = {
            en: 'Custom', es: 'Personalizado', fr: 'Personnalisé', de: 'Individuell',
            pt: 'Personalizado', it: 'Personalizzato', ar: 'مخصص', zh: '定制',
            ja: 'カスタム', ko: '맞춤형', nl: 'Op maat', ru: 'Индивидуально',
            hi: 'कस्टम', ur: 'حسب ضرورت'
        };
        return customTexts[language.split('-')[0]] || 'Custom';
    }
    
    /**
     * Get plan with converted prices
     */
    getPlan(planId, language = this.currentLanguage, currency = this.currentCurrency) {
        const plan = this.plans.find(p => p.id === planId);
        if (!plan) return null;
        
        const baseLang = language.split('-')[0];
        
        return {
            ...plan,
            displayName: plan.name[baseLang] || plan.name.en,
            displayPrice: this.formatPrice(
                this.convertPrice(plan.price, currency),
                currency,
                language
            ),
            monthlyprice: this.convertPrice(plan.price, currency),
            annualPrice: plan.price === 'custom' ? 'custom' : 
                        this.convertPrice(plan.price * 12 * (1 - PRICING_PLANS.annualDiscount), currency),
            ctaText: plan.cta[baseLang] || plan.cta.en,
            currency: currency
        };
    }
    
    /**
     * Get all plans with converted prices
     */
    getAllPlans(language = this.currentLanguage, currency = this.currentCurrency) {
        return this.plans.map(plan => this.getPlan(plan.id, language, currency));
    }
    
    /**
     * Set billing cycle
     */
    setBillingCycle(cycle) {
        if (cycle === 'annual' || cycle === 'monthly') {
            this.billingCycle = cycle;
            localStorage.setItem('billing_cycle', cycle);
        }
    }
    
    /**
     * Set currency preference
     */
    setCurrency(currency) {
        if (CURRENCY_CONFIG.exchangeRates[currency]) {
            this.currentCurrency = currency;
            localStorage.setItem('preferred_currency', currency);
        }
    }
    
    /**
     * Update exchange rates from API
     */
    async updateExchangeRates() {
        try {
            // Example: Use exchangerate-api.com (free tier available)
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            
            if (data && data.rates) {
                Object.keys(CURRENCY_CONFIG.exchangeRates).forEach(currency => {
                    if (data.rates[currency]) {
                        CURRENCY_CONFIG.exchangeRates[currency] = data.rates[currency];
                    }
                });
                
                // Save to localStorage
                localStorage.setItem('exchange_rates', JSON.stringify(CURRENCY_CONFIG.exchangeRates));
                localStorage.setItem('exchange_rates_updated', Date.now().toString());
            }
        } catch (error) {
            console.warn('Failed to update exchange rates:', error);
        }
    }
    
    /**
     * Check if exchange rates need update (update daily)
     */
    shouldUpdateRates() {
        const lastUpdate = localStorage.getItem('exchange_rates_updated');
        if (!lastUpdate) return true;
        
        const oneDayMs = 24 * 60 * 60 * 1000;
        return (Date.now() - parseInt(lastUpdate)) > oneDayMs;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PricingManager, PRICING_PLANS, CURRENCY_CONFIG };
}
