document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('rp') ? parseInt(urlParams.get('rp'), 10) : null;

    const paymentMethods = [
        { name: 'QRIS', icon: 'qris.png', description: 'Pembayaran dengan QRIS.' },
        { name: 'Pulsa', icon: 'pulsa.png', description: 'Pembayaran dengan Pulsa.' },
        { name: 'Bank Transfer', icon: 'bank.png', description: 'Pembayaran dengan Transfer Bank.' },
        { name: 'E-Wallet', icon: 'ewallet.png', description: 'Pembayaran dengan E-Wallet.' },
        { name: 'PayPal', icon: 'paypal.png', description: 'Pembayaran dengan PayPal.' },
        { name: 'Credit Card', icon: 'creditcard.png', description: 'Pembayaran dengan Kartu Kredit.' },
        // Tambahkan metode pembayaran lain di sini
    ];

    const container = document.getElementById('paymentMethods');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const closeModal = document.getElementById('closeModal');

    function formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    }

    paymentMethods.forEach(method => {
        const card = document.createElement('div');
        card.className = 'bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 cursor-pointer';
        card.addEventListener('click', () => {
            modalImage.src = `./images/${method.icon}`;
            modalTitle.textContent = method.name;
            modalDescription.textContent = method.description;
            modalPrice.textContent = amount ? formatRupiah(amount) : '';
            modal.classList.remove('hidden');
        });

        const img = document.createElement('img');
        img.src = `./images/${method.icon}`;
        img.alt = `${method.name} icon`;
        img.className = 'w-20 h-20 mb-4 mx-auto';

        const name = document.createElement('h2');
        name.className = 'text-xl font-semibold text-center';
        name.textContent = method.name;

        card.appendChild(img);
        card.appendChild(name);

        if (amount) {
            const price = document.createElement('p');
            price.className = 'text-lg font-semibold text-center text-blue-600';
            price.textContent = formatRupiah(amount);
            card.appendChild(price);
        }

        container.appendChild(card);
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
});
