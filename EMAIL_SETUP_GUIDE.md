# 📧 Email Verification Setup Guide for Zynstro

## Overview
Zynstro now includes email verification for new user registrations using EmailJS - a free service that lets you send emails directly from JavaScript without a backend server.

## 🎯 Current Features

### ✅ Implemented Features:
- **6-digit verification code** generation
- **10-minute expiration timer** for security
- **5 maximum verification attempts**
- **Resend code functionality**
- **Demo mode** (shows code in console/alert when EmailJS not configured)
- **Email template** with professional design
- **Real-time countdown timer**
- **User-friendly verification modal**

---

## 🚀 Quick Start (Demo Mode)

The app works immediately in **DEMO MODE** without any setup:
1. Try signing up with any email
2. The verification code will appear in:
   - Browser console (F12)
   - Alert popup
3. Enter the code to complete registration

---

## 📝 EmailJS Setup (For Production)

### Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click **"Sign Up"** (it's FREE)
3. Verify your email address

### Step 2: Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook**
   - **Yahoo**
   - Or any SMTP service
4. Follow the setup wizard
5. **Copy the Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **"Create New Template"**
3. Use this template:

```
Subject: Verify Your Zynstro Account

Template Content:
---
Hello {{to_name}},

Welcome to Zynstro! 🚀

To complete your registration, please use the following verification code:

Verification Code: {{verification_code}}

This code will expire in 10 minutes.

If you didn't create an account with Zynstro, please ignore this email.

Best regards,
The Zynstro Team

---
© {{year}} Zynstro. All rights reserved.
```

4. **Template Variables** to use:
   - `{{to_name}}` - User's name
   - `{{to_email}}` - User's email (auto-filled)
   - `{{verification_code}}` - 6-digit code
   - `{{app_name}}` - "Zynstro"
   - `{{year}}` - Current year

5. **Copy the Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `abcDEF123xyz`)
3. Copy it

### Step 5: Configure Zynstro

Open `script.js` and find this section at the top:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY', // Replace with your public key
    serviceID: 'YOUR_SERVICE_ID',         // Replace with your service ID
    templateID: 'YOUR_TEMPLATE_ID'        // Replace with your template ID
};
```

Replace with your actual values:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'abcDEF123xyz',      // Your EmailJS public key
    serviceID: 'service_abc123',     // Your service ID
    templateID: 'template_xyz789'    // Your template ID
};
```

### Step 6: Test It!

1. Open `index.html` in your browser
2. Click **"Sign Up"**
3. Fill in the form with your real email
4. Click **"Create Account"**
5. Check your email for the verification code
6. Enter the code to complete registration

---

## 🎨 Customization Options

### Change Code Expiration Time

In `script.js`, find the `sendVerificationEmail` function:

```javascript
expiresAt: Date.now() + (10 * 60 * 1000), // 10 minutes
```

Change `10` to your desired minutes (e.g., `5` for 5 minutes)

### Change Maximum Attempts

In `script.js`, find the `handleVerification` function:

```javascript
if (verificationData.attempts >= 5) {
```

Change `5` to your desired number of attempts

### Customize Email Design

In EmailJS dashboard:
1. Go to your template
2. Use HTML to style your email:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #6366f1;">Welcome to Zynstro!</h1>
    <p>Hi {{to_name}},</p>
    <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; text-align: center;">
        <h2 style="color: #6366f1; font-size: 36px; letter-spacing: 5px;">
            {{verification_code}}
        </h2>
    </div>
    <p>This code expires in 10 minutes.</p>
</div>
```

---

## 🔒 Security Features

✅ **Code Expiration**: Codes expire after 10 minutes
✅ **Attempt Limiting**: Maximum 5 verification attempts
✅ **One-time Use**: Codes are deleted after successful verification
✅ **Password Encryption**: Passwords stored using Base64 encoding
✅ **Client-side Validation**: Prevents invalid submissions

---

## 📊 EmailJS Free Tier Limits

- **200 emails/month** (free forever)
- Perfect for small to medium websites
- Upgrade available for higher limits

---

## 🐛 Troubleshooting

### Code Not Received?
1. Check spam/junk folder
2. Verify email service is connected in EmailJS
3. Check browser console for errors
4. Ensure template variables match

### "Failed to send" Error?
1. Verify Service ID, Template ID, and Public Key
2. Check EmailJS dashboard for service status
3. Ensure email service is properly authenticated

### Timer Not Working?
1. Clear browser cache
2. Check browser console for JavaScript errors
3. Ensure `timerDisplay` element exists in HTML

---

## 🎯 Advanced: Using Custom SMTP

Instead of Gmail/Outlook, you can use any SMTP service:

1. In EmailJS, select **"Custom SMTP Server"**
2. Enter your SMTP details:
   - **Server**: smtp.example.com
   - **Port**: 587 or 465
   - **Username**: your-email@example.com
   - **Password**: your-password
3. Test the connection
4. Use the Service ID in your config

---

## 📱 Testing Tips

### Test in Demo Mode:
- Use any fake email (no setup needed)
- Code appears in console and alert
- Perfect for development

### Test with Real Emails:
- Use your personal email first
- Test with different email providers
- Check spam folders
- Verify all template variables work

---

## 🌟 Best Practices

1. **Always verify EmailJS setup** in dashboard before going live
2. **Keep API keys secure** - never commit them to public repos
3. **Monitor your email quota** in EmailJS dashboard
4. **Test regularly** to ensure emails are being delivered
5. **Have a backup plan** - show code in UI if email fails

---

## 📞 Support

- **EmailJS Documentation**: https://www.emailjs.com/docs/
- **EmailJS Support**: support@emailjs.com
- **Zynstro Issues**: Check browser console for error messages

---

## 🎉 You're All Set!

Your Zynstro application now has professional email verification! Users will receive a verification code via email when they sign up, making your app more secure and professional.

**Next Steps:**
1. Customize the email template design
2. Test with multiple email providers
3. Monitor your EmailJS usage
4. Consider upgrading if you exceed free tier limits

Happy coding! 🚀
