document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('rp') ? parseInt(urlParams.get('rp'), 10) : null;

    if (!amount) {
        window.location.href = 'Wht7cbVlpaymenterror';
    }

    const paymentMethods = [
        { name: 'QRIS', icon: 'qris.png', modalIcon: 'qris_large.png', description: 'Pembayaran dengan QRIS.', instructions: 'Scan kode QR dan lakukan pembayaran melalui aplikasi e-wallet Anda.' },
        { name: 'Pulsa', icon: 'pulsa.png', modalIcon: 'pulsa_large.png', description: 'Pembayaran dengan Pulsa.', instructions: 'Kirim pulsa ke nomor yang ditentukan.', minAmount: 30000 },
        { name: 'Bank Transfer', icon: 'bank.png', modalIcon: 'bank_large.png', description: 'Pembayaran dengan Transfer Bank.', instructions: 'Transfer jumlah yang ditentukan ke nomor rekening bank yang diberikan.', disabled: true },
        { name: 'E-Wallet', icon: 'ewallet.png', modalIcon: 'ewallet_large.png', description: 'Pembayaran dengan E-Wallet.', instructions: 'Gunakan aplikasi e-wallet Anda untuk mentransfer jumlah yang ditentukan.', disabled: true },
        { name: 'PayPal', icon: 'paypal.png', modalIcon: 'paypal_large.png', description: 'Pembayaran dengan PayPal.', instructions: 'Lakukan pembayaran melalui akun PayPal Anda.' },
        { name: 'Credit Card', icon: 'creditcard.png', modalIcon: 'creditcard_large.png', description: 'Pembayaran dengan Kartu Kredit.', instructions: 'Masukkan detail kartu kredit Anda untuk menyelesaikan pembayaran.', disabled: true },
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
    const confirmPayment = document.getElementById('confirmPayment');
    const toast = document.getElementById('toast');

    const dollarRate = 17076; // Rate per 1 dollar in IDR
    const pulsaRate = 0.90; // Rate for Pulsa conversion

    function formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    }

    function formatDollar(amount) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    paymentMethods.forEach(method => {
        const card = document.createElement('div');
        card.className = 'bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 cursor-pointer';
        card.addEventListener('click', () => {
            if (method.disabled) {
                showToast('Metode pembayaran ini tidak tersedia.');
                return;
            }
            if (method.minAmount && amount < method.minAmount) {
                showToast(`Metode pembayaran ${method.name} hanya tersedia untuk nominal di atas ${formatRupiah(method.minAmount)}.`);
                return;
            }

            modalImage.src = `./images/${method.modalIcon}`;
            modalTitle.textContent = method.name;
            modalDescription.textContent = method.description;
            modalInstructions.textContent = method.instructions;
            
            let totalAmount;
            let adminFee;

            if (method.name === 'QRIS') {
                totalAmount = calculateAdminFee(amount, 0.0035);
                adminFee = totalAmount - amount;
                modalPrice.textContent = formatRupiah(totalAmount);
                modalAdminFee.textContent = `*termasuk PPN sebesar: ${formatRupiah(adminFee)}`;
            } else if (method.name === 'Pulsa') {
                totalAmount = calculatePulsaAmount(amount, pulsaRate);
                adminFee = totalAmount - amount;
                modalPrice.textContent = formatRupiah(totalAmount);
                modalAdminFee.textContent = `*termasuk PPN sebesar: ${formatRupiah(adminFee)}`;
            } else if (method.name === 'PayPal') {
                const dollarAmount = convertToDollar(amount, dollarRate);
                modalPrice.textContent = formatDollar(dollarAmount);
                modalAdminFee.textContent = '';
            } else {
                totalAmount = amount;
                modalPrice.textContent = formatRupiah(totalAmount);
                modalAdminFee.textContent = '';
            }

            confirmPayment.onclick = () => window.location.href = 'pending-confirm.html';
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
