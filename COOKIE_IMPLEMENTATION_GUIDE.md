# 🍪 Cookie Management Implementation Guide

## Overview

This guide explains how to use the comprehensive cookie management system implemented in your Zynstro website. The system is fully compliant with GDPR and CCPA regulations and provides users with complete control over their cookie preferences.

## Features

✅ **GDPR/CCPA Compliant** - Fully compliant with privacy regulations  
✅ **User Consent Banner** - Non-intrusive cookie consent banner  
✅ **Granular Control** - Category-based cookie preferences  
✅ **Cookie Policy** - Built-in cookie policy viewer  
✅ **Preference Management** - Easy-to-use preference center  
✅ **Responsive Design** - Works on all devices  
✅ **Dark Mode Support** - Automatically adapts to user preference  

## Files Included

1. **cookie-manager.js** - Core cookie management functionality
2. **cookie-styles.css** - Styling for cookie consent UI
3. Integration in **index.html** and **script.js**

## Cookie Categories

### 1. Necessary Cookies (Always Active)
Essential cookies required for the website to function properly.

**Cookies:**
- `zynstro_cookie_consent` - Stores consent timestamp
- `zynstro_cookie_preferences` - Stores user cookie preferences
- `nameGenius_currentUser` - Current user session
- `nameGenius_users` - User account data

### 2. Functional Cookies (Optional)
Cookies that enable enhanced functionality and personalization.

**Cookies:**
- `user_language` - Selected language preference
- `user_theme` - Theme preference
- `remember_me` - Remember login state
- `session_data` - Session information

### 3. Analytics Cookies (Optional)
Cookies that help understand how visitors use the website.

**Cookies:**
- `_ga` - Google Analytics
- `_gid` - Google Analytics
- `_gat` - Google Analytics
- `analytics_session` - Analytics session tracking

### 4. Marketing Cookies (Optional)
Cookies used to deliver personalized advertisements.

**Cookies:**
- `_fbp` - Facebook Pixel
- `_gcl_au` - Google Ads
- `marketing_token` - Marketing tracking

## How to Use

### Basic Setup

The cookie system is automatically initialized when the page loads. No additional setup is required for basic functionality.

### Setting Cookies

```javascript
// Set a functional cookie
cookieManager.setCookie('user_theme', 'dark', 365, 'functional');

// Set an analytics cookie
cookieManager.setCookie('analytics_session', 'abc123', 30, 'analytics');

// Set a necessary cookie (always allowed)
cookieManager.setCookie('session_id', 'xyz789', 1, 'necessary');
```

### Getting Cookies

```javascript
// Get a specific cookie
const theme = cookieManager.getCookie('user_theme');

// Get all cookies
const allCookies = cookieManager.getAllCookies();
```

### Deleting Cookies

```javascript
// Delete a specific cookie
cookieManager.deleteCookie('user_theme');

// Clear all cookies except necessary ones
cookieManager.clearAllCookies();

// Clear all cookies including necessary ones
cookieManager.clearAllCookies(false);
```

### Checking Preferences

```javascript
// Check if a category is enabled
if (cookieManager.isCategoryEnabled('analytics')) {
    // Enable analytics tracking
    initializeGoogleAnalytics();
}

// Get current preferences
const preferences = cookieManager.getPreferences();
console.log(preferences);
// Output: { necessary: true, functional: false, analytics: false, marketing: false }
```

### Programmatic Control

```javascript
// Show consent banner manually
cookieManager.showConsentBanner();

// Hide consent banner
cookieManager.hideConsentBanner();

// Show preferences modal
cookieManager.showPreferencesModal();

// Accept all cookies
cookieManager.acceptAll();

// Accept only necessary cookies
cookieManager.acceptNecessary();

// Save custom preferences
cookieManager.savePreferences({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false
});
```

## Integration Examples

### Google Analytics Integration

```javascript
// In your main script, check if analytics is enabled
if (cookieManager.isCategoryEnabled('analytics')) {
    // Load Google Analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-XXXXX-Y', 'auto');
    ga('send', 'pageview');
}
```

### Facebook Pixel Integration

```javascript
if (cookieManager.isCategoryEnabled('marketing')) {
    // Load Facebook Pixel
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
}
```

### User Preference Storage

```javascript
// Only store user preferences if functional cookies are enabled
function saveUserPreferences(preferences) {
    if (cookieManager.isCategoryEnabled('functional')) {
        cookieManager.setCookie('user_preferences', JSON.stringify(preferences), 365, 'functional');
    } else {
        // Use session storage as fallback
        sessionStorage.setItem('user_preferences', JSON.stringify(preferences));
    }
}
```

## User Interface

### Cookie Consent Banner

The consent banner appears automatically on the first visit. It includes:
- Clear explanation of cookie usage
- "Accept All" button
- "Necessary Only" button
- "Customize" button to access preferences
- "Learn more" link to cookie policy

### Cookie Preferences Modal

Users can access the preferences modal by:
1. Clicking "Customize" in the consent banner
2. Clicking the "🍪 Cookies" button in the header
3. Programmatically calling `cookieManager.showPreferencesModal()`

The modal allows users to:
- Enable/disable each cookie category
- View which cookies are used in each category
- Save preferences
- Accept all or reject all

### Cookie Settings Button

A cookie settings button has been added to the header for easy access:

```html
<button id="cookieSettingsBtn" class="auth-header-btn">
    🍪 Cookies
</button>
```

## Customization

### Styling

You can customize the appearance by modifying `cookie-styles.css`:

```css
/* Change primary color */
.cookie-btn-primary {
    background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
}

/* Change banner position */
.cookie-consent-banner {
    bottom: 0; /* or top: 0 for top banner */
}
```

### Cookie Categories

To add a new cookie category, modify the `cookieCategories` object in `cookie-manager.js`:

```javascript
this.cookieCategories = {
    // ... existing categories
    social: {
        name: 'Social Media',
        description: 'Cookies for social media integration',
        required: false,
        cookies: ['social_token', 'social_share']
    }
};
```

### Translations

To add multi-language support, modify text strings in the `createConsentBanner()` and `createPreferencesModal()` methods.

## Best Practices

### 1. Cookie Consent Before Tracking

Always check consent before setting non-essential cookies:

```javascript
// ❌ BAD - Setting cookie without checking consent
document.cookie = "tracking_id=123; path=/";

// ✅ GOOD - Check consent first
if (cookieManager.isCategoryEnabled('analytics')) {
    cookieManager.setCookie('tracking_id', '123', 30, 'analytics');
}
```

### 2. Clear Cookie Purposes

When adding new cookies, clearly document their purpose:

```javascript
// Store the cookie with clear purpose
cookieManager.setCookie(
    'preference_theme',  // Name
    'dark',              // Value
    365,                 // Days
    'functional'         // Category - matches user's expectations
);
```

### 3. Respect User Choices

Always respect user cookie preferences:

```javascript
// Listen for preference changes
window.addEventListener('storage', (e) => {
    if (e.key === 'zynstro_cookie_preferences') {
        // Preferences changed, update your tracking
        const preferences = cookieManager.getPreferences();
        updateTracking(preferences);
    }
});
```

### 4. Provide Clear Information

Make sure users understand what each cookie category does by updating descriptions in the cookie categories configuration.

## Legal Compliance

### GDPR Compliance

✅ Opt-in consent required for non-essential cookies  
✅ Clear information about cookie purposes  
✅ Easy way to withdraw consent  
✅ Record of consent  
✅ Cookie policy accessible  

### CCPA Compliance

✅ Notice of cookie usage  
✅ Opt-out mechanism for selling personal information  
✅ Non-discrimination for opting out  

## Troubleshooting

### Banner Not Showing

```javascript
// Force show the banner
cookieManager.showConsentBanner();

// Check if consent was already given
console.log(cookieManager.hasConsent());

// Clear consent to test
localStorage.removeItem('zynstro_cookie_consent');
```

### Cookies Not Being Set

```javascript
// Check if category is enabled
console.log(cookieManager.isCategoryEnabled('functional'));

// Check current preferences
console.log(cookieManager.getPreferences());

// Verify cookie was set
console.log(cookieManager.getCookie('your_cookie_name'));
```

### Preferences Not Saving

```javascript
// Check localStorage
console.log(localStorage.getItem('zynstro_cookie_preferences'));

// Manually save preferences
cookieManager.savePreferences({
    necessary: true,
    functional: true,
    analytics: true,
    marketing: false
});
```

## Additional Resources

- [GDPR Official Website](https://gdpr.eu/)
- [CCPA Official Website](https://oag.ca.gov/privacy/ccpa)
- [Cookie Law Compliance](https://www.cookielaw.org/)

## Support

For questions or issues with the cookie management system:

1. Check this documentation
2. Review the code comments in `cookie-manager.js`
3. Check browser console for error messages
4. Verify all files are properly linked in `index.html`

## Version

Current Version: 1.0.0  
Last Updated: 2025-10-27  
Compatible with: Modern browsers (Chrome, Firefox, Safari, Edge)
