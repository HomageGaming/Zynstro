# 🔧 .htaccess Implementation Guide for Zynstro

## 📋 **OVERVIEW**

This guide explains how to use the `.htaccess` file for your Zynstro multilingual website, covering geo-redirection, international SEO, and performance optimization.

---

## 📦 **WHAT'S INCLUDED**

The `.htaccess` file includes **24 major configuration sections**:

1. ✅ Server Configuration
2. ✅ Security Headers
3. ✅ WWW vs Non-WWW Redirect
4. ✅ Language Detection & Geo-Redirection
5. ✅ Browser Language Detection
6. ✅ Language-Specific URL Rewriting (37 languages)
7. ✅ Canonical URL Enforcement
8. ✅ Content-Type & Compression
9. ✅ Browser Caching
10. ✅ Sitemap Configuration
11. ✅ Robots.txt Configuration
12. ✅ Error Pages (Multilingual)
13. ✅ Directory Listing Protection
14. ✅ Sensitive Files Protection
15. ✅ CORS Headers
16. ✅ Trailing Slash Normalization
17. ✅ Language-Specific Redirects
18. ✅ Search Engine Optimization
19. ✅ Performance Optimization
20. ✅ Deprecated Page Redirects
21. ✅ Rate Limiting
22. ✅ Language Cookie Persistence
23. ✅ Geo-Specific Redirects (Optional)
24. ✅ Mobile Detection (Optional)

---

## 🚀 **QUICK START**

### **Step 1: Upload .htaccess**

Upload the `.htaccess` file to your website's **root directory**:

```
/
├── .htaccess          ← Upload here
├── index.html
├── robots.txt
├── sitemap.xml
└── ...
```

### **Step 2: Verify Apache Modules**

Ensure these Apache modules are enabled on your server:

**Required Modules**:
```bash
mod_rewrite    # URL rewriting
mod_headers    # HTTP headers
mod_deflate    # GZIP compression
mod_expires    # Browser caching
mod_mime       # MIME types
```

**Optional Modules**:
```bash
mod_geoip      # Geo-location (for country detection)
mod_evasive    # Rate limiting
mod_http2      # HTTP/2 support
```

### **Step 3: Test Configuration**

Check for syntax errors:

```bash
# On server via SSH
apachectl configtest

# Or
httpd -t
```

### **Step 4: Enable Modules (if needed)**

```bash
# Ubuntu/Debian
sudo a2enmod rewrite headers deflate expires mime
sudo systemctl restart apache2

# CentOS/RHEL
# Edit /etc/httpd/conf/httpd.conf
# Uncomment LoadModule lines
sudo systemctl restart httpd
```

---

## 🌍 **GEO-REDIRECTION STRATEGY**

### **⚠️ IMPORTANT: Google's Recommendations**

Google **DOES NOT** recommend automatic IP-based redirects because:
- ❌ Search engine crawlers get blocked
- ❌ Users can't override their location
- ❌ Can hurt international SEO rankings

### **✅ RECOMMENDED APPROACH (Implemented)**

**Suggestion-Based Redirection**:

1. **Detect** user's country via GeoIP
2. **Pass** country code to JavaScript
3. **Show** language suggestion banner
4. **Allow** user to accept or dismiss

**Implementation**:

```apache
# In .htaccess (already included)
<IfModule mod_geoip.c>
    GeoIPEnable On
    Header set X-User-Country "%{GEOIP_COUNTRY_CODE}e"
</IfModule>
```

**JavaScript reads this header**:

```javascript
// Already in your JavaScript
async function setupGeoTargeting() {
    const geoData = await GeoTargeting.detectUserCountry();
    
    // Show suggestion banner (don't auto-redirect)
    if (geoData.country !== currentLanguageCountry) {
        showLanguageSuggestionBanner(suggestedLanguage);
    }
}
```

---

## 📍 **URL REWRITING RULES**

### **How Language URLs Work**

All language URLs are rewritten to `index.html` with a language parameter:

**Examples**:

```
User visits:         Apache rewrites to:
/es/                → /index.html?lang=es
/es-mx/             → /index.html?lang=es-MX
/fr/about           → /index.html?lang=fr&page=about
/de-de/pricing      → /index.html?lang=de-DE&page=pricing
/ur-pk/             → /index.html?lang=ur-PK
```

### **Supported Language Codes**

**37 Language Variants** are configured:

```apache
# English: en, en-us, en-gb, en-au, en-ca
# Spanish: es, es-es, es-mx, es-ar
# French: fr, fr-fr, fr-ca
# German: de, de-de, de-at
# Portuguese: pt, pt-br, pt-pt
# Italian: it, it-it
# Arabic: ar, ar-sa, ar-ae
# Chinese: zh, zh-cn, zh-tw
# Japanese: ja, ja-jp
# Korean: ko, ko-kr
# Dutch: nl, nl-nl
# Russian: ru, ru-ru
# Hindi: hi, hi-in
# Urdu: ur, ur-pk
```

---

## 🔒 **SECURITY FEATURES**

### **1. Security Headers**

**Implemented**:
```apache
X-Frame-Options: SAMEORIGIN           # Prevent clickjacking
X-XSS-Protection: 1; mode=block       # XSS protection
X-Content-Type-Options: nosniff       # Prevent MIME sniffing
Referrer-Policy: strict-origin        # Privacy
```

### **2. File Protection**

**Protected Files**:
```apache
- .htaccess
- .htpasswd
- .env
- .git files
- package.json
- composer.json
- Hidden files (.*) except .well-known
```

### **3. Directory Listing**

**Disabled**:
```apache
Options -Indexes
```

---

## ⚡ **PERFORMANCE OPTIMIZATION**

### **1. GZIP Compression**

**Compresses**:
- HTML, CSS, JavaScript
- XML, JSON
- SVG images

**Result**: 60-80% file size reduction

### **2. Browser Caching**

**Cache Duration**:
```
HTML:        1 hour    (frequent updates)
CSS/JS:      1 week
Images:      1 month
Fonts:       1 year
Sitemaps:    1 day
```

### **3. Content-Type Headers**

Proper MIME types for:
- HTML, CSS, JavaScript
- Images (WebP, SVG)
- Fonts (WOFF2, WOFF)
- XML sitemaps
- JSON files

---

## 🗺️ **SITEMAP CONFIGURATION**

### **Automatic Headers**

All sitemap files get proper headers:

```apache
Content-Type: application/xml; charset=utf-8
X-Robots-Tag: noindex, follow
Cache-Control: max-age=86400
```

**This applies to**:
```
sitemap.xml
sitemap-main.xml
sitemap-en.xml
sitemap-es.xml
... (all 40+ sitemaps)
```

---

## 🌐 **CANONICAL URL RULES**

### **1. Lowercase URLs**

**Enforced**: All URLs are lowercase

```
/ES/About  → redirects to → /es/about
/FR/PRICING → redirects to → /fr/pricing
```

### **2. Trailing Slash**

**Removed** from non-directory URLs:

```
/es/about/  → redirects to → /es/about
/pricing/   → redirects to → /pricing
```

### **3. WWW Handling**

**Choose one** (uncomment in .htaccess):

```apache
# Option A: Redirect www to non-www
www.zynstro.com → zynstro.com

# Option B: Redirect non-www to www
zynstro.com → www.zynstro.com
```

---

## 🔄 **CUSTOM REDIRECTS**

### **Example: Old URLs to New**

Add these rules to section 20:

```apache
# Redirect old about page to English version
Redirect 301 /about.html /en/about

# Redirect Spanish contact page
Redirect 301 /contacto.html /es/contact

# Redirect old blog to new URL structure
RedirectMatch 301 ^/blog/(.*)$ /en/blog/$1
```

### **Bulk Redirects**

```apache
# Redirect all old product pages to Spanish
RedirectMatch 301 ^/productos/(.*)$ /es/products/$1

# Redirect all old news to English blog
RedirectMatch 301 ^/news/(.*)$ /en/blog/$1
```

---

## 🚨 **ERROR PAGES**

### **Custom Error Pages**

Create these files in your root:

```
404.html  (Page Not Found)
403.html  (Forbidden)
500.html  (Server Error)
```

### **Multilingual Error Pages**

**Option 1: Language-Specific Errors**

```apache
# In .htaccess
RewriteCond %{REQUEST_URI} ^/es/
ErrorDocument 404 /es/404.html

RewriteCond %{REQUEST_URI} ^/fr/
ErrorDocument 404 /fr/404.html
```

**Option 2: JavaScript Detection**

Use one 404.html that detects language:

```html
<!-- 404.html -->
<script>
const langManager = new LanguageManager();
const lang = langManager.currentLanguage;

// Show error message in detected language
document.getElementById('error-message').textContent = 
    translations[lang].error404;
</script>
```

---

## 🌍 **GEOIP CONFIGURATION**

### **Option 1: Apache mod_geoip**

**Install**:
```bash
# Ubuntu/Debian
sudo apt-get install libapache2-mod-geoip

# Download GeoIP database
sudo mkdir -p /usr/share/GeoIP
cd /usr/share/GeoIP
sudo wget http://geolite.maxmind.com/download/geoip/database/GeoLiteCountry/GeoIP.dat.gz
sudo gunzip GeoIP.dat.gz

# Enable module
sudo a2enmod geoip
sudo systemctl restart apache2
```

**Already configured in .htaccess**:
```apache
<IfModule mod_geoip.c>
    GeoIPEnable On
    GeoIPDBFile /usr/share/GeoIP/GeoIP.dat
    Header set X-User-Country "%{GEOIP_COUNTRY_CODE}e"
</IfModule>
```

### **Option 2: CloudFlare (Recommended)**

If using CloudFlare CDN:

```apache
# CloudFlare provides country code in header
Header set X-User-Country "%{HTTP:CF-IPCountry}e"
```

**No server-side GeoIP needed!**

### **Option 3: JavaScript API**

Use browser-based detection (already implemented):

```javascript
// In your JavaScript
const response = await fetch('https://ipapi.co/json/');
const data = await response.json();
console.log('Country:', data.country_code);
```

---

## ⚡ **PERFORMANCE TIPS**

### **1. Enable HTTP/2**

Uncomment in .htaccess:

```apache
<IfModule mod_http2.c>
    H2Push on
</IfModule>
```

### **2. Use CDN**

Configure CloudFlare or similar:
- GZIP compression
- Browser caching
- Global distribution
- DDoS protection

### **3. Optimize Images**

```apache
# Add to .htaccess
<IfModule mod_headers.c>
    # Serve WebP images when supported
    RewriteCond %{HTTP_ACCEPT} image/webp
    RewriteCond %{DOCUMENT_ROOT}/$1.webp -f
    RewriteRule (.+)\.(jpe?g|png)$ $1.webp [T=image/webp,E=accept:1]
</IfModule>
```

---

## 🧪 **TESTING**

### **1. Test URL Rewriting**

Visit these URLs and verify they work:

```
https://zynstro.com/es/
https://zynstro.com/fr-ca/
https://zynstro.com/de-de/
https://zynstro.com/ur-pk/
```

### **2. Test Headers**

```bash
# Check security headers
curl -I https://zynstro.com/

# Check compression
curl -I -H "Accept-Encoding: gzip" https://zynstro.com/

# Check country detection
curl -I https://zynstro.com/ | grep X-User-Country
```

### **3. Test Caching**

```bash
# Check cache headers
curl -I https://zynstro.com/style.css
# Should show: Cache-Control: max-age=604800
```

### **4. Validate .htaccess**

```bash
# Online validator
https://htaccess.madewithlove.be/

# Or on server
apachectl configtest
```

---

## 🔍 **TROUBLESHOOTING**

### **500 Internal Server Error**

**Cause**: Syntax error in .htaccess

**Fix**:
1. Check Apache error log: `/var/log/apache2/error.log`
2. Test syntax: `apachectl configtest`
3. Disable sections one by one to find error

### **404 on Language URLs**

**Cause**: mod_rewrite not enabled

**Fix**:
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### **Redirects Not Working**

**Cause**: AllowOverride not set

**Fix**: Edit Apache config `/etc/apache2/sites-available/000-default.conf`:

```apache
<Directory /var/www/html>
    AllowOverride All
</Directory>
```

### **GeoIP Not Working**

**Cause**: Module not installed

**Fix**:
```bash
# Install and configure (see GeoIP section above)
sudo apt-get install libapache2-mod-geoip
```

---

## 📊 **MONITORING**

### **Check Access Logs**

```bash
# View recent requests
tail -f /var/log/apache2/access.log

# Filter by language
grep "/es/" /var/log/apache2/access.log
```

### **Monitor Redirects**

```bash
# Check 301 redirects
grep " 301 " /var/log/apache2/access.log

# Check 404 errors
grep " 404 " /var/log/apache2/access.log
```

---

## ✅ **CHECKLIST**

Before going live:

- [ ] .htaccess uploaded to root directory
- [ ] Apache modules enabled (rewrite, headers, deflate)
- [ ] Syntax tested: `apachectl configtest`
- [ ] Security headers verified
- [ ] GZIP compression working
- [ ] Browser caching configured
- [ ] Language URLs tested
- [ ] Error pages created
- [ ] Sitemaps accessible
- [ ] robots.txt working
- [ ] GeoIP configured (optional)
- [ ] SSL certificate installed
- [ ] WWW redirect configured
- [ ] Custom redirects added

---

## 🎯 **BEST PRACTICES**

### **DO**:
✅ Use 302 (temporary) for geo-redirects  
✅ Allow users to override language  
✅ Pass country to JavaScript  
✅ Show suggestion banners  
✅ Cache static assets aggressively  
✅ Use HTTPS everywhere  
✅ Monitor error logs  

### **DON'T**:
❌ Use 301 for geo-redirects  
❌ Auto-redirect without user consent  
❌ Block search engine crawlers  
❌ Ignore security headers  
❌ Forget to test configuration  
❌ Cache HTML files  

---

## 📚 **ADDITIONAL RESOURCES**

**Apache Documentation**:
- mod_rewrite: https://httpd.apache.org/docs/current/mod/mod_rewrite.html
- mod_headers: https://httpd.apache.org/docs/current/mod/mod_headers.html

**SEO Guidelines**:
- Google International SEO: https://developers.google.com/search/docs/specialty/international
- Hreflang Guidelines: https://support.google.com/webmasters/answer/189077

**Tools**:
- .htaccess Tester: https://htaccess.madewithlove.be/
- Header Checker: https://www.seobility.net/en/headercheck/

---

## 🎉 **YOU'RE READY!**

Your `.htaccess` file is configured with:

✅ **37 language routes**  
✅ **SEO-friendly redirects**  
✅ **Security headers**  
✅ **Performance optimization**  
✅ **GeoIP support**  
✅ **Caching rules**  
✅ **GZIP compression**  

Upload it to your server and start serving international traffic! 🚀🌍
