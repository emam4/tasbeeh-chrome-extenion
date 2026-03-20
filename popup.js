const defaults = { theme: 'modern', duration: 15, fontSize: 20, interval: 5 };

chrome.storage.sync.get(defaults, (settings) => {
    // Mark selected theme
    document.querySelector(`[data-theme="${settings.theme}"]`)?.classList.add('selected');

    // Mark selected interval
    document.querySelector(`[data-interval="${settings.interval}"]`)?.classList.add('selected');

    // Mark selected duration
    document.querySelector(`[data-duration="${settings.duration}"]`)?.classList.add('selected');

    // Mark selected font size
    document.querySelector(`[data-fontsize="${settings.fontSize}"]`)?.classList.add('selected');
});

// Theme
document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', () => {
        chrome.storage.sync.set({ theme: card.dataset.theme });
        document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
    });
});

// Interval
document.querySelectorAll('[data-interval]').forEach(chip => {
    chip.addEventListener('click', () => {
        chrome.storage.sync.set({ interval: Number(chip.dataset.interval) });
        document.querySelectorAll('[data-interval]').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
    });
});

// Duration
document.querySelectorAll('[data-duration]').forEach(chip => {
    chip.addEventListener('click', () => {
        chrome.storage.sync.set({ duration: Number(chip.dataset.duration) });
        document.querySelectorAll('[data-duration]').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
    });
});

// Font size
document.querySelectorAll('[data-fontsize]').forEach(chip => {
    chip.addEventListener('click', () => {
        chrome.storage.sync.set({ fontSize: Number(chip.dataset.fontsize) });
        document.querySelectorAll('[data-fontsize]').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
    });
});
