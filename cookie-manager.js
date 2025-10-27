/**
 * Cookie Manager - GDPR/CCPA Compliant Cookie Management System
 * Handles cookie consent, preferences, and cookie operations
 */

class CookieManager {
    constructor() {
        this.consentKey = 'zynstro_cookie_consent';
        this.preferencesKey = 'zynstro_cookie_preferences';
        this.cookieCategories = {
            necessary: {
                name: 'Necessary',
                description: 'Essential cookies required for the website to function properly',
                required: true,
                cookies: ['zynstro_cookie_consent', 'zynstro_cookie_preferences', 'nameGenius_currentUser', 'nameGenius_users']
            },
            functional: {
                name: 'Functional',
                description: 'Cookies that enable enhanced functionality and personalization',
                required: false,
                cookies: ['user_language', 'user_theme', 'remember_me', 'session_data']
            },
            analytics: {
                name: 'Analytics',
                description: 'Cookies that help us understand how visitors use our website',
                required: false,
                cookies: ['_ga', '_gid', '_gat', 'analytics_session']
            },
            marketing: {
                name: 'Marketing',
                description: 'Cookies used to deliver personalized advertisements',
                required: false,
                cookies: ['_fbp', '_gcl_au', 'marketing_token']
            }
        };
        
        this.defaultPreferences = {
            necessary: true,
            functional: false,
            analytics: false,
            marketing: false
        };
    }

    /**
     * Initialize cookie manager
     */
    init() {
        // Check if consent has been given
        if (!this.hasConsent()) {
            this.showConsentBanner();
        } else {
            this.applyPreferences();
        }
    }

    /**
     * Check if user has given consent
     */
    hasConsent() {
        return localStorage.getItem(this.consentKey) !== null;
    }

    /**
     * Get current cookie preferences
     */
    getPreferences() {
        const saved = localStorage.getItem(this.preferencesKey);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return { ...this.defaultPreferences };
            }
        }
        return { ...this.defaultPreferences };
    }

    /**
     * Save cookie preferences
     */
    savePreferences(preferences) {
        localStorage.setItem(this.preferencesKey, JSON.stringify(preferences));
        localStorage.setItem(this.consentKey, new Date().toISOString());
        this.applyPreferences();
    }

    /**
     * Apply current preferences
     */
    applyPreferences() {
        const preferences = this.getPreferences();
        
        // Enable/disable analytics
        if (preferences.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }

        // Enable/disable marketing
        if (preferences.marketing) {
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }

        // Functional cookies are handled by the application
        if (!preferences.functional) {
            this.clearFunctionalCookies();
        }
    }

    /**
     * Set a cookie
     */
    setCookie(name, value, days = 365, category = 'necessary') {
        const preferences = this.getPreferences();
        
        // Check if this category is allowed
        if (!preferences[category] && category !== 'necessary') {
            console.warn(`Cookie ${name} not set - ${category} cookies are disabled`);
            return false;
        }

        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        
        const cookieString = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`;
        document.cookie = cookieString;
        
        return true;
    }

    /**
     * Get a cookie value
     */
    getCookie(name) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');
        
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        return null;
    }

    /**
     * Delete a cookie
     */
    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    /**
     * Clear all cookies except necessary ones
     */
    clearAllCookies(exceptNecessary = true) {
        const cookies = document.cookie.split(';');
        const necessaryCookies = this.cookieCategories.necessary.cookies;

        cookies.forEach(cookie => {
            const name = cookie.split('=')[0].trim();
            
            if (exceptNecessary && necessaryCookies.includes(name)) {
                return; // Skip necessary cookies
            }
            
            this.deleteCookie(name);
        });
    }

    /**
     * Clear functional cookies
     */
    clearFunctionalCookies() {
        const functionalCookies = this.cookieCategories.functional.cookies;
        functionalCookies.forEach(name => {
            this.deleteCookie(name);
            // Also clear from localStorage if it exists
            localStorage.removeItem(name);
        });
    }

    /**
     * Enable Google Analytics
     */
    enableAnalytics() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
        
        // Set analytics cookie
        this.setCookie('analytics_enabled', 'true', 365, 'analytics');
    }

    /**
     * Disable Google Analytics
     */
    disableAnalytics() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
        
        // Clear analytics cookies
        this.deleteCookie('_ga');
        this.deleteCookie('_gid');
        this.deleteCookie('_gat');
        this.deleteCookie('analytics_enabled');
    }

    /**
     * Enable marketing cookies
     */
    enableMarketing() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
        }
        
        this.setCookie('marketing_enabled', 'true', 365, 'marketing');
    }

    /**
     * Disable marketing cookies
     */
    disableMarketing() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
        }
        
        // Clear marketing cookies
        this.deleteCookie('_fbp');
        this.deleteCookie('_gcl_au');
        this.deleteCookie('marketing_enabled');
    }

    /**
     * Accept all cookies
     */
    acceptAll() {
        const allAccepted = {
            necessary: true,
            functional: true,
            analytics: true,
            marketing: true
        };
        this.savePreferences(allAccepted);
        this.hideConsentBanner();
    }

    /**
     * Accept only necessary cookies
     */
    acceptNecessary() {
        this.savePreferences({ ...this.defaultPreferences });
        this.hideConsentBanner();
    }

    /**
     * Show cookie consent banner
     */
    showConsentBanner() {
        // Check if banner already exists
        if (document.getElementById('cookieConsentBanner')) {
            return;
        }

        const banner = this.createConsentBanner();
        document.body.appendChild(banner);
        
        // Animate in
        setTimeout(() => {
            banner.classList.add('show');
        }, 100);
    }

    /**
     * Hide cookie consent banner
     */
    hideConsentBanner() {
        const banner = document.getElementById('cookieConsentBanner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    /**
     * Create consent banner HTML
     */
    createConsentBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookieConsentBanner';
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-icon">🍪</div>
                <div class="cookie-consent-text">
                    <h3>We value your privacy</h3>
                    <p>We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.</p>
                    <a href="#" class="cookie-learn-more" id="cookieLearnMore">Learn more about cookies</a>
                </div>
                <div class="cookie-consent-actions">
                    <button class="cookie-btn cookie-btn-secondary" id="cookieCustomize">Customize</button>
                    <button class="cookie-btn cookie-btn-secondary" id="cookieNecessary">Necessary Only</button>
                    <button class="cookie-btn cookie-btn-primary" id="cookieAcceptAll">Accept All</button>
                </div>
            </div>
        `;

        // Add event listeners
        banner.querySelector('#cookieAcceptAll').addEventListener('click', () => {
            this.acceptAll();
        });

        banner.querySelector('#cookieNecessary').addEventListener('click', () => {
            this.acceptNecessary();
        });

        banner.querySelector('#cookieCustomize').addEventListener('click', () => {
            this.showPreferencesModal();
        });

        banner.querySelector('#cookieLearnMore').addEventListener('click', (e) => {
            e.preventDefault();
            this.showCookiePolicy();
        });

        return banner;
    }

    /**
     * Show cookie preferences modal
     */
    showPreferencesModal() {
        // Check if modal already exists
        let modal = document.getElementById('cookiePreferencesModal');
        if (modal) {
            modal.classList.add('active');
            return;
        }

        modal = this.createPreferencesModal();
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    /**
     * Hide cookie preferences modal
     */
    hidePreferencesModal() {
        const modal = document.getElementById('cookiePreferencesModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    /**
     * Create preferences modal
     */
    createPreferencesModal() {
        const modal = document.createElement('div');
        modal.id = 'cookiePreferencesModal';
        modal.className = 'cookie-modal';
        
        const currentPrefs = this.getPreferences();
        
        modal.innerHTML = `
            <div class="cookie-modal-overlay"></div>
            <div class="cookie-modal-content">
                <div class="cookie-modal-header">
                    <h2>🍪 Cookie Preferences</h2>
                    <button class="cookie-modal-close" id="cookieModalClose">&times;</button>
                </div>
                <div class="cookie-modal-body">
                    <p class="cookie-modal-intro">Manage your cookie preferences below. You can enable or disable different types of cookies. Please note that necessary cookies cannot be disabled as they are essential for the website to function.</p>
                    
                    <div class="cookie-categories">
                        ${Object.entries(this.cookieCategories).map(([key, category]) => `
                            <div class="cookie-category">
                                <div class="cookie-category-header">
                                    <div class="cookie-category-info">
                                        <h3>${category.name}</h3>
                                        <p>${category.description}</p>
                                    </div>
                                    <label class="cookie-toggle ${category.required ? 'disabled' : ''}">
                                        <input type="checkbox" 
                                               id="cookie_${key}" 
                                               ${currentPrefs[key] ? 'checked' : ''}
                                               ${category.required ? 'disabled' : ''}
                                               data-category="${key}">
                                        <span class="cookie-toggle-slider"></span>
                                    </label>
                                </div>
                                <div class="cookie-list">
                                    <strong>Cookies used:</strong>
                                    <ul>
                                        ${category.cookies.map(cookie => `<li><code>${cookie}</code></li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="cookie-modal-footer">
                    <button class="cookie-btn cookie-btn-secondary" id="cookieRejectAll">Necessary Only</button>
                    <button class="cookie-btn cookie-btn-primary" id="cookieSavePreferences">Save Preferences</button>
                    <button class="cookie-btn cookie-btn-primary" id="cookieAcceptAllModal">Accept All</button>
                </div>
            </div>
        `;

        // Event listeners
        modal.querySelector('#cookieModalClose').addEventListener('click', () => {
            this.hidePreferencesModal();
        });

        modal.querySelector('.cookie-modal-overlay').addEventListener('click', () => {
            this.hidePreferencesModal();
        });

        modal.querySelector('#cookieSavePreferences').addEventListener('click', () => {
            const preferences = {};
            Object.keys(this.cookieCategories).forEach(key => {
                const checkbox = modal.querySelector(`#cookie_${key}`);
                preferences[key] = checkbox.checked;
            });
            this.savePreferences(preferences);
            this.hidePreferencesModal();
            this.hideConsentBanner();
            this.showNotification('Cookie preferences saved successfully!', 'success');
        });

        modal.querySelector('#cookieAcceptAllModal').addEventListener('click', () => {
            this.acceptAll();
            this.hidePreferencesModal();
            this.hideConsentBanner();
            this.showNotification('All cookies accepted!', 'success');
        });

        modal.querySelector('#cookieRejectAll').addEventListener('click', () => {
            this.acceptNecessary();
            this.hidePreferencesModal();
            this.hideConsentBanner();
            this.showNotification('Only necessary cookies enabled!', 'info');
        });

        return modal;
    }

    /**
     * Show Terms of Service
     */
    showTermsOfService() {
        const modal = document.createElement('div');
        modal.id = 'termsOfServiceModal';
        modal.className = 'cookie-modal';
        modal.innerHTML = `
            <div class="cookie-modal-overlay"></div>
            <div class="cookie-modal-content cookie-policy-content">
                <div class="cookie-modal-header">
                    <h2>📋 Terms of Service</h2>
                    <button class="cookie-modal-close">&times;</button>
                </div>
                <div class="cookie-modal-body">
                    <section class="policy-section">
                        <h3>1. Agreement to Terms</h3>
                        <p>By accessing and using Zynstro, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
                    </section>
                    
                    <section class="policy-section">
                        <h3>2. Use License</h3>
                        <p><strong>You may:</strong></p>
                        <ul>
                            <li>Use the AI business name generator for personal or commercial purposes</li>
                            <li>Generate business names and save results</li>
                            <li>Export generated names and branding materials</li>
                            <li>Create an account to access additional features</li>
                        </ul>
                        <p><strong>You may NOT:</strong></p>
                        <ul>
                            <li>Attempt to reverse engineer or copy the underlying AI algorithms</li>
                            <li>Use the service for any illegal or unauthorized purpose</li>
                            <li>Interfere with or disrupt the service or servers</li>
                            <li>Create multiple accounts to circumvent usage limits</li>
                        </ul>
                    </section>
                    
                    <section class="policy-section">
                        <h3>3. AI-Generated Content</h3>
                        <p><strong>Ownership:</strong> You retain all rights to business names generated through the Service. We do not claim ownership of the names you generate.</p>
                        <p><strong>No Guarantees:</strong> We do not guarantee that generated names are unique or available for trademark. You are responsible for conducting proper trademark searches.</p>
                    </section>
                    
                    <section class="policy-section">
                        <h3>4. Privacy & Data Protection</h3>
                        <p>We collect and process data as described in our Privacy Policy. We comply with GDPR and CCPA requirements.</p>
                        <ul>
                            <li>You have the right to access, correct, or delete your personal data</li>
                            <li>We use cookies as outlined in our Cookie Policy</li>
                            <li>We do not sell your personal information</li>
                        </ul>
                    </section>
                    
                    <section class="policy-section">
                        <h3>5. Disclaimers</h3>
                        <p><strong>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE"</strong></p>
                        <ul>
                            <li>We do not guarantee uninterrupted or error-free service</li>
                            <li>We provide suggestions, not professional legal or business advice</li>
                            <li>We are not liable for trademark conflicts or business decisions</li>
                            <li>Consult with qualified professionals before making business decisions</li>
                        </ul>
                    </section>
                    
                    <section class="policy-section">
                        <h3>6. Limitation of Liability</h3>
                        <p>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.</p>
                    </section>
                    
                    <section class="policy-section">
                        <h3>7. Modifications to Terms</h3>
                        <p>We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new terms.</p>
                    </section>
                    
                    <section class="policy-section">
                        <h3>8. Contact Information</h3>
                        <p>If you have questions about these Terms of Service:</p>
                        <p><strong>Email:</strong> legal@zynstro.com<br>
                        <strong>Website:</strong> https://zynstro.com<br>
                        <strong>Address:</strong> Zynstro Inc., 123 Business Ave, Suite 100, San Francisco, CA 94102, United States</p>
                    </section>
                    
                    <div class="info-box" style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-left: 4px solid #3b82f6; border-radius: 8px;">
                        <strong>📄 Full Terms of Service</strong>
                        <p style="margin: 0.5rem 0 0 0;">For the complete Terms of Service document, please see TERMS_OF_SERVICE.md</p>
                    </div>
                </div>
                <div class="cookie-modal-footer">
                    <button class="cookie-btn cookie-btn-primary" id="closeTermsModal">I Understand</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);

        modal.querySelector('.cookie-modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        modal.querySelector('#closeTermsModal').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        modal.querySelector('.cookie-modal-overlay').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
    }

    /**
     * Show Privacy Policy
     */
    showPrivacyPolicy() {
        const modal = document.createElement('div');
        modal.id = 'privacyPolicyModal';
        modal.className = 'cookie-modal';
        modal.innerHTML = `
            <div class="cookie-modal-overlay"></div>
            <div class="cookie-modal-content cookie-policy-content">
                <div class="cookie-modal-header">
                    <h2>🔒 Privacy Policy</h2>
                    <button class="cookie-modal-close">&times;</button>
                </div>
                <div class="cookie-modal-body">
                    <section class="policy-section">
                        <p><strong>Last Updated: October 27, 2025</strong></p>
                        <p>Zynstro is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.</p>
                    </section>
                    
                    <section class="policy-section">
                        <h3>1. Information We Collect</h3>
                        <p><strong>Account Information:</strong></p>
                        <ul>
                            <li>Name and email address</li>
                            <li>Password (encrypted)</li>
                            <li>Account preferences</li>
                        </ul>
                        <p><strong>User-Generated Content:</strong></p>
                        <ul>
                            <li>Business topics and industry information</li>
                            <li>Generated business names</li>
                            <li>Saved preferences and favorites</li>
                        </ul>
                        <p><strong>Automatically Collected:</strong></p>
                        <ul>
                            <li>Usage data and analytics</li>
                            <li>Device and browser information</li>
                            <li>IP address and general location</li>
                            <li>Cookies and similar technologies</li>
                        </ul>
                    </section>
                    
                    <section class="policy-section">
                        <h3>2. How We Use Your Information</h3>
                        <ul>
                            <li><strong>Provide Services:</strong> Generate AI-powered business names and manage your content</li>
                            <li><strong>Communication:</strong> Send account emails, support responses, and service updates</li>
                            <li><strong>Security:</strong> Protect against unauthorized access and fraud</li>
                            <li><strong>Analytics:</strong> Understand usage patterns and improve our service</li>
                            <li><strong>Legal Compliance:</strong> Comply with legal obligations</li>
                        </ul>
                    </section>
                    
                    <section class="policy-section">
                        <h3>3. How We Share Your Information</h3>
                        <p><strong>We do NOT sell your personal information.</strong></p>
                        <p>We may share information with:</p>
                        <ul>
                            <li><strong>Service Providers:</strong> Cloud hosting, email services, analytics (contractually obligated to protect your data)</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                            <li><strong>Business Transfers:</strong> In case of merger or acquisition (with notice)</li>
                            <li><strong>Your Consent:</strong> For other purposes with your explicit consent</li>
                        </ul>
                    </section>
                    
                    <section class="policy-section">
                        <h3>4. Your Privacy Rights</h3>
                        <p><strong>GDPR Rights (EU Users):</strong></p>
                        <ul>
                            <li>✅ Right to access your personal data</li>
                            <li>✅ Right to correct inaccurate data</li>
                            <li>✅ Right to erasure ("Right to be Forgotten")</li>
                            <li>✅ Right to data portability</li>
                            <li>✅ Right to object to processing</li>
                            <li>✅ Right to withdraw consent</li>
                            <li>✅ Right to lodge a complaint with authorities</li>
                        </ul>
                        <p><strong>CCPA Rights (California Residents):</strong></p>
                        <ul>
                            <li>✅ Right to know what data we collect</li>
                            <li>✅ Right to delete your data</li>
                            <li>✅ Right to opt-out of data sales (we don't sell data)</li>
                            <li>✅ Right to non-discrimination</li>
                        </ul>
                        <p><strong>Exercise Your Rights:</strong> Email privacy@zynstro.com</p>
                    </section>
                    
                    <section class="policy-section">
                        <h3>5. Cookies & Tracking</h3>
                        <p>We use four types of cookies:</p>
                        <ul>
                            <li><strong>Necessary:</strong> Essential for functionality (always active)</li>
                            <li><strong>Functional:</strong> Remember preferences (optional)</li>
                            <li><strong>Analytics:</strong> Usage statistics (optional)</li>
                            <li><strong>Marketing:</strong> Personalized ads (optional)</li>
                        </ul>
                        <p>Manage your cookie preferences using the "🍪 Cookies" button in the header.</p>
                    </section>
                    
                    <section class="policy-section">
                        <h3>6. Data Security</h3>
                        <p>We protect your data with:</p>
                        <ul>
                            <li>SSL/TLS encryption for data in transit</li>
                            <li>Encrypted storage for sensitive data</li>
                            <li>Secure password hashing</li>
                            <li>Regular security audits</li>
                            <li>Access controls and authentication</li>
                        </ul>
                    </section>
                    
                    <section class="policy-section">
                        <h3>7. Data Retention</h3>
                        <ul>
                            <li><strong>Account Data:</strong> Retained while account is active</li>
                            <li><strong>Generated Content:</strong> Retained until you delete it</li>
                            <li><strong>After Deletion:</strong> Removed within 30 days (some data retained for legal compliance)</li>
                        </ul>
                    </section>
                    
                    <section class="policy-section">
                        <h3>8. Children's Privacy</h3>
                        <p>Our service is not intended for children under 13. We do not knowingly collect information from children under 13.</p>
                    </section>
                    
                    <section class="policy-section">
                        <h3>9. International Data Transfers</h3>
                        <p>Your information may be transferred to and processed in the United States. We ensure appropriate safeguards are in place for cross-border transfers.</p>
                    </section>
                    
                    <section class="policy-section">
                        <h3>10. Changes to This Policy</h3>
                        <p>We may update this Privacy Policy from time to time. Material changes will be notified via email or service notification.</p>
                    </section>
                    
                    <section class="policy-section">
                        <h3>11. Contact Us</h3>
                        <p><strong>Privacy Questions:</strong> privacy@zynstro.com<br>
                        <strong>Data Protection Officer (EU):</strong> dpo@zynstro.com<br>
                        <strong>Security Issues:</strong> security@zynstro.com<br>
                        <strong>Address:</strong> Zynstro Inc., 123 Business Ave, Suite 100, San Francisco, CA 94102, United States</p>
                    </section>
                    
                    <div class="info-box" style="margin-top: 2rem; padding: 1rem; background: #f0fdf4; border-left: 4px solid #10b981; border-radius: 8px;">
                        <strong>🔒 Your Privacy Matters</strong>
                        <p style="margin: 0.5rem 0 0 0;">We are committed to protecting your privacy and complying with GDPR, CCPA, and other privacy regulations. For the complete Privacy Policy, see PRIVACY_POLICY.md</p>
                    </div>
                </div>
                <div class="cookie-modal-footer">
                    <button class="cookie-btn cookie-btn-primary" id="closePrivacyModal">I Understand</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);

        modal.querySelector('.cookie-modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        modal.querySelector('#closePrivacyModal').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        modal.querySelector('.cookie-modal-overlay').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
    }

    /**
     * Show cookie policy
     */
    showCookiePolicy() {
        const modal = document.createElement('div');
        modal.id = 'cookiePolicyModal';
        modal.className = 'cookie-modal';
        modal.innerHTML = `
            <div class="cookie-modal-overlay"></div>
            <div class="cookie-modal-content cookie-policy-content">
                <div class="cookie-modal-header">
                    <h2>📋 Cookie Policy</h2>
                    <button class="cookie-modal-close">&times;</button>
                </div>
                <div class="cookie-modal-body">
                    <section class="policy-section">
                        <h3>What are cookies?</h3>
                        <p>Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.</p>
                    </section>
                    
                    <section class="policy-section">
                        <h3>How we use cookies</h3>
                        <p>We use cookies for several purposes:</p>
                        <ul>
                            <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
                            <li><strong>Functional cookies:</strong> Remember your preferences and settings</li>
                            <li><strong>Analytics cookies:</strong> Help us understand how you use our website</li>
                            <li><strong>Marketing cookies:</strong> Used to show you relevant advertisements</li>
                        </ul>
                    </section>
                    
                    <section class="policy-section">
                        <h3>Your choices</h3>
                        <p>You can control and manage cookies in various ways. You can:</p>
                        <ul>
                            <li>Use our cookie preference center to customize your settings</li>
                            <li>Block cookies through your browser settings</li>
                            <li>Delete cookies that have already been set</li>
                        </ul>
                        <p>Please note that blocking certain cookies may impact your experience on our website.</p>
                    </section>
                    
                    <section class="policy-section">
                        <h3>Data Protection</h3>
                        <p>We are committed to protecting your privacy and complying with GDPR and CCPA regulations. For more information, please review our Privacy Policy.</p>
                    </section>
                </div>
                <div class="cookie-modal-footer">
                    <button class="cookie-btn cookie-btn-primary" id="closePolicyModal">Got it!</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);

        modal.querySelector('.cookie-modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        modal.querySelector('#closePolicyModal').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        modal.querySelector('.cookie-modal-overlay').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `cookie-notification cookie-notification-${type}`;
        notification.innerHTML = `
            <div class="cookie-notification-content">
                <span class="cookie-notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
                <span class="cookie-notification-message">${message}</span>
            </div>
        `;

        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Get all cookies as an object
     */
    getAllCookies() {
        const cookies = {};
        const cookieArray = document.cookie.split(';');
        
        cookieArray.forEach(cookie => {
            const [name, value] = cookie.trim().split('=');
            if (name) {
                cookies[name] = decodeURIComponent(value || '');
            }
        });
        
        return cookies;
    }

    /**
     * Check if a specific cookie category is enabled
     */
    isCategoryEnabled(category) {
        const preferences = this.getPreferences();
        return preferences[category] === true;
    }
}

// Global instance
const cookieManager = new CookieManager();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        cookieManager.init();
    });
} else {
    cookieManager.init();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CookieManager;
}
