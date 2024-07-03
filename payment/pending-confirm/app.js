document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const clientName = urlParams.get('client');
    const amount = urlParams.get('rp') ? parseInt(urlParams.get('rp'), 10) : null;

    if (!clientName || !amount) {
        window.location.href = '../Wht7cbVlpaymenterror';
    }

    const clientNameElement = document.getElementById('clientName');
    const amountElement = document.getElementById('amount');

    function formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    }

    clientNameElement.textContent = clientName;
    amountElement.textContent = formatRupiah(amount);
});
