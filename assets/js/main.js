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
                <h3 class="text-2xl font-bold text-tg-text mb-2 text-left text-black">Нужен системный результат?</h3>
                <p class="text-gray-600 mb-6 text-sm sm:text-base max-w-xl text-left">
                    Обсудим ваш проект, проанализируем текущие воронки и подберем оптимальную стратегию масштабирования через Meta Ads.
                </p>
                <div class="flex flex-col sm:flex-row items-center gap-4">
                    <a href="${SITE_CONFIG.tgLink}" target="_blank" class="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-tg-blue hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md">
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
    `,
    lightbox: `
        <div id="lightbox" class="fixed inset-0 z-[200] bg-black/90 hidden flex items-center justify-center p-4 transition-opacity duration-300 opacity-0" onclick="closeLightbox()">
            <button class="absolute top-5 right-5 text-white hover:text-gray-300">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <img id="lightbox-img" src="" class="max-w-full max-h-full object-contain rounded shadow-2xl" onclick="event.stopPropagation()">
        </div>
    `
};

window.openLightbox = function(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (!src || !lb || !img) return;
    img.src = src;
    lb.classList.remove('hidden');
    setTimeout(() => lb.classList.remove('opacity-0'), 10);
    document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.classList.add('opacity-0');
        setTimeout(() => {
            lb.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('shared-header');
    const footer = document.getElementById('shared-footer');
    const cta = document.getElementById('shared-cta');
    
    if (header) header.innerHTML = layouts.header;
    if (footer) footer.innerHTML = layouts.footer;
    if (cta) cta.innerHTML = layouts.cta;
    
    if (!document.getElementById('lightbox')) {
        document.body.insertAdjacentHTML('beforeend', layouts.lightbox);
    }

    // Ищем контейнеры с картинками (теперь универсально для всех)
    const zoomContainers = document.querySelectorAll('.img-zoom-container');
    zoomContainers.forEach(container => {
        container.onclick = function() {
            const img = this.querySelector('img');
            if (img) window.openLightbox(img.src);
        };
    });

    // Отрисовка сетки на главной
    const grid = document.getElementById('cases-grid');
    if (grid) {
        fetch('/data/cases.json')
            .then(res => res.json())
            .then(cases => {
                grid.innerHTML = cases.map(c => `
                    <div class="case-card">
                        <img src="${c.image}" alt="${c.title}">
                        <div class="case-content">
                            <span class="tag">${c.category}</span>
                            <h3>${c.title}</h3>
                            <p>${c.description}</p>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span class="metrics text-green-600 font-bold">${c.roi}</span>
                                <a href="${c.link}" style="font-size: 12px; font-weight: bold; color: #222; text-decoration: none;">Смотреть →</a>
                            </div>
                        </div>
                    </div>
                `).join('');
            });
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});
