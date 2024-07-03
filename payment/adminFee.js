function calculateAdminFee(amount, feePercentage) {
    return amount + (amount * feePercentage);
}

function calculatePulsaAdminFee(amount) {
    return amount * 0.90;
}

function convertToDollar(amount, rate) {
    return amount / rate;
}
