# ⚡ Pricing Quick Start

## 🚀 **5-MINUTE SETUP**

### **Step 1: Add Files** (1 min)

Upload these files to your server:
```
✅ pricing-config.js
✅ pricing.html
```

### **Step 2: Link in HTML** (1 min)

Add to your pricing page:

```html
<!-- Before </body> -->
<script src="multilingual-seo-config.js"></script>
<script src="language-switcher.js"></script>
<script src="pricing-config.js"></script>
```

### **Step 3: Initialize** (1 min)

```javascript
// Initialize managers
const langManager = new LanguageManager();
const pricingManager = new PricingManager();
pricingManager.init(langManager.currentLanguage);

// Get all plans
const plans = pricingManager.getAllPlans();
console.log(plans);
```

### **Step 4: Test** (2 min)

Open `pricing.html` in browser:

```
http://localhost/pricing.html
```

**Verify**:
- ✅ Pricing cards display
- ✅ Currency selector works
- ✅ Monthly/annual toggle works
- ✅ Language switcher shows correct prices

---

## 💳 **PRICING TIERS**

```
Free        →  $0/mo
Starter     →  $9.99/mo   ($95.90/year)
Professional → $29.99/mo  ($287.90/year) ⭐ Popular
Enterprise  →  Custom pricing
```

---

## 💱 **SUPPORTED CURRENCIES**

**40+ currencies** including:

```
USD, EUR, GBP, CAD, AUD
MXN, BRL, JPY, CNY, KRW
INR, PKR, SAR, AED, and more...
```

**Auto-detected** based on language!

---

## 🌍 **LANGUAGE EXAMPLES**

### **English (USD)**
```
Professional
$29.99/mo
✓ Unlimited name generations
[Start Free Trial]
```

### **Urdu (PKR)**
```
پیشہ ورانہ
PKR ₨8,350/ماہ
✓ لامحدود نام جنریشن
[مفت آزمائش شروع کریں]
```

### **Spanish (MXN)**
```
Profesional
MX$511.08/mes
✓ Generaciones ilimitadas
[Prueba Gratis]
```

---

## 🔧 **QUICK API**

### **Get All Plans**
```javascript
const plans = pricingManager.getAllPlans();
// Returns all plans with converted prices
```

### **Get Specific Plan**
```javascript
const proPlan = pricingManager.getPlan('professional');
console.log(proPlan.displayPrice);  // "$29.99"
```

### **Change Currency**
```javascript
pricingManager.setCurrency('PKR');
// Instantly converts all prices to PKR
```

### **Toggle Billing**
```javascript
pricingManager.setBillingCycle('annual');
// Switch to annual pricing (20% off)
```

### **Format Price**
```javascript
const formatted = pricingManager.formatPrice(29.99, 'USD', 'en');
// Returns: "$29.99"
```

---

## 🧪 **TESTING**

### **Test Different Currencies**

```javascript
// Test Pakistani Rupee
pricingManager.setCurrency('PKR');
const plan = pricingManager.getPlan('professional');
console.log(plan.displayPrice);  // "PKR ₨8,350"
```

### **Test Different Languages**

```javascript
// Test Urdu
pricingManager.init('ur-PK');
const plan = pricingManager.getPlan('professional', 'ur-PK');
console.log(plan.displayName);  // "پیشہ ورانہ"
```

---

## ⚙️ **CUSTOMIZATION**

### **Change Annual Discount**

```javascript
// In pricing-config.js
PRICING_PLANS.annualDiscount = 0.30;  // 30% off
```

### **Add New Plan**

```javascript
PRICING_PLANS.plans.push({
    id: 'premium',
    name: { en: 'Premium', ur: 'پریمیم' },
    price: 49.99,
    features: [...]
});
```

### **Update Exchange Rate**

```javascript
// Manual update
await pricingManager.updateExchangeRates();
```

---

## 📊 **FEATURES BY PLAN**

### **Free**
```
✅ 10 generations
✅ 5 domain checks
✅ Trademark assessment
❌ History
❌ Favorites
```

### **Starter ($9.99)**
```
✅ 100 generations
✅ 50 domain checks
✅ All Free features
✅ Search history
✅ Save favorites
✅ Export results
```

### **Professional ($29.99)** ⭐
```
✅ UNLIMITED generations
✅ UNLIMITED domain checks
✅ All Starter features
✅ Analytics
✅ 3 team members
✅ API access
✅ Priority support
```

### **Enterprise (Custom)**
```
✅ Everything in Professional
✅ Unlimited team
✅ White label
✅ Custom integration
✅ 99.9% SLA
✅ Dedicated support
```

---

## 🎯 **INTEGRATION**

### **With Stripe**

```javascript
async function subscribe(planId) {
    const plan = pricingManager.getPlan(planId);
    
    const response = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({
            planId,
            currency: pricingManager.currentCurrency,
            amount: plan.monthlyprice
        })
    });
    
    // Redirect to Stripe
    window.location.href = response.checkoutUrl;
}
```

---

## ✅ **CHECKLIST**

- [ ] pricing-config.js uploaded
- [ ] pricing.html created
- [ ] Scripts linked in HTML
- [ ] Currency selector working
- [ ] Billing toggle functional
- [ ] All languages tested
- [ ] Mobile responsive
- [ ] Payment integration ready

---

## 📞 **QUICK HELP**

**Full Guide**: `PRICING_IMPLEMENTATION_GUIDE.md`  
**Config File**: `pricing-config.js`  
**Pricing Page**: `pricing.html`  

**Test URL**: `http://localhost/pricing.html`

---

## 🎉 **YOU'RE READY!**

Your pricing system supports:

✅ 4 pricing tiers  
✅ 40+ currencies  
✅ 37 languages  
✅ Auto-conversion  
✅ Monthly & annual billing  
✅ Mobile-responsive  

**Start accepting payments!** 💰🚀
