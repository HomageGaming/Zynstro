# 🍪 Cookie Management - Quick Reference

## 🚀 Quick Start

The cookie management system is **automatically initialized** when your page loads. No setup required!

## 📁 Files

- **cookie-manager.js** - Core functionality
- **cookie-styles.css** - UI styling
- **cookie-demo.html** - Interactive demo
- **COOKIE_IMPLEMENTATION_GUIDE.md** - Full documentation

## 🎯 Key Features

✅ GDPR/CCPA compliant  
✅ 4 cookie categories (Necessary, Functional, Analytics, Marketing)  
✅ User-friendly consent banner  
✅ Customizable preferences modal  
✅ Cookie policy viewer  
✅ Responsive & accessible  

## 🔧 Common Usage

### Setting Cookies

```javascript
// Syntax: setCookie(name, value, days, category)
cookieManager.setCookie('theme', 'dark', 365, 'functional');
cookieManager.setCookie('analytics_id', '123', 30, 'analytics');
```

### Getting Cookies

```javascript
const theme = cookieManager.getCookie('theme');
const allCookies = cookieManager.getAllCookies();
```

### Checking Preferences

```javascript
if (cookieManager.isCategoryEnabled('analytics')) {
    // Initialize analytics
}

const preferences = cookieManager.getPreferences();
// Returns: { necessary: true, functional: false, analytics: false, marketing: false }
```

### Showing UI

```javascript
cookieManager.showConsentBanner();      // Show consent banner
cookieManager.showPreferencesModal();   // Show preferences
cookieManager.showCookiePolicy();       // Show policy
```

## 🎨 User Interface

### Cookie Settings Button (Header)
```html
<button id="cookieSettingsBtn" class="auth-header-btn">
    🍪 Cookies
</button>
```

### Consent Banner
- Appears automatically on first visit
- Bottom of screen, non-intrusive
- Options: Accept All, Necessary Only, Customize

### Preferences Modal
- Accessible via "🍪 Cookies" button or Customize
- Toggle each category on/off
- View which cookies are used
- Save custom preferences

## 📊 Cookie Categories

| Category | Status | Purpose |
|----------|--------|---------|
| **Necessary** | Always On | Essential for website function |
| **Functional** | Optional | Enhanced features & personalization |
| **Analytics** | Optional | Usage statistics & insights |
| **Marketing** | Optional | Personalized advertisements |

## 🔍 Testing

### Test the Demo
Open `cookie-demo.html` in your browser to:
- Test consent banner
- Try different preference combinations
- Set/get/delete cookies
- View real-time status updates

### Manual Testing
```javascript
// 1. Reset consent
localStorage.removeItem('zynstro_cookie_consent');
location.reload();

// 2. Check if working
console.log(cookieManager.hasConsent());
console.log(cookieManager.getPreferences());

// 3. Test cookie setting
cookieManager.setCookie('test', 'value', 1, 'functional');
console.log(cookieManager.getCookie('test'));
```

## 🛠️ Integration Examples

### Google Analytics
```javascript
if (cookieManager.isCategoryEnabled('analytics')) {
    // Load Google Analytics
    ga('create', 'UA-XXXXX-Y', 'auto');
    ga('send', 'pageview');
}
```

### Facebook Pixel
```javascript
if (cookieManager.isCategoryEnabled('marketing')) {
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
}
```

### User Preferences
```javascript
function saveTheme(theme) {
    if (cookieManager.isCategoryEnabled('functional')) {
        cookieManager.setCookie('user_theme', theme, 365, 'functional');
    } else {
        sessionStorage.setItem('user_theme', theme);
    }
}
```

## ⚠️ Important Notes

1. **Always check category before setting cookies**
   ```javascript
   // ❌ DON'T
   document.cookie = "tracking=1";
   
   // ✅ DO
   cookieManager.setCookie('tracking', '1', 30, 'analytics');
   ```

2. **Necessary cookies are always allowed**
   ```javascript
   // These are always set, regardless of user preference
   - zynstro_cookie_consent
   - zynstro_cookie_preferences
   - nameGenius_currentUser
   - nameGenius_users
   ```

3. **Respect user choices**
   ```javascript
   // Disable features if cookies are rejected
   if (!cookieManager.isCategoryEnabled('analytics')) {
       console.log('Analytics disabled by user');
   }
   ```

## 🐛 Troubleshooting

### Banner Not Showing
```javascript
// Check if already consented
cookieManager.hasConsent(); // true = already consented

// Force show
cookieManager.showConsentBanner();

// Reset to test
localStorage.removeItem('zynstro_cookie_consent');
```

### Cookie Not Setting
```javascript
// Check if category enabled
cookieManager.isCategoryEnabled('functional'); // true/false

// Check preferences
cookieManager.getPreferences();

// Enable all categories to test
cookieManager.acceptAll();
```

### Preferences Not Saving
```javascript
// Check localStorage
localStorage.getItem('zynstro_cookie_preferences');

// Manually save
cookieManager.savePreferences({
    necessary: true,
    functional: true,
    analytics: true,
    marketing: false
});
```

## 📱 Browser Support

✅ Chrome (latest)  
✅ Firefox (latest)  
✅ Safari (latest)  
✅ Edge (latest)  
✅ Mobile browsers  

## 🔐 Privacy Compliance

### GDPR ✅
- Opt-in consent for non-essential cookies
- Clear information about purposes
- Easy withdrawal of consent
- Record of consent maintained

### CCPA ✅
- Notice of cookie usage
- Opt-out mechanism
- Non-discrimination

## 📖 Further Reading

- **Full Guide**: See `COOKIE_IMPLEMENTATION_GUIDE.md`
- **Interactive Demo**: Open `cookie-demo.html`
- **Source Code**: Check `cookie-manager.js`

## 💡 Tips

1. Test the cookie demo first to understand the system
2. Check console for debugging information
3. Use browser DevTools to inspect cookies
4. Read the full implementation guide for advanced features
5. Customize styles in `cookie-styles.css` to match your brand

## 🆘 Support Checklist

Before asking for help:
- [ ] All files properly linked in HTML
- [ ] Browser console shows no errors
- [ ] Tested with `cookie-demo.html`
- [ ] Cleared browser cache
- [ ] Checked localStorage for preferences
- [ ] Reviewed implementation guide

## 📞 Quick Commands

```javascript
// Show interfaces
cookieManager.showConsentBanner()
cookieManager.showPreferencesModal()
cookieManager.showCookiePolicy()

// Manage consent
cookieManager.acceptAll()
cookieManager.acceptNecessary()
cookieManager.hasConsent()

// Cookies
cookieManager.setCookie(name, value, days, category)
cookieManager.getCookie(name)
cookieManager.deleteCookie(name)
cookieManager.getAllCookies()
cookieManager.clearAllCookies()

// Preferences
cookieManager.getPreferences()
cookieManager.savePreferences(prefs)
cookieManager.isCategoryEnabled(category)

// Utilities
cookieManager.enableAnalytics()
cookieManager.disableAnalytics()
cookieManager.enableMarketing()
cookieManager.disableMarketing()
```

---

**Version**: 1.0.0  
**Last Updated**: 2025-10-27  
**Status**: Production Ready ✅
