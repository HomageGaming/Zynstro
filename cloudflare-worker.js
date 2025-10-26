/**
 * CLOUDFLARE WORKER - MULTILINGUAL LANGUAGE ROUTING
 * 
 * Advanced language detection and routing for Zynstro
 * Supports 37 language variants with intelligent fallback
 * 
 * Deploy to: CloudFlare Workers
 * Route: zynstro.com/*
 */

// ================================================================
// CONFIGURATION
// ================================================================

const CONFIG = {
    // Base domain
    domain: 'zynstro.com',
    
    // Default language if nothing matches
    defaultLanguage: 'en',
    
    // Cookie name for language preference
    cookieName: 'lang_pref',
    
    // Cookie duration (days)
    cookieDuration: 365,
    
    // Show suggestion banner for first-time visitors
    showSuggestionBanner: true,
    
    // Supported languages
    languages: [
        'en', 'en-us', 'en-gb', 'en-au', 'en-ca',
        'es', 'es-es', 'es-mx', 'es-ar',
        'fr', 'fr-fr', 'fr-ca',
        'de', 'de-de', 'de-at',
        'pt', 'pt-br', 'pt-pt',
        'it', 'it-it',
        'ar', 'ar-sa', 'ar-ae',
        'zh', 'zh-cn', 'zh-tw',
        'ja', 'ja-jp',
        'ko', 'ko-kr',
        'nl', 'nl-nl',
        'ru', 'ru-ru',
        'hi', 'hi-in',
        'ur', 'ur-pk'
    ],
    
    // Country to language mapping
    countryToLanguage: {
        'US': 'en-us', 'GB': 'en-gb', 'AU': 'en-au', 'CA': 'en-ca',
        'ES': 'es-es', 'MX': 'es-mx', 'AR': 'es-ar',
        'FR': 'fr-fr',
        'DE': 'de-de', 'AT': 'de-at',
        'BR': 'pt-br', 'PT': 'pt-pt',
        'IT': 'it-it',
        'SA': 'ar-sa', 'AE': 'ar-ae',
        'CN': 'zh-cn', 'TW': 'zh-tw',
        'JP': 'ja-jp',
        'KR': 'ko-kr',
        'NL': 'nl-nl',
        'RU': 'ru-ru',
        'IN': 'hi-in',
        'PK': 'ur-pk'
    }
};

// ================================================================
// MAIN HANDLER
// ================================================================

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    
    // Skip processing for static assets
    if (isStaticAsset(url.pathname)) {
        return fetch(request);
    }
    
    // Skip processing for API endpoints
    if (url.pathname.startsWith('/api/')) {
        return fetch(request);
    }
    
    // Detect visitor's language preference
    const detectedLang = detectLanguage(request);
    
    // Get current URL language (if in language path)
    const currentLang = extractLanguageFromPath(url.pathname);
    
    // Fetch the origin response
    let response = await fetch(request);
    
    // Clone response so we can modify headers
    response = new Response(response.body, response);
    
    // Add language detection headers
    response.headers.set('X-Detected-Language', detectedLang);
    response.headers.set('X-Current-Language', currentLang || 'none');
    response.headers.set('X-Visitor-Country', request.cf?.country || 'unknown');
    
    // If no language in URL and no preference, suggest language
    if (!currentLang && CONFIG.showSuggestionBanner) {
        const suggestedLang = getSuggestedLanguage(request);
        if (suggestedLang && suggestedLang !== CONFIG.defaultLanguage) {
            response.headers.set('X-Suggested-Language', suggestedLang);
        }
    }
    
    // Set cache headers based on content type
    setCacheHeaders(response, url.pathname);
    
    return response;
}

// ================================================================
// LANGUAGE DETECTION
// ================================================================

/**
 * Detect visitor's preferred language
 * Priority: Cookie > URL Path > GeoIP > Browser > Default
 */
function detectLanguage(request) {
    // 1. Check cookie preference
    const cookieLang = getCookie(request, CONFIG.cookieName);
    if (cookieLang && CONFIG.languages.includes(cookieLang.toLowerCase())) {
        return cookieLang.toLowerCase();
    }
    
    // 2. Check URL path
    const url = new URL(request.url);
    const pathLang = extractLanguageFromPath(url.pathname);
    if (pathLang) {
        return pathLang;
    }
    
    // 3. Check GeoIP (CloudFlare provides this)
    const country = request.cf?.country;
    if (country && CONFIG.countryToLanguage[country]) {
        return CONFIG.countryToLanguage[country];
    }
    
    // 4. Check Accept-Language header
    const acceptLang = request.headers.get('Accept-Language');
    if (acceptLang) {
        const browserLang = parseBrowserLanguage(acceptLang);
        if (browserLang) {
            return browserLang;
        }
    }
    
    // 5. Default fallback
    return CONFIG.defaultLanguage;
}

/**
 * Get suggested language for banner
 */
function getSuggestedLanguage(request) {
    const country = request.cf?.country;
    if (country && CONFIG.countryToLanguage[country]) {
        return CONFIG.countryToLanguage[country];
    }
    return null;
}

/**
 * Extract language code from URL path
 * /es/about -> es
 * /en-us/pricing -> en-us
 */
function extractLanguageFromPath(pathname) {
    const match = pathname.match(/^\/([a-z]{2}(?:-[a-z]{2})?)\//i);
    if (match) {
        const lang = match[1].toLowerCase();
        if (CONFIG.languages.includes(lang)) {
            return lang;
        }
    }
    return null;
}

/**
 * Parse browser's Accept-Language header
 */
function parseBrowserLanguage(acceptLanguage) {
    // Parse: "en-US,en;q=0.9,es;q=0.8"
    const languages = acceptLanguage
        .split(',')
        .map(lang => {
            const [code, q] = lang.trim().split(';q=');
            return {
                code: code.toLowerCase(),
                quality: q ? parseFloat(q) : 1.0
            };
        })
        .sort((a, b) => b.quality - a.quality);
    
    // Find first supported language
    for (const lang of languages) {
        // Try exact match (e.g., en-us)
        if (CONFIG.languages.includes(lang.code)) {
            return lang.code;
        }
        
        // Try base language (en-us -> en)
        const baseLang = lang.code.split('-')[0];
        if (CONFIG.languages.includes(baseLang)) {
            return baseLang;
        }
    }
    
    return null;
}

// ================================================================
// UTILITIES
// ================================================================

/**
 * Get cookie value
 */
function getCookie(request, name) {
    const cookieString = request.headers.get('Cookie');
    if (!cookieString) return null;
    
    const cookies = cookieString.split(';');
    for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

/**
 * Check if path is static asset
 */
function isStaticAsset(pathname) {
    const staticExtensions = [
        '.css', '.js', '.json',
        '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico',
        '.woff', '.woff2', '.ttf', '.eot', '.otf',
        '.mp4', '.webm', '.mp3',
        '.pdf', '.zip'
    ];
    
    return staticExtensions.some(ext => pathname.toLowerCase().endsWith(ext));
}

/**
 * Set appropriate cache headers
 */
function setCacheHeaders(response, pathname) {
    // Don't cache HTML pages (dynamic language content)
    if (pathname.endsWith('.html') || !pathname.includes('.')) {
        response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
        response.headers.set('Vary', 'Accept-Language, Cookie');
    }
    
    // Cache static assets aggressively
    if (isStaticAsset(pathname)) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
    
    // Cache sitemaps for 1 day
    if (pathname.includes('sitemap') && pathname.endsWith('.xml')) {
        response.headers.set('Cache-Control', 'public, max-age=86400');
    }
}

// ================================================================
// ADVANCED FEATURES (Optional)
// ================================================================

/**
 * A/B Testing for language suggestions
 */
function shouldShowSuggestion(request) {
    // Show to 50% of users (simple A/B test)
    const hash = simpleHash(request.cf?.colo || 'default');
    return hash % 2 === 0;
}

/**
 * Simple hash function for A/B testing
 */
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

/**
 * Log language analytics (optional)
 */
async function logLanguageAnalytics(request, detectedLang, country) {
    // Send to analytics endpoint
    const analyticsData = {
        timestamp: Date.now(),
        language: detectedLang,
        country: country,
        path: new URL(request.url).pathname,
        userAgent: request.headers.get('User-Agent')
    };
    
    // Example: Send to external analytics
    // await fetch('https://analytics.zynstro.com/track', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(analyticsData)
    // });
}

/**
 * Geo-redirect handler (use with caution!)
 * Google doesn't recommend automatic redirects
 */
function handleGeoRedirect(request, detectedLang) {
    const url = new URL(request.url);
    const currentLang = extractLanguageFromPath(url.pathname);
    
    // Only redirect if:
    // 1. No language in URL
    // 2. No cookie preference
    // 3. User hasn't dismissed suggestion
    const hasCookie = getCookie(request, CONFIG.cookieName);
    const hasDismissed = getCookie(request, 'lang_suggestion_dismissed');
    
    if (!currentLang && !hasCookie && !hasDismissed) {
        // Suggest, don't redirect
        // Return response with suggestion header instead
        return null; // No redirect
    }
    
    return null;
}

// ================================================================
// DEPLOYMENT INSTRUCTIONS
// ================================================================

/*

TO DEPLOY THIS WORKER:

1. Go to CloudFlare Dashboard
2. Navigate to: Workers & Pages
3. Create new Worker
4. Copy this entire file
5. Save and Deploy

CONFIGURE ROUTE:
1. Go to: Workers & Pages → Overview
2. Click on your worker
3. Add Route: zynstro.com/*
4. Save

TESTING:
1. Visit: https://zynstro.com/
2. Check response headers:
   - X-Detected-Language
   - X-Current-Language
   - X-Visitor-Country
   - X-Suggested-Language

MONITOR:
1. Dashboard → Workers & Pages → Your Worker
2. View Metrics:
   - Requests per second
   - CPU time
   - Success rate

NOTES:
- Worker runs on every request
- Adds ~0-5ms latency
- Free tier: 100,000 requests/day
- Paid tier: $5/month for 10M requests

*/
