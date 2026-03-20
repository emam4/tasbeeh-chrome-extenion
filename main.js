const tasbeehPhrases = [
    'سُبْحَانَ اللَّهِ',
    'الْحَمْدُ لِلَّهِ',
    'لَا إِلَهَ إِلَّا اللَّهُ',
    'اللَّهُ أَكْبَرُ',
    'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    'سُبْحَانَ اللَّهِ الْعَظِيمِ',
    'اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد.',
    'يَا رَبِّ , لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ , وَلِعَظِيمِ سُلْطَانِكَ.',
    'أسْتَغْفِرُ اللهَ وَأتُوبُ إلَيْهِ.',
    'لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءِ قَدِيرِ.',
    'حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم.',
    'رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً.',
    'اللّهُـمَّ إِنِّـي أَصْبَـحْتُ أُشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلَائِكَتَكَ ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ ُ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك.'
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
    document.head.appendChild(style);
}

const getTheme = (callback) => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.sync.get({ theme: 'modern' }, (data) => callback(data.theme));
    } else {
        callback(window.__tasbeehTheme || 'modern');
    }
};

const buildContainer = (themeName) => {
    const t = themes[themeName] || themes.modern;

    const container = document.createElement('div');
    container.id = 'tasbeeh-container';
    Object.assign(container.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
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
    label.textContent = '✦ تسبيح';
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
    phrase.textContent = tasbeehPhrases[Math.floor(Math.random() * tasbeehPhrases.length)];
    Object.assign(phrase.style, {
        padding: '16px 18px',
        fontSize: '21px',
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

const showContainer = () => {
    if (currentContainer && document.body.contains(currentContainer)) {
        animateOut(currentContainer);
    }
    getTheme((themeName) => {
        currentContainer = buildContainer(themeName);
        document.body.appendChild(currentContainer);
        setTimeout(() => {
            if (currentContainer && document.body.contains(currentContainer)) {
                animateOut(currentContainer);
            }
        }, 15 * 1000);
    });
};

showContainer();
setInterval(showContainer, 30 * 1000);
