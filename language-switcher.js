/**
 * ZYNSTRO - LANGUAGE SWITCHER COMPONENT
 * SEO-friendly language selector with accessibility features
 */

class LanguageSwitcher {
    constructor(options = {}) {
        this.containerId = options.containerId || 'languageSwitcher';
        this.displayFormat = options.displayFormat || 'flag-name'; // 'flag-name', 'name', 'native', 'code'
        this.showRegions = options.showRegions !== false;
        this.position = options.position || 'header'; // 'header', 'footer', 'inline'
        this.style = options.style || 'dropdown'; // 'dropdown', 'modal', 'inline'
        
        this.languageManager = new LanguageManager();
        this.currentLang = this.languageManager.currentLanguage;
    }
    
    // Language to flag emoji mapping
    getFlagEmoji(langCode) {
        const flagMap = {
            'en': '🇺🇸', 'en-US': '🇺🇸', 'en-GB': '🇬🇧', 'en-AU': '🇦🇺', 'en-CA': '🇨🇦',
            'es': '🇪🇸', 'es-ES': '🇪🇸', 'es-MX': '🇲🇽', 'es-AR': '🇦🇷',
            'fr': '🇫🇷', 'fr-FR': '🇫🇷', 'fr-CA': '🇨🇦',
            'de': '🇩🇪', 'de-DE': '🇩🇪', 'de-AT': '🇦🇹',
            'pt': '🇵🇹', 'pt-BR': '🇧🇷', 'pt-PT': '🇵🇹',
            'it': '🇮🇹', 'it-IT': '🇮🇹',
            'ar': '🇸🇦', 'ar-SA': '🇸🇦', 'ar-AE': '🇦🇪',
            'zh': '🇨🇳', 'zh-CN': '🇨🇳', 'zh-TW': '🇹🇼',
            'ja': '🇯🇵', 'ja-JP': '🇯🇵',
            'ko': '🇰🇷', 'ko-KR': '🇰🇷',
            'nl': '🇳🇱', 'nl-NL': '🇳🇱',
            'ru': '🇷🇺', 'ru-RU': '🇷🇺',
            'hi': '🇮🇳', 'hi-IN': '🇮🇳',
            'ur': '🇵🇰', 'ur-PK': '🇵🇰'
        };
        return flagMap[langCode] || '🌐';
    }
    
    // Group languages by base language
    groupLanguages() {
        const grouped = {};
        
        MULTILINGUAL_CONFIG.supportedLanguages.forEach(lang => {
            const baseLang = lang.code.split('-')[0];
            if (!grouped[baseLang]) {
                grouped[baseLang] = [];
            }
            grouped[baseLang].push(lang);
        });
        
        return grouped;
    }
    
    // Render dropdown style switcher
    renderDropdown() {
        const currentLangData = this.languageManager.getCurrentLanguageData();
        const grouped = this.groupLanguages();
        
        return `
            <div class="language-switcher-dropdown">
                <button class="language-switcher-trigger" aria-label="Select Language" aria-haspopup="true" aria-expanded="false">
                    <span class="flag">${this.getFlagEmoji(this.currentLang)}</span>
                    <span class="lang-name">${currentLangData.nativeName}</span>
                    <svg class="chevron" width="12" height="12" viewBox="0 0 12 12">
                        <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
                
                <div class="language-switcher-menu" role="menu" aria-label="Language Selection">
                    ${this.renderLanguageList(grouped)}
                </div>
            </div>
        `;
    }
    
    // Render modal style switcher
    renderModal() {
        const currentLangData = this.languageManager.getCurrentLanguageData();
        
        return `
            <button class="language-switcher-modal-trigger" aria-label="Select Language">
                ${this.getFlagEmoji(this.currentLang)} ${currentLangData.nativeName}
            </button>
            
            <div class="language-switcher-modal" id="languageModal" role="dialog" aria-modal="true" aria-labelledby="languageModalTitle">
                <div class="language-modal-overlay"></div>
                <div class="language-modal-content">
                    <div class="language-modal-header">
                        <h2 id="languageModalTitle">🌍 Choose Your Language</h2>
                        <button class="language-modal-close" aria-label="Close">&times;</button>
                    </div>
                    <div class="language-modal-body">
                        ${this.renderLanguageGrid()}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Render inline style switcher
    renderInline() {
        const grouped = this.groupLanguages();
        
        return `
            <div class="language-switcher-inline">
                <h3 class="language-switcher-title">🌐 Select Language</h3>
                ${this.renderLanguageList(grouped)}
            </div>
        `;
    }
    
    // Render language list (for dropdown and inline)
    renderLanguageList(grouped) {
        let html = '<div class="language-list">';
        
        Object.keys(grouped).forEach(baseLang => {
            const languages = grouped[baseLang];
            
            if (languages.length === 1 || !this.showRegions) {
                // Single language, no grouping
                const lang = languages[0];
                html += this.renderLanguageItem(lang);
            } else {
                // Multiple regions, create a group
                html += `<div class="language-group">`;
                html += `<div class="language-group-header">${languages[0].name.split(' ')[0]}</div>`;
                languages.forEach(lang => {
                    html += this.renderLanguageItem(lang, true);
                });
                html += `</div>`;
            }
        });
        
        html += '</div>';
        return html;
    }
    
    // Render individual language item
    renderLanguageItem(lang, isSubItem = false) {
        const isCurrent = lang.code === this.currentLang;
        const currentPath = window.location.pathname;
        const url = URL_STRUCTURE.getCurrentUrl(lang.code, currentPath);
        
        return `
            <a href="${url}" 
               class="language-item ${isCurrent ? 'active' : ''} ${isSubItem ? 'sub-item' : ''}"
               data-lang="${lang.code}"
               hreflang="${lang.code}"
               lang="${lang.code}"
               ${lang.rtl ? 'dir="rtl"' : ''}
               role="menuitem">
                <span class="flag">${this.getFlagEmoji(lang.code)}</span>
                <span class="lang-name">${lang.nativeName}</span>
                ${isCurrent ? '<span class="checkmark">✓</span>' : ''}
            </a>
        `;
    }
    
    // Render language grid (for modal)
    renderLanguageGrid() {
        let html = '<div class="language-grid">';
        
        MULTILINGUAL_CONFIG.supportedLanguages.forEach(lang => {
            const isCurrent = lang.code === this.currentLang;
            const currentPath = window.location.pathname;
            const url = URL_STRUCTURE.getCurrentUrl(lang.code, currentPath);
            
            html += `
                <a href="${url}"
                   class="language-card ${isCurrent ? 'active' : ''}"
                   data-lang="${lang.code}"
                   hreflang="${lang.code}"
                   lang="${lang.code}"
                   ${lang.rtl ? 'dir="rtl"' : ''}>
                    <span class="flag-large">${this.getFlagEmoji(lang.code)}</span>
                    <span class="lang-name-primary">${lang.nativeName}</span>
                    <span class="lang-name-secondary">${lang.name}</span>
                    ${isCurrent ? '<span class="current-badge">Current</span>' : ''}
                </a>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    // Initialize and render the switcher
    init() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container #${this.containerId} not found`);
            return;
        }
        
        // Render based on style
        let html;
        switch (this.style) {
            case 'modal':
                html = this.renderModal();
                break;
            case 'inline':
                html = this.renderInline();
                break;
            case 'dropdown':
            default:
                html = this.renderDropdown();
                break;
        }
        
        container.innerHTML = html;
        
        // Attach event listeners
        this.attachEventListeners();
        
        // Inject styles
        this.injectStyles();
    }
    
    // Attach event listeners
    attachEventListeners() {
        // Dropdown toggle
        const trigger = document.querySelector('.language-switcher-trigger');
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const menu = document.querySelector('.language-switcher-menu');
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                trigger.setAttribute('aria-expanded', !isExpanded);
                menu.classList.toggle('show');
            });
            
            // Close on outside click
            document.addEventListener('click', () => {
                const menu = document.querySelector('.language-switcher-menu');
                if (menu) {
                    menu.classList.remove('show');
                    trigger.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        // Modal triggers
        const modalTrigger = document.querySelector('.language-switcher-modal-trigger');
        if (modalTrigger) {
            modalTrigger.addEventListener('click', () => {
                document.getElementById('languageModal').classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        }
        
        const modalClose = document.querySelector('.language-modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                document.getElementById('languageModal').classList.remove('show');
                document.body.style.overflow = 'auto';
            });
        }
        
        const modalOverlay = document.querySelector('.language-modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => {
                document.getElementById('languageModal').classList.remove('show');
                document.body.style.overflow = 'auto';
            });
        }
        
        // Language selection
        document.querySelectorAll('.language-item, .language-card').forEach(item => {
            item.addEventListener('click', (e) => {
                const langCode = item.getAttribute('data-lang');
                this.languageManager.setLanguage(langCode);
                // The href will handle the navigation
            });
        });
    }
    
    // Inject CSS styles
    injectStyles() {
        if (document.getElementById('language-switcher-styles')) return;
        
        const styles = `
            <style id="language-switcher-styles">
                /* Dropdown Styles */
                .language-switcher-dropdown {
                    position: relative;
                    display: inline-block;
                }
                
                .language-switcher-trigger {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.6rem 1rem;
                    background: white;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.95rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                
                .language-switcher-trigger:hover {
                    border-color: #6366f1;
                    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
                }
                
                .language-switcher-trigger .flag {
                    font-size: 1.25rem;
                }
                
                .language-switcher-trigger .chevron {
                    transition: transform 0.3s ease;
                }
                
                .language-switcher-trigger[aria-expanded="true"] .chevron {
                    transform: rotate(180deg);
                }
                
                .language-switcher-menu {
                    position: absolute;
                    top: calc(100% + 0.5rem);
                    right: 0;
                    background: white;
                    border: 2px solid #e5e7eb;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    min-width: 280px;
                    max-height: 400px;
                    overflow-y: auto;
                    z-index: 1000;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-10px);
                    transition: all 0.3s ease;
                }
                
                .language-switcher-menu.show {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }
                
                .language-list {
                    padding: 0.5rem;
                }
                
                .language-group {
                    margin-bottom: 0.5rem;
                }
                
                .language-group-header {
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #6b7280;
                    padding: 0.5rem 0.75rem;
                    letter-spacing: 0.5px;
                }
                
                .language-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    text-decoration: none;
                    color: #1f2937;
                    transition: all 0.2s ease;
                }
                
                .language-item.sub-item {
                    padding-left: 2rem;
                    font-size: 0.9rem;
                }
                
                .language-item:hover {
                    background: #f3f4f6;
                    transform: translateX(4px);
                }
                
                .language-item.active {
                    background: linear-gradient(135deg, #eef2ff, #e0e7ff);
                    color: #4f46e5;
                    font-weight: 600;
                }
                
                .language-item .flag {
                    font-size: 1.5rem;
                }
                
                .language-item .checkmark {
                    margin-left: auto;
                    color: #10b981;
                    font-weight: bold;
                }
                
                /* Modal Styles */
                .language-switcher-modal-trigger {
                    padding: 0.6rem 1.2rem;
                    background: white;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.95rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                
                .language-switcher-modal-trigger:hover {
                    border-color: #6366f1;
                    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
                }
                
                .language-switcher-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 9999;
                    display: none;
                    align-items: center;
                    justify-content: center;
                }
                
                .language-switcher-modal.show {
                    display: flex;
                }
                
                .language-modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(4px);
                }
                
                .language-modal-content {
                    position: relative;
                    background: white;
                    border-radius: 20px;
                    max-width: 800px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
                    animation: modalSlideIn 0.3s ease;
                }
                
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .language-modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 2rem;
                    border-bottom: 2px solid #e5e7eb;
                }
                
                .language-modal-header h2 {
                    font-size: 1.75rem;
                    color: #1f2937;
                    margin: 0;
                }
                
                .language-modal-close {
                    font-size: 2rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #6b7280;
                    transition: color 0.2s;
                }
                
                .language-modal-close:hover {
                    color: #ef4444;
                }
                
                .language-modal-body {
                    padding: 2rem;
                }
                
                .language-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                    gap: 1rem;
                }
                
                .language-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 1.5rem 1rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 12px;
                    text-decoration: none;
                    color: #1f2937;
                    transition: all 0.3s ease;
                    position: relative;
                }
                
                .language-card:hover {
                    border-color: #6366f1;
                    transform: translateY(-4px);
                    box-shadow: 0 8px 16px rgba(99, 102, 241, 0.15);
                }
                
                .language-card.active {
                    border-color: #6366f1;
                    background: linear-gradient(135deg, #eef2ff, #e0e7ff);
                }
                
                .language-card .flag-large {
                    font-size: 3rem;
                    margin-bottom: 0.5rem;
                }
                
                .language-card .lang-name-primary {
                    font-weight: 700;
                    font-size: 1rem;
                    margin-bottom: 0.25rem;
                    text-align: center;
                }
                
                .language-card .lang-name-secondary {
                    font-size: 0.75rem;
                    color: #6b7280;
                    text-align: center;
                }
                
                .language-card .current-badge {
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
                    background: #10b981;
                    color: white;
                    padding: 0.25rem 0.5rem;
                    border-radius: 12px;
                    font-size: 0.7rem;
                    font-weight: 600;
                }
                
                /* Inline Styles */
                .language-switcher-inline {
                    padding: 1rem;
                }
                
                .language-switcher-title {
                    font-size: 1.25rem;
                    margin-bottom: 1rem;
                    color: #1f2937;
                }
                
                /* Responsive */
                @media (max-width: 768px) {
                    .language-grid {
                        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    }
                    
                    .language-switcher-menu {
                        left: 0;
                        right: 0;
                        max-width: 100%;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Auto-initialize if container exists
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('languageSwitcher')) {
        const switcher = new LanguageSwitcher({
            style: 'dropdown',
            showRegions: true
        });
        switcher.init();
    }
});
