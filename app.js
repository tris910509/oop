// Helper Functions for Validation
const isNumber = (value) => !isNaN(value) && value.trim() !== '';
const isRequired = (value) => value.trim() !== '';

// Product Validation
const validateProductForm = () => {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const stock = document.getElementById('productStock').value;

    if (!isRequired(name)) {
        alert('Nama produk harus diisi.');
        return false;
    }
    if (!isNumber(price)) {
        alert('Harga produk harus berupa angka.');
        return false;
    }
    if (!isNumber(stock)) {
        alert('Stok produk harus berupa angka.');
        return false;
    }
    return true;
};

// Transaction Validation
const validateTransactionForm = () => {
    const quantity = document.getElementById('transactionQuantity').value;
    if (!isNumber(quantity) || quantity <= 0) {
        alert('Jumlah produk harus berupa angka positif.');
        return false;
    }
    return true;
};

// Customer Validation
const validateCustomerForm = () => {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;

    if (!isRequired(name)) {
        alert('Nama pelanggan harus diisi.');
        return false;
    }
    if (!isRequired(phone)) {
        alert('Nomor telepon pelanggan harus diisi.');
        return false;
    }
    return true;
};

// Event Listeners with Validation
document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateProductForm()) {
        const name = document.getElementById('productName').value;
        const price = parseFloat(document.getElementById('productPrice').value);
        const stock = parseInt(document.getElementById('productStock').value);
        addProduct({ name, price, stock });
        document.getElementById('productForm').reset();
    }
});

document.getElementById('transactionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateTransactionForm()) {
        const productId = parseInt(document.getElementById('productSelect').value);
        const quantity = parseInt(document.getElementById('transactionQuantity').value);
        const paymentMethod = document.getElementById('paymentMethod').value;
        addTransaction({ productId, quantity, paymentMethod, date: Date.now() });
        document.getElementById('transactionForm').reset();
    }
});

document.getElementById('customerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateCustomerForm()) {
        const name = document.getElementById('customerName').value;
        const phone = document.getElementById('customerPhone').value;
        addCustomer({ name, phone });
        document.getElementById('customerForm').reset();
    }
});



// Edit Product
const editProduct = (index) => {
    const products = getLocalStorage('products');
    const product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productForm').setAttribute('data-edit-index', index);
    document.querySelector('#productForm button').innerText = 'Update Produk';
};

// Update Product
document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const index = e.target.getAttribute('data-edit-index');
    if (index !== null && validateProductForm()) {
        const name = document.getElementById('productName').value;
        const price = parseFloat(document.getElementById('productPrice').value);
        const stock = parseInt(document.getElementById('productStock').value);

        let products = getLocalStorage('products');
        products[index] = { id: products[index].id, name, price, stock };
        setLocalStorage('products', products);
        displayProducts();

        document.getElementById('productForm').reset();
        e.target.removeAttribute('data-edit-index');
        document.querySelector('#productForm button').innerText = 'Tambah Produk';
    }
});

// Edit Transaction
const editTransaction = (index) => {
    const transactions = getLocalStorage('transactions');
    const transaction = transactions[index];
    document.getElementById('transactionForm').setAttribute('data-edit-index', index);
    document.getElementById('productSelect').value = transaction.productId;
    document.getElementById('transactionQuantity').value = transaction.quantity;
    document.getElementById('paymentMethod').value = transaction.paymentMethod;
    document.querySelector('#transactionForm button').innerText = 'Update Transaksi';
};

// Update Transaction
document.getElementById('transactionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const index = e.target.getAttribute('data-edit-index');
    if (index !== null && validateTransactionForm()) {
        const productId = parseInt(document.getElementById('productSelect').value);
        const quantity = parseInt(document.getElementById('transactionQuantity').value);
        const paymentMethod = document.getElementById('paymentMethod').value;

        let transactions = getLocalStorage('transactions');
        transactions[index] = { ...transactions[index], productId, quantity, paymentMethod, date: Date.now() };
        setLocalStorage('transactions', transactions);
        displayTransactions();

        document.getElementById('transactionForm').reset();
        e.target.removeAttribute('data-edit-index');
        document.querySelector('#transactionForm button').innerText = 'Tambah Transaksi';
    }
});



const renderSalesChart = () => {
    const transactions = getLocalStorage('transactions');
    const salesData = transactions.map(t => ({
        productId: t.productId,
        quantity: t.quantity,
        date: t.date,
    }));

    // Grouping by productId and sum quantities
    const groupedSales = salesData.reduce((acc, curr) => {
        if (!acc[curr.productId]) {
            acc[curr.productId] = { quantity: 0, productName: '' };
        }
        acc[curr.productId].quantity += curr.quantity;
        acc[curr.productId].productName = getLocalStorage('products').find(p => p.id === curr.productId).name;
        return acc;
    }, {});

    const chartData = Object.values(groupedSales).map(sale => ({
        label: sale.productName,
        y: sale.quantity,
    }));

    const chart = new CanvasJS.Chart("salesChart", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Penjualan Produk"
        },
        axisY: {
            title: "Jumlah"
        },
        data: [{
            type: "bar",
            yValueFormatString: "#,##0",
            dataPoints: chartData
        }]
    });
    chart.render();
};

// Call renderSalesChart on page load
document.addEventListener('DOMContentLoaded', renderSalesChart);



const calculateDailySales = () => {
    const transactions = getLocalStorage('transactions');
    const dailySales = transactions.reduce((acc, curr) => {
        const date = new Date(curr.date).toDateString();
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += curr.quantity;
        return acc;
    }, {});

    return dailySales;
};

// Display daily sales summary
document.addEventListener('DOMContentLoaded', () => {
    const dailySales = calculateDailySales();
    const dailySalesTable = document.getElementById('dailySalesTableBody');
    dailySalesTable.innerHTML = '';
    for (const [date, total] of Object.entries(dailySales)) {
        dailySalesTable.innerHTML += `
            <tr>
                <td>${date}</td>
                <td>${total}</td>
            </tr>
        `;
    }
});



