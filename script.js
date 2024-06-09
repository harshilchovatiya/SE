document.addEventListener('DOMContentLoaded', function () {
    const paymentAmountDisplay = document.getElementById('paymentAmount'); // Get element for displaying payment amount
    const payButton = document.getElementById('payButton');
    const paymentForm = document.getElementById('paymentForm');
    const paymentMessage = document.getElementById('paymentMessage');
    const blanceMessage = document.getElementById('blanceMessage');
    const balanceDisplay = document.getElementById('balanceDisplay'); // Display remaining balance

    // Initial balance for all credit cards
    let creditCards = [
        { cardNumber: '1234 5678 9012 3456', expiryDate: '12/25', cvv: '123', balance: 300000 },
        { cardNumber: '2345 6789 0123 4567', expiryDate: '12/26', cvv: '456', balance: 300000 },
        { cardNumber: '3456 7890 1234 5678', expiryDate: '12/27', cvv: '789', balance: 300000 }
    ];

    // Function to generate a random payment amount
    function generatePaymentAmount() {
        return Math.floor(Math.random() * (50000 - 10 + 1)) + 10;
    }

    // Function to display remaining balance
    function displayBalance(cardNumber) {
        const creditCard = creditCards.find(card => card.cardNumber === cardNumber);
        if (creditCard) {
            blanceMessage.textContent = `Remaining Balance: $${creditCard.balance}`;
        }
    }

    // Initial generation and display of payment amount
    let paymentAmount = generatePaymentAmount();
    paymentAmountDisplay.textContent = `Payment Amount: $${paymentAmount}`;

    payButton.addEventListener('click', function () {
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const expiryDate = document.getElementById('expiryDate').value.trim();
        const cvv = document.getElementById('cvv').value.trim();
        const password = document.getElementById('password').value.trim();

        // Simulate payment processing
        if (cardNumber && expiryDate && cvv && password) {
            // Check if the provided card details exist in the credit cards list
            const creditCard = creditCards.find(card => card.cardNumber === cardNumber && card.expiryDate === expiryDate && card.cvv === cvv);
            if (creditCard) {
                // Check if payment amount exceeds available balance
                if (paymentAmount <= creditCard.balance) {
                    // Simulate payment success or failure based on random amount
                    const paymentSuccess = Math.random() < 0.99; // 80% chance of success
                    if (paymentSuccess) {
                        paymentMessage.textContent = `Payment successful! Amount: $${paymentAmount}`;
                        // Update balance of the credit card
                        creditCard.balance -= paymentAmount;
                        displayBalance(cardNumber); // Update displayed remaining balance
                        // Save updated credit cards list to CSV
                        saveCreditCardsToCSV(creditCards);
                        // Regenerate payment amount for the next payment
                        paymentAmount = generatePaymentAmount();
                        paymentAmountDisplay.textContent = `Payment Amount: $${paymentAmount}`;
                    } else {
                        paymentMessage.textContent = 'Payment failed. Please try again.';
                    }
                } else {
                    paymentMessage.textContent = 'Insufficient funds. Please try again with a lower amount.';
                }
            } else {
                paymentMessage.textContent = 'Invalid card details. Please try again.';
            }
        } else {
            paymentMessage.textContent = 'Please fill in all fields.';
        }

        paymentForm.reset(); // Reset form after submission
        setTimeout(function () {
            paymentMessage.textContent = '';
            blanceMessage.textContent = '';
        }, 5000);
    });

   // Function to save credit cards details to CSV
function saveCreditCardsToCSV(creditCards) {
    const csvContent = 'Card Number,Expiry Date,CVV,Balance\n' +
        creditCards.map(card => `${card.cardNumber},${card.expiryDate},${card.cvv},${card.balance}`).join('\n');

    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a link element to download the CSV file
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'credit_cards.csv'; // Set the filename

    // Append the link to the document body and click it programmatically
    document.body.appendChild(a);
    a.click();

    // Remove the link element from the document body
    document.body.removeChild(a);
}

});
