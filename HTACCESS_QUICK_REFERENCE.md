# ⚡ .htaccess Quick Reference Card

## 🚀 **IMMEDIATE ACTIONS**

### **1. Upload & Test** (5 minutes)
```bash
# Upload .htaccess to root directory
# Test syntax
apachectl configtest

# Restart Apache
sudo systemctl restart apache2
```

### **2. Verify It's Working**
```bash
# Test URL rewriting
curl https://zynstro.com/es/

# Check headers
curl -I https://zynstro.com/
```

---

## 📍 **LANGUAGE URLS**

All 37 languages configured:

```
/en/        /en-us/     /en-gb/     /en-au/     /en-ca/
/es/        /es-es/     /es-mx/     /es-ar/
/fr/        /fr-fr/     /fr-ca/
/de/        /de-de/     /de-at/
/pt/        /pt-br/     /pt-pt/
/it/        /it-it/
/ar/        /ar-sa/     /ar-ae/
/zh/        /zh-cn/     /zh-tw/
/ja/        /ja-jp/
/ko/        /ko-kr/
/nl/        /nl-nl/
/ru/        /ru-ru/
/hi/        /hi-in/
/ur/        /ur-pk/
```

---

## 🔒 **SECURITY HEADERS**

Automatically applied to all pages:

```
✅ X-Frame-Options: SAMEORIGIN
✅ X-XSS-Protection: 1; mode=block
✅ X-Content-Type-Options: nosniff
✅ Referrer-Policy: strict-origin
```

---

## ⚡ **CACHING**

```
HTML:       1 hour
CSS/JS:     1 week
Images:     1 month
Fonts:      1 year
Sitemaps:   1 day
```

---

## 🌍 **GEO-REDIRECTION**

**Status**: Suggestion-based (Google-friendly)

**How it works**:
1. Detects country via GeoIP/CloudFlare
2. Passes to JavaScript via header
3. Shows suggestion banner
4. User can accept/dismiss

**NOT automatic** (Google penalty avoided!)

---

## 🔧 **COMMON MODIFICATIONS**

### **Add Custom Redirect**
```apache
# Add to section 20
Redirect 301 /old-page /en/new-page
```

### **Change WWW Preference**
```apache
# Section 3: Uncomment one option
# www → non-www OR non-www → www
```

### **Enable HTTPS**
```apache
# Section 2: Uncomment
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

---

## 🧪 **TESTING COMMANDS**

```bash
# Syntax check
apachectl configtest

# View security headers
curl -I https://zynstro.com/

# Test GZIP
curl -I -H "Accept-Encoding: gzip" https://zynstro.com/

# Check language routing
curl https://zynstro.com/es/
```

---

## 🚨 **TROUBLESHOOTING**

**500 Error**:
```bash
# Check logs
tail -f /var/log/apache2/error.log

# Test syntax
apachectl configtest
```

**Redirects Not Working**:
```apache
# In Apache config, ensure:
AllowOverride All
```

**Enable mod_rewrite**:
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

---

## 📊 **MONITORING**

```bash
# Access log
tail -f /var/log/apache2/access.log

# Filter by language
grep "/es/" access.log

# Check redirects
grep " 301 " access.log

# Find 404 errors
grep " 404 " access.log
```

---

## ✅ **GO-LIVE CHECKLIST**

- [ ] .htaccess uploaded
- [ ] Syntax validated
- [ ] mod_rewrite enabled
- [ ] HTTPS configured
- [ ] Error pages created (404.html, 500.html)
- [ ] All language URLs tested
- [ ] Security headers verified
- [ ] Caching confirmed
- [ ] Logs monitored

---

## 🎯 **KEY FEATURES**

✅ 37 language routes  
✅ Security headers  
✅ GZIP compression (60-80% size reduction)  
✅ Browser caching  
✅ GeoIP support  
✅ SEO-friendly redirects  
✅ File protection  
✅ Performance optimization  

---

## 📞 **HELP**

**Full Guide**: `HTACCESS_IMPLEMENTATION_GUIDE.md`  
**Main File**: `.htaccess`  

**Test Tools**:
- https://htaccess.madewithlove.be/
- https://www.seobility.net/en/headercheck/

---

**Your international website is ready!** 🚀🌍
