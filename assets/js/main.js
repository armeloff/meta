// 1. Конфигурация меню и футера
const layoutConfig = {
    header: `
        <nav class="container">
            <a href="/" class="logo">META.ADS</a>
            <div class="menu">
                <a href="/#cases">Кейсы</a>
                <a href="/methods/lattice-algo.html">Методы</a>
                <a href="https://t.me/your_tg" class="btn-tg">Telegram</a>
            </div>
        </nav>
    `,
    footer: `
        <div class="container">
            <p>© 2026 Meta Ads Expert. <a href="https://t.me/your_tg">Contact me</a></p>
        </div>
    `
};

// 2. Инъекция макета
document.addEventListener('DOMContentLoaded', () => {
    const headerElement = document.getElementById('shared-header');
    const footerElement = document.getElementById('shared-footer');
    const casesGrid = document.getElementById('cases-grid');

    if (headerElement) headerElement.innerHTML = layoutConfig.header;
    if (footerElement) footerElement.innerHTML = layoutConfig.footer;

    // 3. Загрузка кейсов на главной
    if (casesGrid) {
        fetch('/data/cases.json')
            .then(response => response.json())
            .then(data => {
                casesGrid.innerHTML = data.map(item => `
                    <div class="case-card">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="case-info">
                            <span class="tag">${item.category}</span>
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <div class="metrics">ROI: ${item.roi}</div>
                            <a href="${item.link}" class="btn-more">Читать кейс</a>
                        </div>
                    </div>
                `).join('');
            })
            .catch(err => console.error('Ошибка загрузки кейсов:', err));
    }
});
