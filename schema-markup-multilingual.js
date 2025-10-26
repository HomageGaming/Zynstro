/**
 * ZYNSTRO - MULTILINGUAL SCHEMA MARKUP GENERATOR
 * JSON-LD structured data for international SEO
 */

class MultilingualSchemaGenerator {
    constructor(languageCode = 'en') {
        this.languageCode = languageCode;
        this.baseUrl = URL_STRUCTURE.baseUrl;
    }
    
    // =====================================================
    // 1. ORGANIZATION SCHEMA (Multilingual)
    // =====================================================
    
    generateOrganizationSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${this.baseUrl}/#organization`,
            "name": "Zynstro",
            "alternateName": this.getAlternateName(),
            "url": this.baseUrl,
            "logo": {
                "@type": "ImageObject",
                "url": `${this.baseUrl}/assets/logo.png`,
                "width": 600,
                "height": 600
            },
            "description": this.getOrganizationDescription(),
            "foundingDate": "2024",
            "founders": [{
                "@type": "Person",
                "name": "Zynstro Team"
            }],
            "address": this.getAddressByLanguage(),
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-XXX-XXX-XXXX",
                "contactType": "customer service",
                "availableLanguage": this.getAllLanguageCodes(),
                "areaServed": "Worldwide"
            },
            "sameAs": [
                "https://www.facebook.com/zynstro",
                "https://twitter.com/zynstro",
                "https://www.linkedin.com/company/zynstro",
                "https://www.instagram.com/zynstro"
            ]
        };
    }
    
    // =====================================================
    // 2. LOCAL BUSINESS SCHEMA (Per Language/Region)
    // =====================================================
    
    generateLocalBusinessSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": `${this.baseUrl}/#localbusiness`,
            "name": "Zynstro",
            "image": `${this.baseUrl}/assets/logo.png`,
            "description": this.getServiceDescription(),
            "priceRange": this.getPriceRange(),
            "telephone": this.getLocalPhone(),
            "address": this.getAddressByLanguage(),
            "geo": this.getGeoCoordinates(),
            "url": URL_STRUCTURE.getCurrentUrl(this.languageCode, '/'),
            "openingHoursSpecification": this.getOpeningHours(),
            "paymentAccepted": this.getPaymentMethods(),
            "currenciesAccepted": this.getAcceptedCurrencies(),
            "availableLanguage": this.getSupportedLanguages()
        };
    }
    
    // =====================================================
    // 3. SERVICE SCHEMA (Multilingual)
    // =====================================================
    
    generateServiceSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${this.baseUrl}/#service`,
            "serviceType": this.getServiceType(),
            "name": this.getServiceName(),
            "description": this.getServiceDescription(),
            "provider": {
                "@id": `${this.baseUrl}/#organization`
            },
            "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": "0",
                    "longitude": "0"
                },
                "geoRadius": "20000000"
            },
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": this.getOfferCatalogName(),
                "itemListElement": this.getServiceOfferings()
            },
            "offers": {
                "@type": "Offer",
                "url": URL_STRUCTURE.getCurrentUrl(this.languageCode, '/'),
                "priceCurrency": this.getCurrencyForLanguage(),
                "price": "0",
                "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                "availability": "https://schema.org/InStock",
                "availableLanguage": this.getAllLanguageCodes()
            }
        };
    }
    
    // =====================================================
    // 4. PRODUCT SCHEMA (For Paid Plans)
    // =====================================================
    
    generateProductSchema(plan) {
        const priceByRegion = this.getLocalizedPrice(plan.basePrice);
        
        return {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": plan.name[this.languageCode] || plan.name['en'],
            "description": plan.description[this.languageCode] || plan.description['en'],
            "brand": {
                "@type": "Brand",
                "name": "Zynstro"
            },
            "offers": {
                "@type": "Offer",
                "url": URL_STRUCTURE.getCurrentUrl(this.languageCode, '/pricing'),
                "priceCurrency": this.getCurrencyForLanguage(),
                "price": priceByRegion.amount,
                "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                "availability": "https://schema.org/InStock",
                "seller": {
                    "@id": `${this.baseUrl}/#organization`
                }
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1250",
                "bestRating": "5",
                "worstRating": "1"
            }
        };
    }
    
    // =====================================================
    // 5. FAQ SCHEMA (Multilingual)
    // =====================================================
    
    generateFAQSchema(faqs) {
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question[this.languageCode] || faq.question['en'],
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer[this.languageCode] || faq.answer['en']
                }
            }))
        };
    }
    
    // =====================================================
    // 6. BREADCRUMB SCHEMA (Multilingual)
    // =====================================================
    
    generateBreadcrumbSchema(breadcrumbs) {
        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name[this.languageCode] || crumb.name['en'],
                "item": URL_STRUCTURE.getCurrentUrl(this.languageCode, crumb.path)
            }))
        };
    }
    
    // =====================================================
    // 7. WEBSITE SCHEMA (Multilingual)
    // =====================================================
    
    generateWebSiteSchema() {
        return {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${this.baseUrl}/#website`,
            "url": this.baseUrl,
            "name": "Zynstro",
            "description": this.getOrganizationDescription(),
            "inLanguage": this.languageCode,
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${this.baseUrl}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
            }
        };
    }
    
    // =====================================================
    // 8. WEBPAGE SCHEMA (Multilingual)
    // =====================================================
    
    generateWebPageSchema(pageData) {
        return {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": URL_STRUCTURE.getCurrentUrl(this.languageCode, pageData.path) + '#webpage',
            "url": URL_STRUCTURE.getCurrentUrl(this.languageCode, pageData.path),
            "name": pageData.title[this.languageCode] || pageData.title['en'],
            "description": pageData.description[this.languageCode] || pageData.description['en'],
            "inLanguage": this.languageCode,
            "isPartOf": {
                "@id": `${this.baseUrl}/#website`
            },
            "about": {
                "@id": `${this.baseUrl}/#organization`
            },
            "primaryImageOfPage": {
                "@type": "ImageObject",
                "url": pageData.image || `${this.baseUrl}/assets/og-image.png`
            },
            "datePublished": pageData.datePublished,
            "dateModified": pageData.dateModified || pageData.datePublished
        };
    }
    
    // =====================================================
    // 9. ARTICLE SCHEMA (For Blog Posts)
    // =====================================================
    
    generateArticleSchema(article) {
        return {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title[this.languageCode] || article.title['en'],
            "description": article.description[this.languageCode] || article.description['en'],
            "image": article.image,
            "datePublished": article.datePublished,
            "dateModified": article.dateModified || article.datePublished,
            "author": {
                "@type": "Person",
                "name": article.author
            },
            "publisher": {
                "@id": `${this.baseUrl}/#organization`
            },
            "inLanguage": this.languageCode,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": URL_STRUCTURE.getCurrentUrl(this.languageCode, article.path)
            }
        };
    }
    
    // =====================================================
    // HELPER METHODS
    // =====================================================
    
    getOrganizationDescription() {
        const descriptions = {
            'en': 'Zynstro is an AI-powered business name generator that helps entrepreneurs find the perfect brand name with domain availability checking, trademark assessment, and branding tools.',
            'es': 'Zynstro es un generador de nombres comerciales impulsado por IA que ayuda a los emprendedores a encontrar el nombre de marca perfecto con verificación de disponibilidad de dominio, evaluación de marcas y herramientas de branding.',
            'fr': 'Zynstro est un générateur de noms d\'entreprise alimenté par l\'IA qui aide les entrepreneurs à trouver le nom de marque parfait avec vérification de disponibilité de domaine, évaluation de marque et outils de branding.',
            'de': 'Zynstro ist ein KI-gestützter Business-Namensgenerator, der Unternehmern hilft, den perfekten Markennamen mit Domain-Verfügbarkeitsprüfung, Markenbeurteilung und Branding-Tools zu finden.',
            'pt': 'Zynstro é um gerador de nomes comerciais com tecnologia de IA que ajuda empreendedores a encontrar o nome de marca perfeito com verificação de disponibilidade de domínio, avaliação de marca registrada e ferramentas de branding.',
            'it': 'Zynstro è un generatore di nomi aziendali basato sull\'IA che aiuta gli imprenditori a trovare il nome del marchio perfetto con controllo della disponibilità del dominio, valutazione del marchio e strumenti di branding.',
            'ar': 'Zynstro هو مولد أسماء تجارية مدعوم بالذكاء الاصطناعي يساعد رواد الأعمال في العثور على اسم العلامة التجارية المثالي مع فحص توفر النطاق وتقييم العلامة التجارية وأدوات العلامة التجارية.',
            'zh': 'Zynstro 是一款由人工智能驱动的商业名称生成器，帮助企业家找到完美的品牌名称，并提供域名可用性检查、商标评估和品牌工具。',
            'ja': 'Zynstroは、ドメインの可用性チェック、商標評価、ブランディングツールを備えた、起業家が完璧なブランド名を見つけるのを支援するAI搭載のビジネス名ジェネレーターです。',
            'ko': 'Zynstro는 도메인 가용성 확인, 상표 평가 및 브랜딩 도구를 갖춘 AI 기반 비즈니스 이름 생성기로 기업가가 완벽한 브랜드 이름을 찾을 수 있도록 도와줍니다.',
            'nl': 'Zynstro is een AI-aangedreven bedrijfsnaamgenerator die ondernemers helpt de perfecte merknaam te vinden met domeinbeschikbaarheidscontrole, merkbeoordeling en brandingtools.',
            'ru': 'Zynstro - это генератор бизнес-названий на основе ИИ, который помогает предпринимателям найти идеальное название бренда с проверкой доступности домена, оценкой товарного знака и инструментами брендинга.',
            'hi': 'Zynstro एक AI-संचालित व्यवसाय नाम जनरेटर है जो उद्यमियों को डोमेन उपलब्धता जांच, ट्रेडमार्क मूल्यांकन और ब्रांडिंग टूल के साथ सही ब्रांड नाम खोजने में मदद करता है।',
            'ur': 'Zynstro ایک AI سے چلنے والا کاروباری نام جنریٹر ہے جو کاروباری افراد کو ڈومین کی دستیابی کی جانچ، ٹریڈ مارک کی تشخیص، اور برانڈنگ ٹولز کے ساتھ بہترین برانڈ نام تلاش کرنے میں مدد کرتا ہے۔'
        };
        
        const baseLang = this.languageCode.split('-')[0];
        return descriptions[this.languageCode] || descriptions[baseLang] || descriptions['en'];
    }
    
    getServiceName() {
        const names = {
            'en': 'AI Business Name Generation Service',
            'es': 'Servicio de Generación de Nombres Comerciales con IA',
            'fr': 'Service de Génération de Noms d\'Entreprise par IA',
            'de': 'KI-Business-Namensgenerierungsdienst',
            'pt': 'Serviço de Geração de Nomes Comerciais com IA',
            'it': 'Servizio di Generazione di Nomi Aziendali con IA',
            'ar': 'خدمة توليد أسماء الأعمال بالذكاء الاصطناعي',
            'zh': 'AI商业名称生成服务',
            'ja': 'AIビジネスネーム生成サービス',
            'ko': 'AI 비즈니스 이름 생성 서비스',
            'nl': 'AI Bedrijfsnaamgeneratieservice',
            'ru': 'Сервис генерации бизнес-названий на основе ИИ',
            'hi': 'AI व्यवसाय नाम जनरेशन सेवा',
            'ur': 'AI کاروباری نام جنریشن سروس'
        };
        
        const baseLang = this.languageCode.split('-')[0];
        return names[this.languageCode] || names[baseLang] || names['en'];
    }
    
    getServiceDescription() {
        return this.getOrganizationDescription();
    }
    
    getServiceType() {
        const types = {
            'en': 'Business Naming & Branding Consultation',
            'es': 'Consultoría de Nombres y Branding Empresarial',
            'fr': 'Consultation en Dénomination et Branding d\'Entreprise',
            'de': 'Business-Naming & Branding-Beratung',
            'pt': 'Consultoria de Naming e Branding Empresarial',
            'it': 'Consulenza di Naming e Branding Aziendale',
            'ar': 'استشارات تسمية العلامات التجارية والعلامات التجارية',
            'zh': '商业命名和品牌咨询',
            'ja': 'ビジネスネーミング＆ブランディングコンサルテーション',
            'ko': '비즈니스 네이밍 및 브랜딩 컨설팅',
            'nl': 'Bedrijfsnaming & Branding Consultancy',
            'ru': 'Консультации по неймингу и брендингу бизнеса',
            'hi': 'व्यवसाय नामकरण और ब्रांडिंग परामर्श',
            'ur': 'کاروباری نام اور برانڈنگ مشاورت'
        };
        
        const baseLang = this.languageCode.split('-')[0];
        return types[this.languageCode] || types[baseLang] || types['en'];
    }
    
    getOfferCatalogName() {
        const names = {
            'en': 'Business Naming Services',
            'es': 'Servicios de Nombres Comerciales',
            'fr': 'Services de Dénomination d\'Entreprise',
            'de': 'Business-Naming-Dienste',
            'pt': 'Serviços de Nomenclatura Empresarial',
            'it': 'Servizi di Denominazione Aziendale',
            'ar': 'خدمات تسمية الأعمال',
            'zh': '商业命名服务',
            'ja': 'ビジネスネーミングサービス',
            'ko': '비즈니스 네이밍 서비스',
            'nl': 'Bedrijfsnaamgevingsdiensten',
            'ru': 'Услуги по неймингу бизнеса',
            'hi': 'व्यवसाय नामकरण सेवाएं',
            'ur': 'کاروباری نام کی خدمات'
        };
        
        const baseLang = this.languageCode.split('-')[0];
        return names[this.languageCode] || names[baseLang] || names['en'];
    }
    
    getServiceOfferings() {
        // Define service offerings with multilingual names
        const offerings = [
            {
                en: 'Quick Name Generation',
                es: 'Generación Rápida de Nombres',
                fr: 'Génération Rapide de Noms',
                de: 'Schnelle Namensgenerierung'
            },
            {
                en: 'Deep Analysis Mode',
                es: 'Modo de Análisis Profundo',
                fr: 'Mode d\'Analyse Approfondie',
                de: 'Tiefenanalyse-Modus'
            },
            {
                en: 'Industry Expert Mode',
                es: 'Modo Experto de Industria',
                fr: 'Mode Expert Sectoriel',
                de: 'Branchen-Experten-Modus'
            }
        ];
        
        const baseLang = this.languageCode.split('-')[0];
        
        return offerings.map((offering, index) => ({
            "@type": "Offer",
            "itemOffered": {
                "@type": "Service",
                "name": offering[this.languageCode] || offering[baseLang] || offering['en']
            }
        }));
    }
    
    getCurrencyForLanguage() {
        const lang = MULTILINGUAL_CONFIG.supportedLanguages.find(
            l => l.code === this.languageCode
        );
        return lang ? lang.currency : 'USD';
    }
    
    getLocalizedPrice(basePrice) {
        // This would integrate with CurrencyConverter
        const currency = this.getCurrencyForLanguage();
        // Simplified - in production, use real conversion rates
        return {
            amount: basePrice,
            currency: currency
        };
    }
    
    getAllLanguageCodes() {
        return MULTILINGUAL_CONFIG.supportedLanguages.map(lang => lang.code);
    }
    
    getSupportedLanguages() {
        return MULTILINGUAL_CONFIG.supportedLanguages.map(lang => ({
            "@type": "Language",
            "name": lang.name,
            "alternateName": lang.nativeName
        }));
    }
    
    getAlternateName() {
        return "Zynstro - AI Business Name Generator";
    }
    
    getAddressByLanguage() {
        // Return localized addresses for different regions
        const addresses = {
            'en-US': {
                "@type": "PostalAddress",
                "addressLocality": "San Francisco",
                "addressRegion": "CA",
                "postalCode": "94102",
                "streetAddress": "123 Startup Ave",
                "addressCountry": "US"
            },
            'en-GB': {
                "@type": "PostalAddress",
                "addressLocality": "London",
                "postalCode": "SW1A 1AA",
                "streetAddress": "123 Business Street",
                "addressCountry": "GB"
            },
            'de-DE': {
                "@type": "PostalAddress",
                "addressLocality": "Berlin",
                "postalCode": "10117",
                "streetAddress": "Businessstraße 123",
                "addressCountry": "DE"
            }
        };
        
        return addresses[this.languageCode] || addresses['en-US'];
    }
    
    getGeoCoordinates() {
        // Return coordinates based on language/region
        return {
            "@type": "GeoCoordinates",
            "latitude": "37.7749",
            "longitude": "-122.4194"
        };
    }
    
    getOpeningHours() {
        return {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
        };
    }
    
    getPaymentMethods() {
        const methods = {
            'en': 'Credit Card, PayPal, Stripe',
            'es': 'Tarjeta de Crédito, PayPal, Stripe',
            'fr': 'Carte de Crédit, PayPal, Stripe',
            'de': 'Kreditkarte, PayPal, Stripe'
        };
        
        const baseLang = this.languageCode.split('-')[0];
        return methods[this.languageCode] || methods[baseLang] || methods['en'];
    }
    
    getAcceptedCurrencies() {
        return ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
    }
    
    getPriceRange() {
        return "$$";
    }
    
    getLocalPhone() {
        // Return localized phone numbers
        const phones = {
            'en-US': '+1-XXX-XXX-XXXX',
            'en-GB': '+44-XX-XXXX-XXXX',
            'de-DE': '+49-XXX-XXXXXXX',
            'fr-FR': '+33-X-XX-XX-XX-XX'
        };
        
        return phones[this.languageCode] || phones['en-US'];
    }
    
    // =====================================================
    // INJECTION METHODS
    // =====================================================
    
    injectSchema(schemaObject) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schemaObject, null, 2);
        document.head.appendChild(script);
    }
    
    injectAllSchemas(pageType = 'home', pageData = {}) {
        // Remove existing schema
        document.querySelectorAll('script[type="application/ld+json"]').forEach(script => script.remove());
        
        // Inject Organization schema (always)
        this.injectSchema(this.generateOrganizationSchema());
        
        // Inject WebSite schema (always)
        this.injectSchema(this.generateWebSiteSchema());
        
        // Inject page-specific schemas
        switch(pageType) {
            case 'home':
                this.injectSchema(this.generateServiceSchema());
                this.injectSchema(this.generateLocalBusinessSchema());
                break;
                
            case 'service':
                this.injectSchema(this.generateServiceSchema());
                if (pageData.breadcrumbs) {
                    this.injectSchema(this.generateBreadcrumbSchema(pageData.breadcrumbs));
                }
                break;
                
            case 'faq':
                if (pageData.faqs) {
                    this.injectSchema(this.generateFAQSchema(pageData.faqs));
                }
                break;
                
            case 'article':
                if (pageData.article) {
                    this.injectSchema(this.generateArticleSchema(pageData.article));
                }
                break;
                
            case 'pricing':
                if (pageData.plans) {
                    pageData.plans.forEach(plan => {
                        this.injectSchema(this.generateProductSchema(plan));
                    });
                }
                break;
        }
        
        // Inject WebPage schema
        if (pageData.page) {
            this.injectSchema(this.generateWebPageSchema(pageData.page));
        }
    }
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const langManager = new LanguageManager();
    const schemaGenerator = new MultilingualSchemaGenerator(langManager.currentLanguage);
    
    // Inject schemas for current page
    schemaGenerator.injectAllSchemas('home');
});
