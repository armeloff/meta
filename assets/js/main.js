const SITE_CONFIG = {
    tgLink: "https://t.me/armeloff",
    tgName: "@armeloff"
};

const layouts = {
    header: `
        <div class="container">
            <a href="/" class="logo">META.ADS</a>
            <nav class="nav-links">
                <a href="/#cases">Кейсы</a>
                <a href="/methods">Метод</a>
                <a href="/services">Услуги</a>
                <a href="${SITE_CONFIG.tgLink}" class="btn-tg-small">Telegram</a>
            </nav>
        </div>
    `,
    cta: `
        <div class="bg-tg-lightBlue rounded-2xl p-8 border border-blue-100 relative overflow-hidden">
            <div class="relative z-10 text-center sm:text-left">
                <h3 class="text-2xl font-bold text-tg-text mb-2">Нужен системный результат?</h3>
                <p class="text-gray-600 mb-6 text-sm sm:text-base max-w-xl">
                    Обсудим ваш проект, проанализируем текущие воронки и подберем оптимальную стратегию масштабирования через Meta Ads.
                </p>
                <div class="flex flex-col sm:flex-row items-center gap-4">
                    <a href="${SITE_CONFIG.tgLink}" target="_blank" class="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-tg-blue hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.204-.054-.31-.346-.116l-6.405 4.032-2.766-.864c-.602-.188-.61-.602.126-.89l10.824-4.173c.502-.186.942.115.753.86z"/></svg>
                        Написать в Telegram
                    </a>
                    <a href="/services.html" class="text-tg-blue text-sm font-bold hover:underline">
                        Тарифы и форматы работы →
                    </a>
                </div>
            </div>
        </div>
    `,
    footer: `
        <div class="container">
            <p>© 2026 Meta Ads Specialist. Все кейсы подтверждены данными. <br> 
            <a href="${SITE_CONFIG.tgLink}" style="color: #3390ec; text-decoration: none;">Написать в Telegram</a></p>
        </div>
    `
};

document.addEventListener('DOMContentLoaded', () => {
    // Инъекция общих элементов
    const header = document.getElementById('shared-header');
    const footer = document.getElementById('shared-footer');
    const cta = document.getElementById('shared-cta');
    
    if (header) header.innerHTML = layouts.header;
    if (footer) footer.innerHTML = layouts.footer;
    if (cta) cta.innerHTML = layouts.cta;

    // Загрузка сетки кейсов на главной
    const grid = document.getElementById('cases-grid');
    if (grid) {
        fetch('/data/cases.json')
            .then(res => res.json())
            .then(cases => {
                grid.innerHTML = cases.map(c => `
                    <div class="case-card">
                        <img src="${c.image}" alt="${c.title}" onerror="this.src='https://placehold.co/600x400?text=Case+Image'">
                        <div class="case-content">
                            <span class="tag">${c.category}</span>
                            <h3>${c.title}</h3>
                            <p>${c.description}</p>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span class="metrics">${c.roi}</span>
                                <a href="${c.link}" style="font-size: 12px; font-weight: bold; color: #222; text-decoration: none;">Смотреть →</a>
                            </div>
                        </div>
                    </div>
                `).join('');
            });
    }
});
