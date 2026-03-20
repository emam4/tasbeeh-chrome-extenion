try { // guard against "Extension context invalidated" on extension reload

const tasbeehPhrases = [
    'سُبْحَانَ اللَّهِ',
    'الْحَمْدُ لِلَّهِ',
    'لَا إِلَهَ إِلَّا اللَّهُ',
    'اللَّهُ أَكْبَرُ',
    'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    'سُبْحَانَ اللَّهِ الْعَظِيمِ',
    'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ',
    'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ، وَأَتُوبُ إِلَيْهِ',
    'اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد',
    'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ',
    'يَا رَبِّ، لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ، وَلِعَظِيمِ سُلْطَانِكَ',
    'لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءِ قَدِيرِ',
    'حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم',
    'رَضِيتُ بِاللَّهِ رَبَّاً، وَبِالْإِسْلاَمِ دِيناً، وَبِمُحَمَّدٍ ﷺ نَبِيّاً',
    'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنَّا'
];

const themes = {
    modern: {
        bg: '#ffffff',
        color: '#1a1a1a',
        border: '1.5px solid #e0e0e0',
        shadow: '0 8px 32px rgba(0,0,0,0.14)',
        radius: '16px',
        labelColor: '#2e7d52',
        labelBg: '#f1f8f4',
        labelBorder: '1px solid #c8e6c9',
        divider: '#eeeeee',
        closeBg: '#2e7d52',
        closeColor: '#ffffff',
    },
    dark: {
        bg: '#12121f',
        color: '#e8d5a3',
        border: '1px solid rgba(212,175,55,0.35)',
        shadow: '0 0 32px rgba(212,175,55,0.15), 0 8px 24px rgba(0,0,0,0.5)',
        radius: '16px',
        labelColor: '#d4af37',
        labelBg: 'rgba(212,175,55,0.08)',
        labelBorder: '1px solid rgba(212,175,55,0.25)',
        divider: 'rgba(212,175,55,0.15)',
        closeBg: 'rgba(212,175,55,0.15)',
        closeColor: '#d4af37',
    },
    minimal: {
        bg: 'rgba(252,252,252,0.92)',
        color: '#555555',
        border: 'none',
        shadow: '0 2px 16px rgba(0,0,0,0.08)',
        radius: '12px',
        labelColor: '#aaaaaa',
        labelBg: 'transparent',
        labelBorder: '1px solid #ebebeb',
        divider: '#f0f0f0',
        closeBg: '#eeeeee',
        closeColor: '#888888',
    },
};

// Inject animation styles once
if (!document.getElementById('tasbeeh-styles')) {
    try {
        const style = document.createElement('style');
        style.id = 'tasbeeh-styles';
        style.textContent = `
            @keyframes tasbeeh-in {
                from { opacity: 0; transform: translateY(-10px) scale(0.96); }
                to   { opacity: 1; transform: translateY(0)    scale(1);    }
            }
            @keyframes tasbeeh-out {
                from { opacity: 1; transform: translateY(0)    scale(1);    }
                to   { opacity: 0; transform: translateY(-8px) scale(0.97); }
            }
            #tasbeeh-container {
                animation: tasbeeh-in 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
            }
            #tasbeeh-container.hiding {
                animation: tasbeeh-out 0.3s ease forwards;
            }
            #tasbeeh-close:hover {
                opacity: 0.8 !important;
                transform: scale(1.1) !important;
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    } catch (e) {}
}

const getPhrase = (azkarMode, callback) => {
    if (azkarMode === 'morning_evening') {
        const hour = new Date().getHours();
        const isMorning = hour >= 6 && hour < 16;
        const array = isMorning ? azkatAlsabah : azkatAlmasaa;
        const indexKey = isMorning ? 'sabahIndex' : 'masaaIndex';
        const label = isMorning ? '✦ أذكار الصباح' : '✦ أذكار المساء';

        const winKey = `__tasbeeh_${indexKey}`;
        const dateKey = indexKey + 'Date';
        const today = new Date().toDateString();

        const readIndex = (cb) => {
            try {
                if (typeof chrome !== 'undefined' && chrome.storage?.local) {
                    chrome.storage.local.get({ [indexKey]: 0, [dateKey]: '' }, (d) => {
                        if (chrome.runtime?.lastError) { cb(window[winKey] || 0); return; }
                        // Reset index if it's a new day
                        cb(d[dateKey] === today ? d[indexKey] : 0);
                    });
                } else {
                    cb(window[winKey] || 0);
                }
            } catch (e) { cb(window[winKey] || 0); }
        };

        readIndex((index) => {
            const safeIndex = index % array.length;
            const isLast = safeIndex === array.length - 1;

            window[winKey] = index + 1;
            try {
                if (typeof chrome !== 'undefined' && chrome.storage?.local) {
                    chrome.storage.local.set({ [indexKey]: index + 1, [dateKey]: today });
                }
            } catch (e) {}

            // Auto-switch back to general after the last zikr
            if (isLast) {
                window.__tasbeehAzkarMode = 'general';
                try {
                    if (typeof chrome !== 'undefined' && chrome.storage?.sync) {
                        chrome.storage.sync.set({ azkarMode: 'general' });
                    }
                } catch (e) {}
            }

            callback({ text: array[safeIndex].zekr, label });
        });
    } else {
        callback({
            text: tasbeehPhrases[Math.floor(Math.random() * tasbeehPhrases.length)],
            label: '✦ تسبيح',
        });
    }
};

const getSettings = (callback) => {
    const defaults = { theme: 'modern', duration: 15, fontSize: 20, interval: 5, azkarMode: 'general', position: 'top-right' };
    const fromWindow = () => callback({
        theme:     window.__tasbeehTheme     || defaults.theme,
        duration:  window.__tasbeehDuration  || defaults.duration,
        fontSize:  window.__tasbeehFontSize  || defaults.fontSize,
        interval:  window.__tasbeehInterval  || defaults.interval,
        azkarMode: window.__tasbeehAzkarMode || defaults.azkarMode,
        position:  window.__tasbeehPosition  || defaults.position,
    });
    try {
        if (typeof chrome !== 'undefined' && chrome.storage?.sync) {
            chrome.storage.sync.get(defaults, (data) => {
                if (chrome.runtime?.lastError) { fromWindow(); return; }
                callback(data);
            });
        } else {
            fromWindow();
        }
    } catch (e) { callback(defaults); }
};

const buildContainer = (themeName, fontSize, phraseText, labelText, position) => {
    const t = themes[themeName] || themes.modern;

    const pos = {
        'top-right':    { top: '20px',  right:  '20px', bottom: 'auto', left: 'auto'  },
        'top-left':     { top: '20px',  left:   '20px', bottom: 'auto', right: 'auto' },
        'bottom-right': { bottom: '20px', right: '20px', top:  'auto',  left: 'auto'  },
        'bottom-left':  { bottom: '20px', left:  '20px', top:  'auto',  right: 'auto' },
    }[position] || { top: '20px', right: '20px', bottom: 'auto', left: 'auto' };

    const container = document.createElement('div');
    container.id = 'tasbeeh-container';
    Object.assign(container.style, {
        position: 'fixed',
        ...pos,
        maxWidth: '300px',
        width: 'fit-content',
        backgroundColor: t.bg,
        border: t.border,
        borderRadius: t.radius,
        boxShadow: t.shadow,
        zIndex: '99999999',
        direction: 'rtl',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
    });

    // Header
    const header = document.createElement('div');
    Object.assign(header.style, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px 8px',
        borderBottom: `1px solid ${t.divider}`,
    });

    const label = document.createElement('span');
    label.textContent = labelText;
    Object.assign(label.style, {
        fontSize: '11px',
        fontFamily: '"Segoe UI", Tahoma, sans-serif',
        letterSpacing: '1px',
        color: t.labelColor,
        background: t.labelBg,
        border: t.labelBorder,
        borderRadius: '20px',
        padding: '2px 10px',
    });

    const closeBtn = document.createElement('button');
    closeBtn.id = 'tasbeeh-close';
    closeBtn.textContent = '✕';
    Object.assign(closeBtn.style, {
        width: '22px',
        height: '22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        fontWeight: 'bold',
        backgroundColor: t.closeBg,
        color: t.closeColor,
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'opacity 0.2s, transform 0.2s',
        padding: '0',
        lineHeight: '1',
        flexShrink: '0',
    });
    closeBtn.addEventListener('click', () => animateOut(container));

    header.appendChild(label);
    header.appendChild(closeBtn);

    // Phrase
    const phrase = document.createElement('div');
    phrase.textContent = phraseText;
    Object.assign(phrase.style, {
        padding: '16px 18px',
        fontSize: `${fontSize}px`,
        lineHeight: '1.8',
        color: t.color,
        fontFamily: '"Segoe UI", "Tahoma", "Arabic Typesetting", serif',
        textAlign: 'center',
    });

    container.appendChild(header);
    container.appendChild(phrase);
    return container;
};

const animateOut = (container) => {
    container.classList.add('hiding');
    container.addEventListener('animationend', () => container.remove(), { once: true });
};

let currentContainer = null;
let currentIntervalId = null;

const showContainer = () => {
    if (currentContainer && document.body.contains(currentContainer)) {
        animateOut(currentContainer);
    }
    getSettings(({ theme, duration, fontSize, interval, azkarMode, position }) => {
        getPhrase(azkarMode, ({ text, label }) => {
        currentContainer = buildContainer(theme, fontSize, text, label, position);
        document.body.appendChild(currentContainer);
        setTimeout(() => {
            if (currentContainer && document.body.contains(currentContainer)) {
                animateOut(currentContainer);
            }
        }, duration * 1000);

        // Restart interval if it changed
        const intervalMs = interval * 60 * 1000;
        if (!currentIntervalId || currentIntervalMs !== intervalMs) {
            clearInterval(currentIntervalId);
            currentIntervalMs = intervalMs;
            currentIntervalId = setInterval(showContainer, intervalMs);
        }
        }); // getPhrase
    }); // getSettings
};

let currentIntervalMs = null;

try { showContainer(); } catch (e) {}

} catch (e) {} // end top-level guard
