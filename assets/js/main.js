const modal = document.getElementById('detailModal');
const closeBtn = document.querySelector('.modal-close');
const viewBtns = document.querySelectorAll('.view-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

// Mock product data
const productData = {
    'Fantasy Harcos': {
        size: '60mm',
        price: '4,500 Ft',
        description: 'Egy részletesen kifestett fantasy harcos figura. Vibráló szín, és finom részletmunkával ellátott. Tökéletes gyűjteménynek vagy ajándéknak. Az arca és az armor részletei külön festésűek, amely extra mélységet ad.'
    },
    'Sci-Fi Pilóta': {
        size: '55mm',
        price: '5,200 Ft',
        description: 'Futurisztikus pilóta figura metál effektekkel és technológiai részletmunkával. A szoknya és a felszerelés különösen részleteztek. Tökéletes a sci-fi rajongók számára.'
    },
    'Sárkány Kulcstartó': {
        size: '35mm',
        price: '2,800 Ft',
        description: 'Kompakt, csini sárkány kulcstartó. Kézzel festett, szilikon karabiner fogóval. Tökéletes kisebb ajándék vagy saját használatra.'
    },
    'Egyedi Megrendelés': {
        size: 'Egyedi',
        price: '6,000+ Ft',
        description: 'Saját ötleted szerinti figura készítése. Teljes körű szolgáltatás: 3D tervezés, nyomtatás, festés és szállítás. Egyezzünk meg az elképzeléseidről és az áról.'
    },
    'Elf Vadász': {
        size: '58mm',
        price: '4,800 Ft',
        description: 'Filigránul kifestett elf figura íjjal. Részletes arcrészletekkel és gyönyörű zöld árnyalatokkal. A kötöttségek és az íj különösen szépek.'
    },
    'Cuki Lény Kulcstartó': {
        size: '32mm',
        price: '2,500 Ft',
        description: 'Mini chibi stílus figura. Puha, vidám színek és vicces karakterek. Tökéletes gyerekeknek, vagy akár collectible ajándéknak. Biztosan mosolygás kerül a szemed.'
    }
};

// Open modal
viewBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const item = this.closest('.gallery-item');
        const title = item.querySelector('.gallery-item-title').textContent;
        const img = item.querySelector('.gallery-item-image img');
        const data = productData[title] || {};

        document.getElementById('modalItemTitle').textContent = title;
        document.getElementById('modalImage').src = img.src;
        document.getElementById('modalSize').textContent = data.size || 'N/A';
        document.getElementById('modalPrice').textContent = data.price || '0 Ft';
        document.getElementById('modalDescription').textContent = data.description || '';

        modal.style.display = 'block';
    });
});

// Close modal
closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Keyboard shortcut to close modal
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        modal.style.display = 'none';
    }
});
