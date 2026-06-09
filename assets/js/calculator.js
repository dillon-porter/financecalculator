document.addEventListener('DOMContentLoaded', function() {

    const modelSelect = document.getElementById('voltage-model');
    const provinceSelect = document.getElementById('voltage-province');
    const downPaymentInput = document.getElementById('voltage-down-payment');
    const termSlider = document.getElementById('voltage-term');
    const termValue = document.getElementById('voltage-term-value');
    const interestSlider = document.getElementById('voltage-interest');
    const interestValue = document.getElementById('voltage-interest-value');
    const calculateButton = document.getElementById('voltage-calculate');
    const resultBox = document.getElementById('voltage-result');

    const assemblyDestinationFee = 469;

    if (!modelSelect || !calculateButton) {
        return;
    }

    termSlider.addEventListener('input', function() {
        termValue.textContent = termSlider.value;
    });

    interestSlider.addEventListener('input', function() {
        interestValue.textContent = interestSlider.value;
    });

    calculateButton.addEventListener('click', function() {

        const price = parseFloat(modelSelect.value);
        const taxRate = parseFloat(provinceSelect.value);
        const downPayment = parseFloat(downPaymentInput.value) || 0;
        const termMonths = parseInt(termSlider.value, 10);
        const annualRate = parseFloat(interestSlider.value) || 0;

        const selectedFrequency = document.querySelector(
            'input[name="voltage-frequency"]:checked'
        ).value;

        const subtotal = price + assemblyDestinationFee;
        const taxAmount = subtotal * taxRate;
        const totalPurchasePrice = subtotal + taxAmount;
        const loanAmount = Math.max(totalPurchasePrice - downPayment, 0);

        let paymentsPerYear = 12;
        let totalPayments = termMonths;
        let frequencyLabel = 'Monthly';

        if (selectedFrequency === 'biweekly') {
            paymentsPerYear = 26;
            totalPayments = Math.round((termMonths / 12) * 26);
            frequencyLabel = 'Bi-weekly';
        }

        if (selectedFrequency === 'weekly') {
            paymentsPerYear = 52;
            totalPayments = Math.round((termMonths / 12) * 52);
            frequencyLabel = 'Weekly';
        }

        const periodicRate = annualRate / 100 / paymentsPerYear;

        let payment = 0;

        if (loanAmount <= 0) {
            payment = 0;
        } else if (periodicRate === 0) {
            payment = loanAmount / totalPayments;
        } else {
            payment =
                loanAmount *
                (
                    periodicRate *
                    Math.pow(1 + periodicRate, totalPayments)
                ) /
                (
                    Math.pow(1 + periodicRate, totalPayments) - 1
                );
        }

        const formatter = new Intl.NumberFormat('en-CA', {
            style: 'currency',
            currency: 'CAD'
        });

        resultBox.style.display = 'block';

        resultBox.innerHTML = `
            <h3>Your Estimated Payment</h3>

            <p class="voltage-payment">
                ${formatter.format(payment)}
                <span>${frequencyLabel}</span>
            </p>

            <div class="voltage-summary-note">
                Based on ${termMonths} months at ${annualRate}% interest.
            </div>

            <div class="voltage-breakdown">
                <div class="voltage-row">
                    <span>Vehicle price</span>
                    <strong>${formatter.format(price)}</strong>
                </div>

                <div class="voltage-row">
                    <span>Assembly & Destination Fee</span>
                    <strong>${formatter.format(assemblyDestinationFee)}</strong>
                </div>

                <div class="voltage-row">
                    <span>Subtotal before tax</span>
                    <strong>${formatter.format(subtotal)}</strong>
                </div>

                <div class="voltage-row">
                    <span>HST (${taxRate * 100}%)</span>
                    <strong>${formatter.format(taxAmount)}</strong>
                </div>

                <div class="voltage-row voltage-total">
                    <span>Total purchase price</span>
                    <strong>${formatter.format(totalPurchasePrice)}</strong>
                </div>

                <div class="voltage-row">
                    <span>Cash down payment</span>
                    <strong>-${formatter.format(downPayment)}</strong>
                </div>

                <div class="voltage-row voltage-financed">
                    <span>Amount financed</span>
                    <strong>${formatter.format(loanAmount)}</strong>
                </div>
            </div>
        `;

        resultBox.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    });

});