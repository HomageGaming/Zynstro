# Terms of Service & Privacy Policy - Quick Guide

## 📋 What Was Added

### New Documents Created
1. **TERMS_OF_SERVICE.md** - Complete Terms of Service
2. **PRIVACY_POLICY.md** - Comprehensive Privacy Policy
3. **TERMS_AND_PRIVACY_GUIDE.md** - This guide

### Integration Features
- ✅ Terms of Service viewer in cookie manager
- ✅ Privacy Policy viewer (already existed in cookie manager)
- ✅ Clickable links in signup modal
- ✅ Automatic modal display when users click links

---

## 🚀 How It Works

### For Users

#### Viewing Terms of Service
Users can view the Terms of Service in three ways:

1. **From Signup Modal:**
   - Click "Terms of Service" link when creating an account
   - Modal opens with key terms highlights
   - Must agree to continue with signup

2. **Programmatically:**
   ```javascript
   cookieManager.showTermsOfService();
   ```

3. **Read Full Document:**
   - Open `TERMS_OF_SERVICE.md` for complete details

#### Viewing Privacy Policy
Users can view the Privacy Policy in three ways:

1. **From Signup Modal:**
   - Click "Privacy Policy" link when creating an account
   - Modal opens with privacy information

2. **From Cookie Banner:**
   - Click "Learn more" in cookie consent banner
   - Shows cookie-specific privacy information

3. **Programmatically:**
   ```javascript
   cookieManager.showCookiePolicy();
   ```

4. **Read Full Document:**
   - Open `PRIVACY_POLICY.md` for complete details

---

## 📄 Documents Overview

### Terms of Service

**Covers:**
- ✅ Agreement to use the service
- ✅ Use license and restrictions
- ✅ User account responsibilities
- ✅ AI-generated content ownership
- ✅ Intellectual property rights
- ✅ Third-party services
- ✅ Privacy and data protection
- ✅ Payment and subscriptions
- ✅ Disclaimers and limitations
- ✅ Limitation of liability
- ✅ Acceptable use policy
- ✅ Copyright policy (DMCA)
- ✅ Children's privacy
- ✅ Contact information

**Key Points:**
- Users retain ownership of generated names
- No guarantee of trademark availability
- Service provided "as-is"
- Users must conduct trademark searches
- Prohibited uses clearly defined

### Privacy Policy

**Covers:**
- ✅ Information collection
- ✅ How we use information
- ✅ Information sharing practices
- ✅ Data retention policies
- ✅ GDPR rights (EU users)
- ✅ CCPA rights (California users)
- ✅ Cookie policy summary
- ✅ Data security measures
- ✅ Children's privacy
- ✅ International data transfers
- ✅ Third-party links
- ✅ Contact information

**Key Points:**
- We don't sell personal information
- GDPR and CCPA compliant
- Clear cookie categories
- User rights clearly defined
- Data security measures explained

---

## 💻 Developer Integration

### Displaying Terms of Service

```javascript
// Show Terms of Service modal
cookieManager.showTermsOfService();

// Example: Add to a button
document.getElementById('termsBtn').addEventListener('click', () => {
    cookieManager.showTermsOfService();
});
```

### Displaying Privacy Policy

```javascript
// Show Privacy Policy modal
cookieManager.showCookiePolicy();

// Example: Add to a button
document.getElementById('privacyBtn').addEventListener('click', () => {
    cookieManager.showCookiePolicy();
});
```

### Checking Agreement Status

```javascript
// Check if user has agreed to terms (during signup)
const agreeTerms = document.getElementById('agreeTerms').checked;

if (!agreeTerms) {
    alert('⚠️ Please agree to the Terms of Service and Privacy Policy');
    return;
}
```

---

## 🎨 Customization

### Updating Content

#### Terms of Service
1. Edit `TERMS_OF_SERVICE.md` for the full document
2. Edit the modal content in `cookie-manager.js` → `showTermsOfService()` method
3. Update "Last Updated" date

#### Privacy Policy
1. Edit `PRIVACY_POLICY.md` for the full document
2. Edit the modal content in `cookie-manager.js` → `showCookiePolicy()` method
3. Update "Last Updated" date

### Customizing Modal Appearance

The modals use the same styling as the cookie consent system. To customize:

**Colors:**
```css
/* In cookie-styles.css */
.cookie-modal-header {
    background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
}
```

**Layout:**
```css
.cookie-modal-content {
    max-width: 700px; /* Adjust width */
    max-height: 85vh; /* Adjust height */
}
```

---

## 📱 User Experience

### Signup Flow
1. User clicks "Sign Up"
2. Signup modal opens
3. User can click "Terms of Service" or "Privacy Policy" links
4. Respective modal opens over signup modal
5. User reads and closes
6. User checks agreement checkbox
7. User completes signup

### Modal Features
- **Smooth animations** - Fade in/slide up
- **Scrollable content** - For long documents
- **Close options** - X button, overlay click, or "I Understand" button
- **Responsive design** - Works on all devices
- **Dark mode support** - Adapts to user preference

---

## ⚖️ Legal Compliance

### GDPR Compliance ✅
- Clear information about data collection
- User rights clearly explained
- Consent mechanism in place
- Data retention policies defined
- Right to access, correct, and delete data

### CCPA Compliance ✅
- Notice of data collection
- Categories of data collected
- Right to know and delete
- No sale of personal information
- Non-discrimination policy

### COPPA Compliance ✅
- Clear statement: Service not for children under 13
- No knowing collection from children
- Deletion process if discovered
- Parental notification

---

## 🔧 Required Actions

### Before Going Live

1. **Update Contact Information:**
   - Replace placeholder email addresses
   - Add your business address
   - Update website URL

2. **Customize Terms:**
   - Add your jurisdiction (governing law)
   - Specify your business name/entity
   - Update dispute resolution details

3. **Legal Review:**
   - Have a lawyer review both documents
   - Ensure compliance with local laws
   - Update as needed for your jurisdiction

4. **Implementation:**
   - Test all links work correctly
   - Verify modals display properly
   - Check agreement checkbox validation

---

## 📊 Best Practices

### Regular Updates
- Review documents annually
- Update when adding new features
- Notify users of material changes
- Keep "Last Updated" date current

### User Communication
- Email users about significant changes
- Provide 30-day notice for major changes
- Highlight changes in the document
- Make old versions available

### Record Keeping
- Keep logs of when users agree to terms
- Track which version users agreed to
- Maintain records for legal compliance
- Store securely for required period

---

## 🐛 Troubleshooting

### Links Not Working
```javascript
// Ensure cookieManager is loaded
if (typeof cookieManager === 'undefined') {
    console.error('Cookie manager not loaded');
}

// Check event listeners are attached
const viewTermsLink = document.getElementById('viewTermsLink');
console.log('Terms link found:', viewTermsLink);
```

### Modal Not Displaying
```javascript
// Test manually
cookieManager.showTermsOfService();
cookieManager.showCookiePolicy();

// Check console for errors
// Verify CSS is loaded
```

### Checkbox Not Validating
```javascript
// In handleSignUp function
const agreeTerms = document.getElementById('agreeTerms').checked;
if (!agreeTerms) {
    alert('⚠️ Please agree to the Terms of Service and Privacy Policy');
    return;
}
```

---

## 📞 Support

### Resources
- **Full Terms:** See `TERMS_OF_SERVICE.md`
- **Full Privacy Policy:** See `PRIVACY_POLICY.md`
- **Cookie Guide:** See `COOKIE_IMPLEMENTATION_GUIDE.md`
- **Source Code:** Check `cookie-manager.js`

### Contact for Updates
If you need to update legal documents:
1. Consult with legal counsel
2. Update markdown files
3. Update modal content in `cookie-manager.js`
4. Update "Last Updated" dates
5. Notify users if required

---

## ✅ Implementation Checklist

- [x] Terms of Service document created
- [x] Privacy Policy document created
- [x] Terms viewer integrated into cookie manager
- [x] Privacy viewer integrated into cookie manager
- [x] Signup modal links added
- [x] Event listeners configured
- [x] No syntax errors
- [ ] Customize contact information ← **Do this!**
- [ ] Legal review ← **Important!**
- [ ] Test all links ← **Recommended!**

---

## 🎓 Quick Commands

```javascript
// Show Terms of Service
cookieManager.showTermsOfService()

// Show Privacy Policy  
cookieManager.showCookiePolicy()

// Check if terms agreed (in signup flow)
const agreed = document.getElementById('agreeTerms').checked;
```

---

**Version:** 1.0.0  
**Last Updated:** October 27, 2025  
**Status:** ✅ Ready for Legal Review

**Next Step:** Have a lawyer review and customize for your jurisdiction before going live!
