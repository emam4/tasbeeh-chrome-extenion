const cards = document.querySelectorAll('.theme-card');

chrome.storage.sync.get({ theme: 'modern' }, ({ theme }) => {
    document.querySelector(`[data-theme="${theme}"]`)?.classList.add('selected');
});

cards.forEach(card => {
    card.addEventListener('click', () => {
        const theme = card.dataset.theme;
        chrome.storage.sync.set({ theme }, () => {
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });
});
