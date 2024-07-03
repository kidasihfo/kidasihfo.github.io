document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('rp') ? parseInt(urlParams.get('rp'), 10) : null;

    if (!amount) {
        window.location.href = '404.html';
    }

    const paymentMethods = [
        { name: 'QRIS', icon: 'qris.png', modalIcon: 'qris_large.png', description: 'Pembayaran dengan QRIS.', instructions: 'Scan kode QR dan lakukan pembayaran melalui aplikasi e-wallet Anda.' },
        { name: 'Pulsa', icon: 'pulsa.png', modalIcon: 'pulsa_large.png', description: 'Pembayaran dengan Pulsa.', instructions: 'Kirim pulsa ke nomor yang ditentukan.' },
        { name: 'Bank Transfer', icon: 'bank.png', modalIcon: 'bank_large.png', description: 'Pembayaran dengan Transfer Bank.', instructions: 'Transfer jumlah yang ditentukan ke nomor rekening bank yang diberikan.' },
        { name: 'E-Wallet', icon: 'ewallet.png', modalIcon: 'ewallet_large.png', description: 'Pembayaran dengan E-Wallet.', instructions: 'Gunakan aplikasi e-wallet Anda untuk mentransfer jumlah yang ditentukan.' },
        { name: 'PayPal', icon: 'paypal.png', modalIcon: 'paypal_large.png', description: 'Pembayaran dengan PayPal.', instructions: 'Lakukan pembayaran melalui akun PayPal Anda.' },
        { name: 'Credit Card', icon: 'creditcard.png', modalIcon: 'creditcard_large.png', description: 'Pembayaran dengan Kartu Kredit.', instructions: 'Masukkan detail kartu kredit Anda untuk menyelesaikan pembayaran.' },
        // Tambahkan metode pembayaran lain di sini
    ];

    const container = document.getElementById('paymentMethods');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalInstructions = document.getElementById('modalInstructions');
    const modalPrice = document.getElementById('modalPrice');
    const modalAdminFee = document.getElementById('modalAdminFee');
    const closeModal = document.getElementById('closeModal');

    function formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    }

    paymentMethods.forEach(method => {
        const card = document.createElement('div');
        card.className = 'bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 cursor-pointer';
        card.addEventListener('click', () => {
            modalImage.src = `./images/${method.modalIcon}`;
            modalTitle.textContent = method.name;
            modalDescription.textContent = method.description;
            modalInstructions.textContent = method.instructions;
            const totalAmount = method.name === 'QRIS' ? calculateAdminFee(amount, 0.0035) : amount;
            modalPrice.textContent = amount ? formatRupiah(totalAmount) : '';
            modalAdminFee.textContent = method.name === 'QRIS' ? `Biaya admin: ${formatRupiah(totalAmount - amount)}` : '';
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
