/**
 * ZYNSTRO - INTERNATIONAL SITEMAP GENERATOR
 * Creates XML sitemaps with hreflang annotations for multilingual SEO
 */

class InternationalSitemapGenerator {
    constructor() {
        this.baseUrl = URL_STRUCTURE.baseUrl;
        this.languages = MULTILINGUAL_CONFIG.supportedLanguages;
        this.pages = this.definePages();
    }
    
    // =====================================================
    // 1. DEFINE ALL PAGES
    // =====================================================
    
    definePages() {
        return [
            {
                path: '/',
                priority: 1.0,
                changefreq: 'daily',
                translatable: true
            },
            {
                path: '/about',
                priority: 0.8,
                changefreq: 'monthly',
                translatable: true
            },
            {
                path: '/pricing',
                priority: 0.9,
                changefreq: 'weekly',
                translatable: true
            },
            {
                path: '/features',
                priority: 0.8,
                changefreq: 'weekly',
                translatable: true
            },
            {
                path: '/faq',
                priority: 0.7,
                changefreq: 'monthly',
                translatable: true
            },
            {
                path: '/contact',
                priority: 0.6,
                changefreq: 'monthly',
                translatable: true
            },
            {
                path: '/blog',
                priority: 0.7,
                changefreq: 'daily',
                translatable: true
            },
            {
                path: '/privacy',
                priority: 0.5,
                changefreq: 'yearly',
                translatable: true
            },
            {
                path: '/terms',
                priority: 0.5,
                changefreq: 'yearly',
                translatable: true
            }
        ];
    }
    
    // =====================================================
    // 2. GENERATE SITEMAP INDEX
    // =====================================================
    
    generateSitemapIndex() {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        
        // Main sitemap with all languages
        xml += '  <sitemap>\n';
        xml += `    <loc>${this.baseUrl}/sitemap-main.xml</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
        xml += '  </sitemap>\n';
        
        // Language-specific sitemaps
        this.languages.forEach(lang => {
            xml += '  <sitemap>\n';
            xml += `    <loc>${this.baseUrl}/sitemap-${lang.code}.xml</loc>\n`;
            xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
            xml += '  </sitemap>\n';
        });
        
        // Image sitemap
        xml += '  <sitemap>\n';
        xml += `    <loc>${this.baseUrl}/sitemap-images.xml</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
        xml += '  </sitemap>\n';
        
        xml += '</sitemapindex>';
        
        return xml;
    }
    
    // =====================================================
    // 3. GENERATE MAIN SITEMAP WITH HREFLANG
    // =====================================================
    
    generateMainSitemap() {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
        xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
        
        this.pages.forEach(page => {
            if (!page.translatable) {
                // Non-translatable pages (English only)
                xml += this.generateUrlEntry(page, 'en');
            } else {
                // Translatable pages with hreflang annotations
                this.languages.forEach(lang => {
                    xml += this.generateUrlEntryWithHreflang(page, lang.code);
                });
            }
        });
        
        xml += '</urlset>';
        
        return xml;
    }
    
    // =====================================================
    // 4. GENERATE LANGUAGE-SPECIFIC SITEMAPS
    // =====================================================
    
    generateLanguageSitemap(langCode) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
        xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
        
        this.pages.forEach(page => {
            xml += this.generateUrlEntryWithHreflang(page, langCode);
        });
        
        xml += '</urlset>';
        
        return xml;
    }
    
    // =====================================================
    // 5. GENERATE URL ENTRY WITH HREFLANG
    // =====================================================
    
    generateUrlEntryWithHreflang(page, langCode) {
        const url = URL_STRUCTURE.getCurrentUrl(langCode, page.path);
        const lastmod = new Date().toISOString().split('T')[0];
        
        let xml = '  <url>\n';
        xml += `    <loc>${this.escapeXml(url)}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        
        // Add hreflang annotations
        if (page.translatable) {
            // x-default
            const defaultUrl = URL_STRUCTURE.getCurrentUrl('en', page.path);
            xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${this.escapeXml(defaultUrl)}" />\n`;
            
            // All language versions
            this.languages.forEach(lang => {
                const altUrl = URL_STRUCTURE.getCurrentUrl(lang.code, page.path);
                xml += `    <xhtml:link rel="alternate" hreflang="${lang.code}" href="${this.escapeXml(altUrl)}" />\n`;
            });
        }
        
        xml += '  </url>\n';
        
        return xml;
    }
    
    // =====================================================
    // 6. GENERATE SIMPLE URL ENTRY
    // =====================================================
    
    generateUrlEntry(page, langCode) {
        const url = URL_STRUCTURE.getCurrentUrl(langCode, page.path);
        const lastmod = new Date().toISOString().split('T')[0];
        
        let xml = '  <url>\n';
        xml += `    <loc>${this.escapeXml(url)}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += '  </url>\n';
        
        return xml;
    }
    
    // =====================================================
    // 7. GENERATE IMAGE SITEMAP
    // =====================================================
    
    generateImageSitemap() {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
        xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
        
        // Homepage images
        xml += '  <url>\n';
        xml += `    <loc>${this.baseUrl}/</loc>\n`;
        xml += '    <image:image>\n';
        xml += `      <image:loc>${this.baseUrl}/assets/logo.png</image:loc>\n`;
        xml += '      <image:title>Zynstro Logo</image:title>\n';
        xml += '      <image:caption>AI-Powered Business Name Generator</image:caption>\n';
        xml += '    </image:image>\n';
        xml += '    <image:image>\n';
        xml += `      <image:loc>${this.baseUrl}/assets/hero-image.png</image:loc>\n`;
        xml += '      <image:title>Business Name Generation</image:title>\n';
        xml += '    </image:image>\n';
        xml += '  </url>\n';
        
        xml += '</urlset>';
        
        return xml;
    }
    
    // =====================================================
    // 8. UTILITY METHODS
    // =====================================================
    
    escapeXml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }
    
    // =====================================================
    // 9. DOWNLOAD SITEMAPS
    // =====================================================
    
    downloadSitemap(content, filename) {
        const blob = new Blob([content], { type: 'application/xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
    
    downloadAllSitemaps() {
        // Download sitemap index
        this.downloadSitemap(this.generateSitemapIndex(), 'sitemap.xml');
        
        // Download main sitemap
        setTimeout(() => {
            this.downloadSitemap(this.generateMainSitemap(), 'sitemap-main.xml');
        }, 100);
        
        // Download language-specific sitemaps
        this.languages.forEach((lang, index) => {
            setTimeout(() => {
                this.downloadSitemap(
                    this.generateLanguageSitemap(lang.code),
                    `sitemap-${lang.code}.xml`
                );
            }, 200 + (index * 100));
        });
        
        // Download image sitemap
        setTimeout(() => {
            this.downloadSitemap(this.generateImageSitemap(), 'sitemap-images.xml');
        }, 300 + (this.languages.length * 100));
    }
    
    // =====================================================
    // 10. DISPLAY SITEMAP IN CONSOLE
    // =====================================================
    
    logAllSitemaps() {
        console.log('=== SITEMAP INDEX ===');
        console.log(this.generateSitemapIndex());
        
        console.log('\n=== MAIN SITEMAP ===');
        console.log(this.generateMainSitemap());
        
        console.log('\n=== ENGLISH SITEMAP ===');
        console.log(this.generateLanguageSitemap('en'));
        
        console.log('\n=== IMAGE SITEMAP ===');
        console.log(this.generateImageSitemap());
    }
}

// =====================================================
// ROBOTS.TXT GENERATOR
// =====================================================

class RobotsTxtGenerator {
    constructor() {
        this.baseUrl = URL_STRUCTURE.baseUrl;
    }
    
    generate() {
        let txt = '# Zynstro - Robots.txt for International SEO\n\n';
        
        // User-agent rules
        txt += 'User-agent: *\n';
        txt += 'Allow: /\n';
        txt += 'Disallow: /admin/\n';
        txt += 'Disallow: /api/\n';
        txt += 'Disallow: /private/\n';
        txt += 'Disallow: /*.json$\n';
        txt += '\n';
        
        // Crawl-delay
        txt += 'Crawl-delay: 1\n';
        txt += '\n';
        
        // Sitemap references
        txt += '# Sitemaps\n';
        txt += `Sitemap: ${this.baseUrl}/sitemap.xml\n`;
        txt += `Sitemap: ${this.baseUrl}/sitemap-main.xml\n`;
        
        // Language-specific sitemaps
        MULTILINGUAL_CONFIG.supportedLanguages.forEach(lang => {
            txt += `Sitemap: ${this.baseUrl}/sitemap-${lang.code}.xml\n`;
        });
        
        txt += `Sitemap: ${this.baseUrl}/sitemap-images.xml\n`;
        txt += '\n';
        
        // Googlebot specific
        txt += 'User-agent: Googlebot\n';
        txt += 'Allow: /\n';
        txt += 'Disallow: /admin/\n';
        txt += '\n';
        
        // Bingbot specific
        txt += 'User-agent: Bingbot\n';
        txt += 'Allow: /\n';
        txt += 'Disallow: /admin/\n';
        
        return txt;
    }
    
    download() {
        const content = this.generate();
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'robots.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}

// Export functions
if (typeof window !== 'undefined') {
    window.InternationalSitemapGenerator = InternationalSitemapGenerator;
    window.RobotsTxtGenerator = RobotsTxtGenerator;
}

// Console helper functions
window.generateAndDownloadSitemaps = function() {
    const generator = new InternationalSitemapGenerator();
    generator.downloadAllSitemaps();
    console.log('✅ Sitemaps generated and downloaded!');
};

window.generateAndDownloadRobotsTxt = function() {
    const generator = new RobotsTxtGenerator();
    generator.download();
    console.log('✅ robots.txt generated and downloaded!');
};
