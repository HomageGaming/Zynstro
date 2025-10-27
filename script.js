// AI Business Name Generator - Advanced Multi-Mode System

// EmailJS Configuration
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY', // Replace with your EmailJS public key
    serviceID: 'YOUR_SERVICE_ID',         // Replace with your EmailJS service ID
    templateID: 'YOUR_TEMPLATE_ID'        // Replace with your EmailJS template ID
};

let currentMode = 'deep';
let generatedNames = [];
let currentIndustry = '';
let currentUser = null;
let pendingVerification = null;
let verificationTimer = null;
let resetTimer = null;
let pendingPasswordReset = null;

// Mode configurations
const MODE_CONFIG = {
    quick: {
        name: 'QUICK GENERATE',
        icon: '⚡',
        nameCount: 10,
        showAdvancedMetrics: false,
        showTrademarkRisk: false,
        showSEOScore: false,
        processingTime: 1000
    },
    deep: {
        name: 'DEEP ANALYSIS',
        icon: '🧠',
        nameCount: 10,
        showAdvancedMetrics: true,
        showTrademarkRisk: true,
        showSEOScore: true,
        processingTime: 2500
    },
    industry: {
        name: 'INDUSTRY EXPERT',
        icon: '🎯',
        nameCount: 10,
        showAdvancedMetrics: true,
        showTrademarkRisk: true,
        showSEOScore: true,
        processingTime: 2000
    },
    trendy: {
        name: 'TRENDY MODE',
        icon: '🔥',
        nameCount: 10,
        showAdvancedMetrics: true,
        showTrademarkRisk: false,
        showSEOScore: true,
        processingTime: 1500
    },
    professional: {
        name: 'PROFESSIONAL MODE',
        icon: '💼',
        nameCount: 10,
        showAdvancedMetrics: true,
        showTrademarkRisk: true,
        showSEOScore: true,
        processingTime: 2000
    }
};

// Name generation patterns
const namePatterns = {
    modern: ['Nexus', 'Flux', 'Wave', 'Pulse', 'Spark', 'Apex', 'Echo', 'Nova', 'Zephyr', 'Quantum', 'Vertex', 'Lumina'],
    professional: ['Pro', 'Elite', 'Prime', 'Quest', 'Crown', 'Summit', 'Peak', 'Core', 'Vault', 'Trust', 'Expert', 'Maven'],
    creative: ['Craft', 'Studio', 'Lab', 'Collective', 'House', 'Works', 'Co', 'Hub', 'Space', 'Den', 'Loft', 'Atelier'],
    suffixes: ['ify', 'ly', 'wise', 'ster', 'hub', 'spot', 'zone', 'flow', 'sync', 'link', 'cast', 'nest'],
    prefixes: ['Smart', 'Swift', 'Quick', 'Easy', 'True', 'Pure', 'Bold', 'Bright', 'Ultra', 'Meta', 'Omni', 'Hyper'],
    verbs: ['Rise', 'Grow', 'Build', 'Create', 'Launch', 'Thrive', 'Bloom', 'Shine'],
    adjectives: ['Fresh', 'Urban', 'Noble', 'Royal', 'Golden', 'Silver', 'Crystal', 'Premier']
};

// Color palettes
const colorPalettes = {
    tech: [
        { name: 'Primary', colors: ['#2563eb', '#3b82f6', '#60a5fa'] },
        { name: 'Dark Mode', colors: ['#1e293b', '#334155', '#64748b'] },
        { name: 'Accent', colors: ['#8b5cf6', '#a78bfa', '#c4b5fd'] }
    ],
    creative: [
        { name: 'Vibrant', colors: ['#ec4899', '#f59e0b', '#10b981'] },
        { name: 'Warm', colors: ['#f97316', '#fb923c', '#fdba74'] },
        { name: 'Cool', colors: ['#06b6d4', '#22d3ee', '#67e8f9'] }
    ],
    professional: [
        { name: 'Corporate', colors: ['#1e40af', '#3b82f6', '#93c5fd'] },
        { name: 'Elegant', colors: ['#6b21a8', '#9333ea', '#c084fc'] },
        { name: 'Trust', colors: ['#047857', '#10b981', '#6ee7b7'] }
    ],
    fitness: [
        { name: 'Energy', colors: ['#dc2626', '#ef4444', '#f87171'] },
        { name: 'Fresh', colors: ['#16a34a', '#22c55e', '#86efac'] },
        { name: 'Dynamic', colors: ['#ea580c', '#f97316', '#fb923c'] }
    ]
};

// Industry templates
const industryTemplates = {
    'Tech Startup': {
        keywords: ['tech', 'app', 'digital', 'cloud', 'data', 'code', 'software'],
        style: 'modern',
        colorPalette: 'tech'
    },
    'Coffee Shop': {
        keywords: ['brew', 'bean', 'roast', 'cafe', 'espresso', 'java'],
        style: 'creative',
        colorPalette: 'creative'
    },
    'Fitness Studio': {
        keywords: ['fit', 'strong', 'power', 'vital', 'peak', 'energy'],
        style: 'professional',
        colorPalette: 'fitness'
    },
    'Fashion Brand': {
        keywords: ['style', 'chic', 'vogue', 'luxe', 'mode', 'couture'],
        style: 'creative',
        colorPalette: 'creative'
    },
    'Restaurant': {
        keywords: ['taste', 'flavor', 'kitchen', 'bistro', 'table', 'dish'],
        style: 'professional',
        colorPalette: 'creative'
    },
    'Beauty Salon': {
        keywords: ['beauty', 'glow', 'luxe', 'belle', 'charm', 'allure'],
        style: 'creative',
        colorPalette: 'creative'
    },
    'Marketing Agency': {
        keywords: ['brand', 'grow', 'impact', 'reach', 'engage', 'amplify'],
        style: 'professional',
        colorPalette: 'professional'
    },
    'Photography Studio': {
        keywords: ['lens', 'focus', 'frame', 'capture', 'vision', 'light'],
        style: 'creative',
        colorPalette: 'creative'
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
    
    checkUserSession();
    initializeAuthSystem();
    initializeCookieSettings();
    
    const modeCards = document.querySelectorAll('.mode-card');
    modeCards.forEach(card => {
        const modeSelectBtn = card.querySelector('.mode-select-btn');
        modeSelectBtn.addEventListener('click', () => {
            const mode = card.getAttribute('data-mode');
            if (mode === 'help') {
                showHelpGuide();
            } else {
                selectMode(mode);
            }
        });
    });
    
    const changeModeBtn = document.getElementById('changeModeBtn');
    if (changeModeBtn) {
        changeModeBtn.addEventListener('click', () => {
            document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
            document.getElementById('modeSelection').classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    const templateButtons = document.querySelectorAll('.template-btn');
    templateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            templateButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const industry = btn.getAttribute('data-industry');
            document.getElementById('businessTopic').value = industry;
        });
    });
    
    document.getElementById('generateBtn').addEventListener('click', generateBusinessNames);
    document.getElementById('startOverBtn').addEventListener('click', startOver);
    
    document.getElementById('businessTopic').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateBusinessNames();
        }
    });
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
}

function selectMode(mode) {
    currentMode = mode;
    const modeInfo = MODE_CONFIG[mode];
    
    document.getElementById('selectedModeText').textContent = `Mode: ${modeInfo.name} ${modeInfo.icon}`;
    
    document.getElementById('modeSelection').classList.remove('active');
    document.getElementById('step1').classList.add('active');
    
    setTimeout(() => {
        document.getElementById('businessTopic').focus();
    }, 300);
    
    document.getElementById('step1').scrollIntoView({ behavior: 'smooth' });
}

function showHelpGuide() {
    alert(`🎯 MODE DESCRIPTIONS:

⚡ QUICK GENERATE:
- Best for: Fast brainstorming sessions
- Features: 10 instant names with basic domain suggestions
- Time: < 1 second

🧠 DEEP ANALYSIS (RECOMMENDED):
- Best for: Serious brand planning
- Features: Comprehensive trademark risk assessment, SEO scoring, originality analysis, logo concepts
- Time: 2-3 seconds

🎯 INDUSTRY EXPERT:
- Best for: Niche-specific businesses
- Features: Industry-optimized names, competitor analysis insights, market trend alignment
- Time: 2 seconds

🔥 TRENDY MODE:
- Best for: Social media brands, Gen Z audience
- Features: Viral-ready names, social handle availability, modern appeal scoring
- Time: 1-2 seconds

💼 PROFESSIONAL MODE:
- Best for: B2B, enterprise, corporate brands
- Features: Enterprise-grade names, global appeal rating, international trademark check
- Time: 2 seconds`);
}

function generateBusinessNames() {
    const topic = document.getElementById('businessTopic').value.trim();
    
    if (!topic) {
        alert('⚠️ Please enter a business topic/industry first!');
        document.getElementById('businessTopic').focus();
        return;
    }

    currentIndustry = topic;
    
    showProcessingOverlay();
    
    const modeInfo = MODE_CONFIG[currentMode];
    setTimeout(() => {
        generatedNames = createNames(topic, currentMode);
        
        hideProcessingOverlay();
        
        showStep('step2');
        displayNamesAdvanced(generatedNames);
        updateMetricsDashboard(generatedNames);
        
        setTimeout(() => {
            showStep('step3');
            displayAnalysis(generatedNames);
        }, 500);
        
        setTimeout(() => {
            showStep('step4');
            displayTopRecommendations(generatedNames);
        }, 1000);
        
        setTimeout(() => {
            showStep('step5');
            displayBranding(generatedNames.slice(0, 3));
        }, 1500);
        
        setTimeout(() => {
            showStep('step6');
            document.getElementById('step6').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 2000);
    }, modeInfo.processingTime);
}

function showProcessingOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'processing-overlay';
    overlay.id = 'processingOverlay';
    overlay.innerHTML = `
        <div class="processing-content">
            <div class="processing-spinner"></div>
            <div class="processing-text">🤖 AI Processing...</div>
            <div class="processing-subtext">Analyzing names, checking domains, assessing trademark risks</div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function hideProcessingOverlay() {
    const overlay = document.getElementById('processingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

function updateMetricsDashboard(names) {
    const avgOriginality = Math.round(names.reduce((sum, n) => sum + n.originality, 0) / names.length);
    const avgMemorability = Math.round(names.reduce((sum, n) => sum + n.memorability, 0) / names.length * 10) / 10;
    const domainAvailable = names.filter(n => n.domainLikelihood === 'High').length;
    const avgSEO = Math.round(names.reduce((sum, n) => sum + n.seoScore, 0) / names.length);
    
    animateValue('avgOriginality', 0, avgOriginality, 1000, '/100');
    animateValue('domainAvailable', 0, domainAvailable, 1000, '/10');
    animateValue('avgMemorability', 0, avgMemorability, 1000, '/10');
    animateValue('seoScore', 0, avgSEO, 1000, '%');
}

function animateValue(id, start, end, duration, suffix = '') {
    const element = document.getElementById(id);
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current * 10) / 10 + suffix;
    }, 16);
}

function createNames(topic, mode) {
    const names = [];
    const topicWords = topic.toLowerCase().split(' ');
    const mainWord = capitalizeFirst(topicWords[0]);
    
    // Pattern 1: Modern combinations
    names.push({
        name: `${namePatterns.modern[Math.floor(Math.random() * namePatterns.modern.length)]}${mainWord}`,
        style: 'Modern',
        explanation: 'Combines a contemporary prefix with your industry keyword for a sleek, tech-forward feel.',
        targetAudience: 'Young professionals, tech-savvy consumers, early adopters',
        memorability: 8,
        originality: randomBetween(75, 95),
        domainLikelihood: 'High',
        seoScore: randomBetween(70, 90),
        trademarkRisk: 'Low',
        internationalAppeal: randomBetween(80, 95),
        expansionPotential: 'High'
    });
    
    // Pattern 2: Professional
    names.push({
        name: `${mainWord}${namePatterns.professional[Math.floor(Math.random() * namePatterns.professional.length)]}`,
        style: 'Professional',
        explanation: 'Projects authority and expertise with a professional suffix that builds trust.',
        targetAudience: 'Corporate clients, professionals, B2B customers',
        memorability: 7,
        originality: randomBetween(65, 85),
        domainLikelihood: 'Medium',
        seoScore: randomBetween(75, 92),
        trademarkRisk: 'Medium',
        internationalAppeal: randomBetween(85, 98),
        expansionPotential: 'High'
    });
    
    // Pattern 3: Creative
    names.push({
        name: `${mainWord} ${namePatterns.creative[Math.floor(Math.random() * namePatterns.creative.length)]}`,
        style: 'Creative',
        explanation: 'Uses a creative suffix to emphasize craftsmanship and artisanal quality.',
        targetAudience: 'Creative professionals, lifestyle consumers, millennials',
        memorability: 9,
        originality: randomBetween(80, 95),
        domainLikelihood: 'High',
        seoScore: randomBetween(65, 85),
        trademarkRisk: 'Low',
        internationalAppeal: randomBetween(70, 88),
        expansionPotential: 'Medium'
    });
    
    // Pattern 4: Prefix combo
    names.push({
        name: `${namePatterns.prefixes[Math.floor(Math.random() * namePatterns.prefixes.length)]}${mainWord}`,
        style: 'Modern',
        explanation: 'Positive prefix creates an impression of efficiency and innovation.',
        targetAudience: 'Busy professionals, convenience-seekers, modern consumers',
        memorability: 7,
        originality: randomBetween(70, 88),
        domainLikelihood: 'Medium',
        seoScore: randomBetween(68, 86),
        trademarkRisk: 'Medium',
        internationalAppeal: randomBetween(75, 90),
        expansionPotential: 'High'
    });
    
    // Pattern 5: Suffix modification
    const baseName = topicWords[0].replace(/s$/i, '');
    names.push({
        name: `${capitalizeFirst(baseName)}${namePatterns.suffixes[Math.floor(Math.random() * namePatterns.suffixes.length)]}`,
        style: 'Modern',
        explanation: 'Trendy suffix makes the name catchy, brandable, and startup-friendly.',
        targetAudience: 'Digital natives, app users, online shoppers',
        memorability: 8,
        originality: randomBetween(85, 98),
        domainLikelihood: 'High',
        seoScore: randomBetween(72, 90),
        trademarkRisk: 'Low',
        internationalAppeal: randomBetween(65, 82),
        expansionPotential: 'Medium'
    });
    
    // Pattern 6: Compound word
    const secondWord = namePatterns.modern[Math.floor(Math.random() * namePatterns.modern.length)];
    names.push({
        name: `${mainWord}${secondWord}`,
        style: 'Professional',
        explanation: 'Fuses two strong words to create a unique, memorable compound brand.',
        targetAudience: 'Broad market appeal, cross-demographic',
        memorability: 8,
        originality: randomBetween(78, 92),
        domainLikelihood: 'High',
        seoScore: randomBetween(70, 88),
        trademarkRisk: 'Low',
        internationalAppeal: randomBetween(80, 94),
        expansionPotential: 'High'
    });
    
    // Pattern 7: Double word with adjective
    names.push({
        name: `${namePatterns.adjectives[Math.floor(Math.random() * namePatterns.adjectives.length)]} ${mainWord}`,
        style: 'Professional',
        explanation: 'Classic two-word format with descriptive adjective is clear and memorable.',
        targetAudience: 'Traditional customers, established market segments',
        memorability: 9,
        originality: randomBetween(60, 78),
        domainLikelihood: 'Medium',
        seoScore: randomBetween(80, 95),
        trademarkRisk: 'Medium',
        internationalAppeal: randomBetween(88, 97),
        expansionPotential: 'High'
    });
    
    // Pattern 8: Abstract
    const abstract = generateAbstractName(topic);
    names.push({
        name: abstract,
        style: 'Creative',
        explanation: 'Abstract name creates intrigue and allows for broader brand evolution.',
        targetAudience: 'Curious consumers, brand-conscious buyers',
        memorability: 6,
        originality: randomBetween(90, 100),
        domainLikelihood: 'High',
        seoScore: randomBetween(55, 75),
        trademarkRisk: 'Low',
        internationalAppeal: randomBetween(70, 88),
        expansionPotential: 'Very High'
    });
    
    // Pattern 9: Verb + Noun
    names.push({
        name: `${namePatterns.verbs[Math.floor(Math.random() * namePatterns.verbs.length)]} ${mainWord}`,
        style: 'Professional',
        explanation: 'Action verb conveys growth, dynamism, and forward momentum.',
        targetAudience: 'Ambitious customers, growth-minded clients',
        memorability: 8,
        originality: randomBetween(68, 85),
        domainLikelihood: 'Medium',
        seoScore: randomBetween(75, 90),
        trademarkRisk: 'Medium',
        internationalAppeal: randomBetween(82, 93),
        expansionPotential: 'High'
    });
    
    // Pattern 10: Premium feel
    names.push({
        name: `The ${mainWord} ${namePatterns.creative[5]}`,
        style: 'Professional',
        explanation: 'The definite article "The" suggests establishment, authority, and premium quality.',
        targetAudience: 'Premium customers, quality-conscious buyers',
        memorability: 9,
        originality: randomBetween(70, 88),
        domainLikelihood: 'Low',
        seoScore: randomBetween(78, 92),
        trademarkRisk: 'High',
        internationalAppeal: randomBetween(75, 90),
        expansionPotential: 'Medium'
    });
    
    names.forEach((name, index) => {
        name.rank = index + 1;
        adjustForMode(name, mode);
    });
    
    return names.sort((a, b) => b.originality - a.originality);
}

function adjustForMode(name, mode) {
    switch(mode) {
        case 'trendy':
            name.seoScore += 5;
            name.memorability += 1;
            break;
        case 'professional':
            name.internationalAppeal += 5;
            name.trademarkRisk = name.trademarkRisk === 'High' ? 'Medium' : name.trademarkRisk;
            break;
        case 'industry':
            name.originality += 5;
            break;
    }
    
    name.originality = Math.min(100, name.originality);
    name.seoScore = Math.min(100, name.seoScore);
    name.internationalAppeal = Math.min(100, name.internationalAppeal);
}

function generateAbstractName(topic) {
    const syllables = ['zen', 'vy', 'za', 'xi', 'ko', 'ri', 'mo', 'lu', 'fy', 'zo'];
    const prefix = syllables[Math.floor(Math.random() * syllables.length)];
    const suffix = syllables[Math.floor(Math.random() * syllables.length)];
    return capitalizeFirst(prefix + suffix);
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function showStep(stepId) {
    document.getElementById(stepId).classList.add('active');
}

function displayNamesAdvanced(names) {
    const container = document.getElementById('namesList');
    container.innerHTML = '';
    
    const modeInfo = MODE_CONFIG[currentMode];
    
    names.forEach((nameObj, index) => {
        const card = document.createElement('div');
        card.className = 'name-card-advanced';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="rank-badge">#${index + 1}</div>
            <span class="style-tag">${nameObj.style}</span>
            <h3>${nameObj.name}</h3>
            
            <div class="advanced-metrics">
                <div class="advanced-metric">
                    <div class="advanced-metric-label">Originality</div>
                    <div class="advanced-metric-value">${nameObj.originality}/100</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${nameObj.originality}%"></div>
                    </div>
                </div>
                
                <div class="advanced-metric">
                    <div class="advanced-metric-label">SEO Score</div>
                    <div class="advanced-metric-value">${nameObj.seoScore}%</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${nameObj.seoScore}%"></div>
                    </div>
                </div>
                
                <div class="advanced-metric">
                    <div class="advanced-metric-label">Domain Availability</div>
                    <div class="advanced-metric-value">${nameObj.domainLikelihood}</div>
                </div>
                
                <div class="advanced-metric">
                    <div class="advanced-metric-label">International Appeal</div>
                    <div class="advanced-metric-value">${nameObj.internationalAppeal}/100</div>
                </div>
            </div>
            
            ${modeInfo.showTrademarkRisk ? `
            <div class="risk-indicators">
                <span class="risk-badge risk-${nameObj.trademarkRisk.toLowerCase()}">
                    ⚠️ Trademark Risk: ${nameObj.trademarkRisk}
                </span>
                <span class="risk-badge risk-low">
                    🚀 Expansion: ${nameObj.expansionPotential}
                </span>
            </div>
            ` : ''}
        `;
        
        container.appendChild(card);
    });
}

function displayAnalysis(names) {
    const container = document.getElementById('analysisContainer');
    container.innerHTML = '';
    
    names.forEach((nameObj, index) => {
        const card = document.createElement('div');
        card.className = 'analysis-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <h3>${index + 1}. ${nameObj.name}</h3>
            <p class="explanation"><strong>💡 Why it works:</strong> ${nameObj.explanation}</p>
            <div class="analysis-meta">
                <div class="meta-item">
                    <strong>🎯 Target Audience</strong>
                    <span>${nameObj.targetAudience}</span>
                </div>
                <div class="meta-item">
                    <strong>⭐ Memorability Score</strong>
                    <span>${nameObj.memorability}/10</span>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${nameObj.memorability * 10}%"></div>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function displayTopRecommendations(names) {
    const container = document.getElementById('topRecommendations');
    container.innerHTML = '';
    
    const topThree = names.slice(0, 3);
    
    topThree.forEach((nameObj, index) => {
        const card = document.createElement('div');
        card.className = 'top-card';
        card.setAttribute('data-rank', `#${index + 1}`);
        
        const baseName = nameObj.name.toLowerCase().replace(/\s+/g, '');
        const domains = [
            `${baseName}.com`,
            `${baseName}.io`,
            `${baseName}.co`,
            `get${baseName}.com`,
            `${baseName}app.com`,
            `try${baseName}.com`
        ];
        
        card.innerHTML = `
            <h3>${nameObj.name}</h3>
            <p class="reason">
                <strong>🌟 Why we recommend this:</strong><br>
                This name scores exceptionally high in originality (${nameObj.originality}/100) and 
                resonates perfectly with your target audience: ${nameObj.targetAudience}. 
                Its ${nameObj.style.toLowerCase()} style makes it versatile across marketing channels
                while maintaining strong brand identity.
            </p>
            
            <div class="domain-suggestions">
                <h4>🌐 Domain Suggestions</h4>
                <div class="domain-list">
                    ${domains.map(domain => `<span class="domain-tag">${domain}</span>`).join('')}
                </div>
            </div>
            
            <div class="industry-fit">
                ✓ Perfect fit for ${currentIndustry} industry
            </div>
        `;
        
        card.addEventListener('click', () => {
            document.querySelectorAll('.top-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            checkSocialMedia(nameObj.name);
        });
        
        container.appendChild(card);
    });
}

function checkSocialMedia(businessName) {
    const username = businessName.toLowerCase().replace(/\s+/g, '');
    const container = document.getElementById('socialCheckerResults');
    
    const platforms = [
        { name: 'Instagram', icon: '📷', url: `https://www.instagram.com/${username}` },
        { name: 'Twitter/X', icon: '🐦', url: `https://twitter.com/${username}` },
        { name: 'Facebook', icon: '📘', url: `https://www.facebook.com/${username}` },
        { name: 'TikTok', icon: '🎵', url: `https://www.tiktok.com/@${username}` },
        { name: 'YouTube', icon: '▶️', url: `https://www.youtube.com/@${username}` },
        { name: 'LinkedIn', icon: '💼', url: `https://www.linkedin.com/company/${username}` }
    ];
    
    container.innerHTML = `
        <p style="margin-bottom: 1rem; color: var(--gray);">Checking username: <strong>@${username}</strong></p>
    `;
    
    platforms.forEach(platform => {
        const platformDiv = document.createElement('div');
        platformDiv.className = 'social-platform';
        platformDiv.innerHTML = `
            <h4>${platform.icon} ${platform.name}</h4>
            <a href="${platform.url}" target="_blank">Visit ${platform.name} →</a>
        `;
        container.appendChild(platformDiv);
    });
}

function displayBranding(names) {
    const container = document.getElementById('brandingContainer');
    container.innerHTML = '';
    
    names.forEach((nameObj) => {
        const card = document.createElement('div');
        card.className = 'branding-card';
        
        const taglines = generateTaglines(nameObj.name, currentIndustry);
        const logoConcepts = generateLogoConcepts(nameObj.name);
        const palette = getColorPalette(currentIndustry);
        
        card.innerHTML = `
            <h3>${nameObj.name}</h3>
            
            <div class="taglines">
                <h4>💬 Catchy Taglines</h4>
                ${taglines.map(tag => `<div class="tagline-item">"${tag}"</div>`).join('')}
            </div>
            
            <div class="logo-concepts">
                <h4>🎨 Logo Concept Ideas</h4>
                ${logoConcepts.map(concept => `<div class="concept-item">${concept}</div>`).join('')}
            </div>
            
            <div class="color-schemes">
                <h4>🌈 Suggested Color Scheme</h4>
                <div class="color-palette">
                    ${palette.colors.map(color => 
                        `<div class="color-box" style="background-color: ${color}">${color}</div>`
                    ).join('')}
                </div>
                <p style="margin-top: 1rem; color: var(--gray);">
                    <strong>${palette.name} Palette</strong> - Perfect for creating visual harmony and brand recognition
                </p>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function generateTaglines(name, industry) {
    const taglineTemplates = [
        `Where ${industry} Meets Excellence`,
        `Your Trusted ${industry} Partner`,
        `Elevating ${industry} Experience`,
        `${industry} Done Right`,
        `Innovation in Every ${industry}`
    ];
    
    return taglineTemplates.slice(0, 5);
}

function generateLogoConcepts(name) {
    return [
        `📍 Minimalist wordmark with custom typography emphasizing the first letter`,
        `📍 Abstract icon representing growth/connection paired with clean text`,
        `📍 Geometric symbol incorporating industry elements with modern aesthetic`
    ];
}

function getColorPalette(industry) {
    const industryLower = industry.toLowerCase();
    
    if (industryLower.includes('tech') || industryLower.includes('software') || industryLower.includes('app')) {
        return colorPalettes.tech[0];
    } else if (industryLower.includes('fitness') || industryLower.includes('gym') || industryLower.includes('health')) {
        return colorPalettes.fitness[0];
    } else if (industryLower.includes('creative') || industryLower.includes('design') || industryLower.includes('art')) {
        return colorPalettes.creative[0];
    } else {
        return colorPalettes.professional[0];
    }
}

function startOver() {
    document.getElementById('businessTopic').value = '';
    
    document.querySelectorAll('.template-btn').forEach(btn => btn.classList.remove('active'));
    
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    document.getElementById('modeSelection').classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initializeAuthSystem() {
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const signInModal = document.getElementById('signInModal');
    const signUpModal = document.getElementById('signUpModal');
    const switchToSignUp = document.getElementById('switchToSignUp');
    const switchToSignIn = document.getElementById('switchToSignIn');
    
    signInBtn.addEventListener('click', () => openModal('signInModal'));
    signUpBtn.addEventListener('click', () => openModal('signUpModal'));
    logoutBtn.addEventListener('click', logout);
    
    switchToSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('signInModal');
        openModal('signUpModal');
    });
    
    switchToSignIn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('signUpModal');
        openModal('signInModal');
    });
    
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            closeModal(modalId);
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('auth-modal')) {
            closeModal(e.target.id);
        }
    });
    
    document.getElementById('signInForm').addEventListener('submit', handleSignIn);
    document.getElementById('signUpForm').addEventListener('submit', handleSignUp);
    
    // Verification form
    document.getElementById('verificationForm').addEventListener('submit', handleVerification);
    document.getElementById('resendCode').addEventListener('click', (e) => {
        e.preventDefault();
        resendVerificationCode();
    });
    
    // Password reset forms
    document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('signInModal');
        openModal('forgotPasswordModal');
    });
    
    document.getElementById('forgotPasswordForm').addEventListener('submit', handleForgotPassword);
    document.getElementById('resetVerificationForm').addEventListener('submit', handleResetVerification);
    document.getElementById('newPasswordForm').addEventListener('submit', handleNewPassword);
    
    document.getElementById('resendResetCode').addEventListener('click', (e) => {
        e.preventDefault();
        resendPasswordResetCode();
    });
    
    // Password strength for new password
    const newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', () => {
            updatePasswordStrengthForField('newPassword', 'newPasswordStrengthBar', 'newPasswordStrengthText');
        });
    }
    
    // Password confirmation validation
    const signUpConfirmPassword = document.getElementById('signUpConfirmPassword');
    const newConfirmPassword = document.getElementById('confirmNewPassword');
    
    if (signUpConfirmPassword) {
        signUpConfirmPassword.addEventListener('input', () => {
            validatePasswordMatch('signUpPassword', 'signUpConfirmPassword');
        });
    }
    
    if (newConfirmPassword) {
        newConfirmPassword.addEventListener('input', () => {
            validatePasswordMatch('newPassword', 'confirmNewPassword');
        });
    }
    
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (input.type === 'password') {
                input.type = 'text';
                btn.querySelector('.eye-icon').textContent = '🙈';
            } else {
                input.type = 'password';
                btn.querySelector('.eye-icon').textContent = '👁️';
            }
        });
    });
    
    const signUpPassword = document.getElementById('signUpPassword');
    signUpPassword.addEventListener('input', updatePasswordStrength);
    
    document.querySelectorAll('.social-auth-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Social authentication coming soon! 🚀');
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cookie Settings Initialization
function initializeCookieSettings() {
    const cookieSettingsBtn = document.getElementById('cookieSettingsBtn');
    if (cookieSettingsBtn && typeof cookieManager !== 'undefined') {
        cookieSettingsBtn.addEventListener('click', () => {
            cookieManager.showPreferencesModal();
        });
    }
    
    // Terms of Service and Privacy Policy links
    const viewTermsLink = document.getElementById('viewTermsLink');
    const viewPrivacyLink = document.getElementById('viewPrivacyLink');
    
    if (viewTermsLink && typeof cookieManager !== 'undefined') {
        viewTermsLink.addEventListener('click', (e) => {
            e.preventDefault();
            cookieManager.showTermsOfService();
        });
    }
    
    if (viewPrivacyLink && typeof cookieManager !== 'undefined') {
        viewPrivacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            cookieManager.showPrivacyPolicy();
        });
    }
    
    // Footer links
    const footerTermsLink = document.getElementById('footerTermsLink');
    const footerPrivacyLink = document.getElementById('footerPrivacyLink');
    const footerCookiesLink = document.getElementById('footerCookiesLink');
    
    if (footerTermsLink && typeof cookieManager !== 'undefined') {
        footerTermsLink.addEventListener('click', (e) => {
            e.preventDefault();
            cookieManager.showTermsOfService();
        });
    }
    
    if (footerPrivacyLink && typeof cookieManager !== 'undefined') {
        footerPrivacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            cookieManager.showPrivacyPolicy();
        });
    }
    
    if (footerCookiesLink && typeof cookieManager !== 'undefined') {
        footerCookiesLink.addEventListener('click', (e) => {
            e.preventDefault();
            cookieManager.showPreferencesModal();
        });
    }
}

function handleSignUp(e) {
    e.preventDefault();
    
    const name = document.getElementById('signUpName').value.trim();
    const email = document.getElementById('signUpEmail').value.trim();
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById('signUpConfirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Validate name
    if (!name || name.length < 2) {
        alert('⚠️ Please enter a valid name (at least 2 characters)');
        document.getElementById('signUpName').focus();
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('⚠️ Please enter a valid email address');
        document.getElementById('signUpEmail').focus();
        return;
    }
    
    // Validate password length
    if (password.length < 6) {
        alert('⚠️ Password must be at least 6 characters long');
        document.getElementById('signUpPassword').focus();
        return;
    }
    
    // Validate password confirmation
    if (!confirmPassword) {
        alert('⚠️ Please confirm your password');
        document.getElementById('signUpConfirmPassword').focus();
        return;
    }
    
    if (password !== confirmPassword) {
        alert('⚠️ Passwords do not match! Please make sure both passwords are identical.');
        document.getElementById('signUpConfirmPassword').focus();
        document.getElementById('signUpConfirmPassword').select();
        return;
    }
    
    // Validate terms agreement
    if (!agreeTerms) {
        alert('⚠️ Please agree to the Terms of Service and Privacy Policy');
        return;
    }
    
    let users = JSON.parse(localStorage.getItem('zynstro_users') || '[]');
    
    if (users.find(u => u.email === email)) {
        alert('⚠️ An account with this email already exists!');
        document.getElementById('signUpEmail').focus();
        return;
    }
    
    // Store pending user data
    pendingVerification = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: btoa(password),
        createdAt: new Date().toISOString(),
        savedNames: [],
        verified: false
    };
    
    // Send verification email
    sendVerificationEmail(name, email);
}

function handleSignIn(e) {
    e.preventDefault();
    
    const email = document.getElementById('signInEmail').value.trim();
    const password = document.getElementById('signInPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    const users = JSON.parse(localStorage.getItem('zynstro_users') || '[]');
    
    const user = users.find(u => u.email === email && u.password === btoa(password));
    
    if (!user) {
        alert('⚠️ Invalid email or password!');
        return;
    }
    
    currentUser = user;
    
    if (rememberMe) {
        localStorage.setItem('zynstro_currentUser', JSON.stringify(currentUser));
    } else {
        sessionStorage.setItem('zynstro_currentUser', JSON.stringify(currentUser));
    }
    
    closeModal('signInModal');
    updateUIForUser();
    
    showSuccessMessage(`👋 Welcome back, ${user.name}!`);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('zynstro_currentUser');
    sessionStorage.removeItem('zynstro_currentUser');
    
    updateUIForUser();
    
    showSuccessMessage('👋 You have been logged out successfully!');
}

function checkUserSession() {
    const savedUser = localStorage.getItem('zynstro_currentUser') || 
                      sessionStorage.getItem('zynstro_currentUser');
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForUser();
    }
}

function updateUIForUser() {
    const authButtons = document.querySelector('.auth-buttons');
    const userProfile = document.getElementById('userProfile');
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const userNameDisplay = document.getElementById('userNameDisplay');
    
    if (currentUser) {
        signInBtn.style.display = 'none';
        signUpBtn.style.display = 'none';
        userProfile.style.display = 'flex';
        userNameDisplay.textContent = `👋 ${currentUser.name}`;
    } else {
        signInBtn.style.display = 'block';
        signUpBtn.style.display = 'block';
        userProfile.style.display = 'none';
    }
}

function updatePasswordStrength() {
    updatePasswordStrengthForField('signUpPassword', 'strengthBar', 'strengthText');
}

function updatePasswordStrengthForField(inputId, barId, textId) {
    const password = document.getElementById(inputId).value;
    const strengthBar = document.getElementById(barId);
    const strengthText = document.getElementById(textId);
    
    let strength = 0;
    let text = '';
    
    if (password.length === 0) {
        strengthBar.className = 'strength-fill';
        strengthText.textContent = '';
        strengthText.className = 'strength-text';
        return;
    }
    
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength <= 2) {
        strengthBar.className = 'strength-fill weak';
        strengthText.textContent = '⚠️ Weak password';
        strengthText.className = 'strength-text weak';
    } else if (strength <= 3) {
        strengthBar.className = 'strength-fill medium';
        strengthText.textContent = '✓ Medium strength';
        strengthText.className = 'strength-text medium';
    } else {
        strengthBar.className = 'strength-fill strong';
        strengthText.textContent = '✓ Strong password';
        strengthText.className = 'strength-text strong';
    }
}

function validatePasswordMatch(passwordId, confirmPasswordId) {
    const password = document.getElementById(passwordId).value;
    const confirmPassword = document.getElementById(confirmPasswordId).value;
    const confirmInput = document.getElementById(confirmPasswordId);
    
    // Don't show anything if confirm password is empty
    if (confirmPassword.length === 0) {
        confirmInput.style.borderColor = '';
        removePasswordMatchIndicator(confirmPasswordId);
        return;
    }
    
    // Check if passwords match
    if (password === confirmPassword) {
        // Passwords match - show green border
        confirmInput.style.borderColor = '#10b981';
        confirmInput.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
        showPasswordMatchIndicator(confirmPasswordId, true);
    } else {
        // Passwords don't match - show red border
        confirmInput.style.borderColor = '#ef4444';
        confirmInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        showPasswordMatchIndicator(confirmPasswordId, false);
    }
}

function showPasswordMatchIndicator(confirmPasswordId, isMatch) {
    // Remove existing indicator
    removePasswordMatchIndicator(confirmPasswordId);
    
    const confirmInput = document.getElementById(confirmPasswordId);
    const wrapper = confirmInput.closest('.password-input-wrapper') || confirmInput.parentElement;
    
    const indicator = document.createElement('div');
    indicator.className = 'password-match-indicator';
    indicator.id = `match-indicator-${confirmPasswordId}`;
    
    if (isMatch) {
        indicator.innerHTML = '<span style="color: #10b981; font-size: 0.875rem; font-weight: 600;">✓ Passwords match</span>';
    } else {
        indicator.innerHTML = '<span style="color: #ef4444; font-size: 0.875rem; font-weight: 600;">✗ Passwords do not match</span>';
    }
    
    indicator.style.cssText = `
        margin-top: 0.5rem;
        animation: fadeIn 0.3s ease;
    `;
    
    wrapper.parentNode.insertBefore(indicator, wrapper.nextSibling);
}

function removePasswordMatchIndicator(confirmPasswordId) {
    const existingIndicator = document.getElementById(`match-indicator-${confirmPasswordId}`);
    if (existingIndicator) {
        existingIndicator.remove();
    }
}

function showSuccessMessage(message) {
    const existingMessage = document.querySelector('.success-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        z-index: 3000;
        font-weight: 600;
        animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Email Verification Functions
function sendVerificationEmail(name, email) {
    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store verification code with expiry (10 minutes)
    const verificationData = {
        code: verificationCode,
        email: email,
        expiresAt: Date.now() + (10 * 60 * 1000), // 10 minutes
        attempts: 0
    };
    localStorage.setItem('zynstro_verification', JSON.stringify(verificationData));
    
    // Check if EmailJS is configured
    if (typeof emailjs === 'undefined' || EMAILJS_CONFIG.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
        // Demo mode - show code in console and alert
        console.log('='.repeat(50));
        console.log('DEMO MODE: Email Verification');
        console.log('='.repeat(50));
        console.log(`Verification Code: ${verificationCode}`);
        console.log(`Email: ${email}`);
        console.log(`Name: ${name}`);
        console.log('='.repeat(50));
        
        showSuccessMessage(`📧 Demo Mode: Check console for verification code`);
        alert(`DEMO MODE

Your verification code is: ${verificationCode}

(In production, this would be sent to ${email})`);
        
        closeModal('signUpModal');
        openModal('verificationModal');
        document.getElementById('verificationEmail').textContent = email;
        startVerificationTimer();
        return;
    }
    
    // Send email using EmailJS
    const templateParams = {
        to_name: name,
        to_email: email,
        verification_code: verificationCode,
        app_name: 'Zynstro',
        year: new Date().getFullYear()
    };
    
    // Show loading
    showLoadingMessage('📧 Sending verification email...');
    
    emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, templateParams)
        .then((response) => {
            console.log('Email sent successfully:', response);
            closeModal('signUpModal');
            openModal('verificationModal');
            document.getElementById('verificationEmail').textContent = email;
            startVerificationTimer();
            showSuccessMessage('✅ Verification code sent to your email!');
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            alert('⚠️ Failed to send verification email. Please try again.');
        });
}

function startVerificationTimer() {
    let timeLeft = 600; // 10 minutes in seconds
    const timerDisplay = document.getElementById('timerDisplay');
    
    if (verificationTimer) {
        clearInterval(verificationTimer);
    }
    
    verificationTimer = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(verificationTimer);
            timerDisplay.textContent = 'Expired';
            timerDisplay.style.color = '#ef4444';
        }
    }, 1000);
}

function handleVerification(e) {
    e.preventDefault();
    
    const enteredCode = document.getElementById('verificationCode').value.trim();
    const verificationData = JSON.parse(localStorage.getItem('zynstro_verification') || '{}');
    
    if (!verificationData.code) {
        alert('⚠️ No verification code found. Please sign up again.');
        closeModal('verificationModal');
        openModal('signUpModal');
        return;
    }
    
    // Check if code expired
    if (Date.now() > verificationData.expiresAt) {
        alert('⚠️ Verification code has expired. Please request a new one.');
        localStorage.removeItem('zynstro_verification');
        return;
    }
    
    // Check attempts
    if (verificationData.attempts >= 5) {
        alert('⚠️ Too many failed attempts. Please request a new code.');
        localStorage.removeItem('zynstro_verification');
        return;
    }
    
    // Verify code
    if (enteredCode === verificationData.code) {
        // Code is correct
        pendingVerification.verified = true;
        
        // Save user to storage
        let users = JSON.parse(localStorage.getItem('zynstro_users') || '[]');
        users.push(pendingVerification);
        localStorage.setItem('zynstro_users', JSON.stringify(users));
        
        // Set as current user
        currentUser = pendingVerification;
        localStorage.setItem('zynstro_currentUser', JSON.stringify(currentUser));
        
        // Clean up
        localStorage.removeItem('zynstro_verification');
        clearInterval(verificationTimer);
        pendingVerification = null;
        
        // Close modal and update UI
        closeModal('verificationModal');
        updateUIForUser();
        
        showSuccessMessage('🎉 Email verified! Welcome to Zynstro!');
    } else {
        // Code is incorrect
        verificationData.attempts++;
        localStorage.setItem('zynstro_verification', JSON.stringify(verificationData));
        
        const attemptsLeft = 5 - verificationData.attempts;
        alert(`⚠️ Incorrect verification code. ${attemptsLeft} attempts remaining.`);
        
        if (attemptsLeft === 0) {
            closeModal('verificationModal');
            localStorage.removeItem('zynstro_verification');
        }
    }
}

function resendVerificationCode() {
    if (!pendingVerification) {
        alert('⚠️ No pending verification. Please sign up again.');
        closeModal('verificationModal');
        openModal('signUpModal');
        return;
    }
    
    // Clear old verification data
    localStorage.removeItem('zynstro_verification');
    clearInterval(verificationTimer);
    
    // Reset timer display
    document.getElementById('timerDisplay').style.color = '';
    
    // Send new code
    sendVerificationEmail(pendingVerification.name, pendingVerification.email);
    showSuccessMessage('📧 New verification code sent!');
}

function showLoadingMessage(message) {
    const existingMessage = document.querySelector('.loading-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'loading-toast';
    toast.innerHTML = `
        <div class="spinner-small"></div>
        <span>${message}</span>
    `;
    toast.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #6366f1, #4f46e5);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        z-index: 3000;
        font-weight: 600;
        animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 1rem;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Password Reset Functions
function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value.trim();
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('zynstro_users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
        alert('⚠️ No account found with this email address.');
        return;
    }
    
    // Store pending reset data
    pendingPasswordReset = {
        email: email,
        userId: user.id
    };
    
    // Send reset code
    sendPasswordResetEmail(email);
}

function sendPasswordResetEmail(email) {
    // Generate 6-digit verification code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store reset code with expiry (10 minutes)
    const resetData = {
        code: resetCode,
        email: email,
        expiresAt: Date.now() + (10 * 60 * 1000),
        attempts: 0
    };
    localStorage.setItem('zynstro_password_reset', JSON.stringify(resetData));
    
    // Check if EmailJS is configured
    if (typeof emailjs === 'undefined' || EMAILJS_CONFIG.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
        // Demo mode
        console.log('='.repeat(50));
        console.log('DEMO MODE: Password Reset');
        console.log('='.repeat(50));
        console.log(`Reset Code: ${resetCode}`);
        console.log(`Email: ${email}`);
        console.log('='.repeat(50));
        
        alert(`DEMO MODE

Your password reset code is: ${resetCode}

(In production, this would be sent to ${email})`);
        
        closeModal('forgotPasswordModal');
        openModal('resetVerificationModal');
        document.getElementById('resetVerificationEmail').textContent = email;
        startResetTimer();
        return;
    }
    
    // Send email using EmailJS
    const templateParams = {
        to_email: email,
        verification_code: resetCode,
        app_name: 'Zynstro',
        year: new Date().getFullYear()
    };
    
    showLoadingMessage('📧 Sending reset code...');
    
    emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, templateParams)
        .then((response) => {
            console.log('Reset email sent successfully:', response);
            closeModal('forgotPasswordModal');
            openModal('resetVerificationModal');
            document.getElementById('resetVerificationEmail').textContent = email;
            startResetTimer();
            showSuccessMessage('✅ Reset code sent to your email!');
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            alert('⚠️ Failed to send reset email. Please try again.');
        });
}

function startResetTimer() {
    let timeLeft = 600; // 10 minutes in seconds
    const timerDisplay = document.getElementById('resetTimerDisplay');
    
    if (resetTimer) {
        clearInterval(resetTimer);
    }
    
    resetTimer = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(resetTimer);
            timerDisplay.textContent = 'Expired';
            timerDisplay.style.color = '#ef4444';
        }
    }, 1000);
}

function handleResetVerification(e) {
    e.preventDefault();
    
    const enteredCode = document.getElementById('resetVerificationCode').value.trim();
    const resetData = JSON.parse(localStorage.getItem('zynstro_password_reset') || '{}');
    
    if (!resetData.code) {
        alert('⚠️ No reset code found. Please request a new one.');
        closeModal('resetVerificationModal');
        openModal('forgotPasswordModal');
        return;
    }
    
    // Check if code expired
    if (Date.now() > resetData.expiresAt) {
        alert('⚠️ Reset code has expired. Please request a new one.');
        localStorage.removeItem('zynstro_password_reset');
        closeModal('resetVerificationModal');
        openModal('forgotPasswordModal');
        return;
    }
    
    // Check attempts
    if (resetData.attempts >= 5) {
        alert('⚠️ Too many failed attempts. Please request a new code.');
        localStorage.removeItem('zynstro_password_reset');
        closeModal('resetVerificationModal');
        openModal('forgotPasswordModal');
        return;
    }
    
    // Verify code
    if (enteredCode === resetData.code) {
        // Code is correct
        clearInterval(resetTimer);
        closeModal('resetVerificationModal');
        openModal('newPasswordModal');
        showSuccessMessage('✅ Code verified! Set your new password.');
    } else {
        // Code is incorrect
        resetData.attempts++;
        localStorage.setItem('zynstro_password_reset', JSON.stringify(resetData));
        
        const attemptsLeft = 5 - resetData.attempts;
        alert(`⚠️ Incorrect code. ${attemptsLeft} attempts remaining.`);
        
        if (attemptsLeft === 0) {
            closeModal('resetVerificationModal');
            openModal('forgotPasswordModal');
            localStorage.removeItem('zynstro_password_reset');
        }
    }
}

function handleNewPassword(e) {
    e.preventDefault();
    
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;
    
    // Validate password length
    if (newPassword.length < 6) {
        alert('⚠️ Password must be at least 6 characters long.');
        document.getElementById('newPassword').focus();
        return;
    }
    
    // Validate password confirmation
    if (!confirmPassword) {
        alert('⚠️ Please confirm your new password');
        document.getElementById('confirmNewPassword').focus();
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('⚠️ Passwords do not match! Please make sure both passwords are identical.');
        document.getElementById('confirmNewPassword').focus();
        document.getElementById('confirmNewPassword').select();
        return;
    }
    
    if (!pendingPasswordReset) {
        alert('⚠️ Session expired. Please start over.');
        closeModal('newPasswordModal');
        return;
    }
    
    // Update user password
    let users = JSON.parse(localStorage.getItem('zynstro_users') || '[]');
    const userIndex = users.findIndex(u => u.id === pendingPasswordReset.userId);
    
    if (userIndex === -1) {
        alert('⚠️ User not found. Please try again.');
        return;
    }
    
    // Update password
    users[userIndex].password = btoa(newPassword);
    localStorage.setItem('zynstro_users', JSON.stringify(users));
    
    // Clean up
    localStorage.removeItem('zynstro_password_reset');
    pendingPasswordReset = null;
    
    // Clear form and reset borders
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
    document.getElementById('newPassword').style.borderColor = '';
    document.getElementById('confirmNewPassword').style.borderColor = '';
    removePasswordMatchIndicator('confirmNewPassword');
    
    // Close modal and show success
    closeModal('newPasswordModal');
    openModal('signInModal');
    
    showSuccessMessage('🎉 Password reset successful! Please sign in.');
}

function resendPasswordResetCode() {
    if (!pendingPasswordReset) {
        alert('⚠️ No pending reset. Please start over.');
        closeModal('resetVerificationModal');
        openModal('forgotPasswordModal');
        return;
    }
    
    // Clear old reset data
    localStorage.removeItem('zynstro_password_reset');
    clearInterval(resetTimer);
    
    // Reset timer display
    document.getElementById('resetTimerDisplay').style.color = '';
    
    // Send new code
    sendPasswordResetEmail(pendingPasswordReset.email);
    showSuccessMessage('📧 New reset code sent!');
}
