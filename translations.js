/**
 * ZYNSTRO - MULTILINGUAL CONTENT TRANSLATIONS
 * Complete translation database for all supported languages
 */

const TRANSLATIONS = {
    // Meta Information
    meta: {
        title: {
            'en': 'Zynstro - AI Business Name Generator | Find Perfect Brand Names',
            'es': 'Zynstro - Generador de Nombres Comerciales con IA | Encuentra Nombres de Marca Perfectos',
            'fr': 'Zynstro - Générateur de Noms d\'Entreprise IA | Trouvez des Noms de Marque Parfaits',
            'de': 'Zynstro - KI Business-Namensgenerator | Finden Sie perfekte Markennamen',
            'pt': 'Zynstro - Gerador de Nomes Comerciais com IA | Encontre Nomes de Marca Perfeitos',
            'it': 'Zynstro - Generatore di Nomi Aziendali IA | Trova Nomi di Brand Perfetti',
            'ar': 'Zynstro - مولد أسماء الأعمال بالذكاء الاصطناعي | ابحث عن أسماء العلامات التجارية المثالية',
            'zh': 'Zynstro - AI商业名称生成器 | 找到完美的品牌名称',
            'ja': 'Zynstro - AIビジネスネームジェネレーター | 完璧なブランド名を見つけよう',
            'ko': 'Zynstro - AI 비즈니스 이름 생성기 | 완벽한 브랜드 이름 찾기',
            'ur': 'Zynstro - AI کاروباری نام جنریٹر | بہترین برانڈ نام تلاش کریں'
        },
        description: {
            'en': 'Generate unique business names with AI. Check domain availability, assess trademark risks, and get branding suggestions instantly.',
            'es': 'Genere nombres comerciales únicos con IA. Verifique la disponibilidad del dominio, evalúe riesgos de marca y obtenga sugerencias de branding al instante.',
            'fr': 'Générez des noms d\'entreprise uniques avec l\'IA. Vérifiez la disponibilité du domaine, évaluez les risques de marque et obtenez des suggestions de branding instantanément.',
            'de': 'Generieren Sie einzigartige Firmennamen mit KI. Überprüfen Sie die Domain-Verfügbarkeit, bewerten Sie Markenrisiken und erhalten Sie sofort Branding-Vorschläge.',
            'pt': 'Gere nomes comerciais únicos com IA. Verifique a disponibilidade de domínio, avalie riscos de marca e obtenha sugestões de branding instantaneamente.',
            'it': 'Genera nomi aziendali unici con l\'IA. Verifica la disponibilità del dominio, valuta i rischi di marchio e ottieni suggerimenti di branding istantaneamente.',
            'ur': 'مصنوعی ذہانت کے ساتھ منفرد کاروباری نام بنائیں۔ ڈومین کی دستیابی کی جانچ کریں، ٹریڈ مارک خطرات کا جائزہ لیں، اور فوری برانڈنگ تجاویز حاصل کریں۔'
        }
    },
    
    // Main headings
    headings: {
        mainTitle: {
            'en': '🚀 AI Business Name Generator',
            'es': '🚀 Generador de Nombres Comerciales con IA',
            'fr': '🚀 Générateur de Noms d\'Entreprise IA',
            'de': '🚀 KI-Business-Namensgenerator',
            'pt': '🚀 Gerador de Nomes Comerciais com IA',
            'ur': '🚀 AI کاروباری نام جنریٹر'
        },
        subtitle: {
            'en': 'Advanced multi-mode name generation with real-time analysis',
            'es': 'Generación de nombres multimodo avanzada con análisis en tiempo real',
            'fr': 'Génération de noms multi-modes avancée avec analyse en temps réel',
            'de': 'Erweiterte Multi-Modus-Namensgenerierung mit Echtzeit-Analyse',
            'ur': 'حقیقی وقت کے تجزیے کے ساتھ جدید ملٹی موڈ نام جنریشن'
        }
    },
    
    // Button labels
    buttons: {
        signIn: {'en': 'Sign In', 'es': 'Iniciar Sesión', 'fr': 'Se Connecter', 'de': 'Anmelden', 'ur': 'سائن ان'},
        signUp: {'en': 'Sign Up', 'es': 'Registrarse', 'fr': 'S\'inscrire', 'de': 'Registrieren', 'ur': 'سائن اپ'},
        generateNames: {'en': 'Generate Names ✨', 'es': 'Generar Nombres ✨', 'fr': 'Générer des Noms ✨', 'ur': 'نام بنائیں ✨'},
        startOver: {'en': '🔄 Generate New Names', 'es': '🔄 Generar Nuevos Nombres', 'ur': '🔄 نئے نام بنائیں'}
    }
};

class ContentTranslator {
    constructor(languageCode = 'en') {
        this.currentLanguage = languageCode;
    }
    
    translate(key, category = 'meta') {
        const translation = TRANSLATIONS[category]?.[key]?.[this.currentLanguage];
        return translation || TRANSLATIONS[category]?.[key]?.['en'] || key;
    }
    
    setLanguage(langCode) {
        this.currentLanguage = langCode;
    }
}
