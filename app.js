// Data
const users = [];
const categories = [];
const suppliers = [];
const products = [];
const transactions = [];

// Tambah Pengguna
document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value.trim();
    const password = document.getElementById('userPassword').value.trim();
    const role = document.getElementById('userRole').value;

    if (name && password) {
        users.push({ name, password, role });
        renderUsers();
        document.getElementById('userForm').reset();
    } else {
        alert('Nama dan password harus diisi!');
    }
});

// Render Pengguna
function renderUsers() {
    const tbody = document.getElementById('userTable').querySelector('tbody');
    tbody.innerHTML = '';
    users.forEach((user, index) => {
        const row = `
            <tr>
                <td>${user.name}</td>
                <td>${user.role}</td>
                <td><button onclick="deleteUser(${index})">Hapus</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Hapus Pengguna
function deleteUser(index) {
    users.splice(index, 1);
    renderUsers();
}

// Tambah Kategori
document.getElementById('categoryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('categoryName').value.trim();

    if (name) {
        categories.push({ name });
        renderCategories();
        document.getElementById('categoryForm').reset();
    } else {
        alert('Nama kategori harus diisi!');
    }
});

// Render Kategori
function renderCategories() {
    const tbody = document.getElementById('categoryTable').querySelector('tbody');
    tbody.innerHTML = '';
    categories.forEach((category, index) => {
        const row = `
            <tr>
                <td>${category.name}</td>
                <td><button onclick="deleteCategory(${index})">Hapus</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Hapus Kategori
function deleteCategory(index) {
    categories.splice(index, 1);
    renderCategories();
}

// Tambah Supplier
document.getElementById('supplierForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('supplierName').value.trim();
    const contact = document.getElementById('supplierContact').value.trim();

    if (name && contact) {
        suppliers.push({ name, contact });
        renderSuppliers();
        document.getElementById('supplierForm').reset();
    } else {
        alert('Nama dan kontak supplier harus diisi!');
    }
});

// Render Supplier
function renderSuppliers() {
    const tbody = document.getElementById('supplierTable').querySelector('tbody');
    tbody.innerHTML = '';
    suppliers.forEach((supplier, index) => {
        const row = `
            <tr>
                <td>${supplier.name}</td>
                <td>${supplier.contact}</td>
                <td><button onclick="deleteSupplier(${index})">Hapus</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Hapus Supplier
function deleteSupplier(index) {
    suppliers.splice(index, 1);
    renderSuppliers();
}

// Tambah Produk
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value;
    const price = parseFloat(document.getElementById('productPrice').value.trim());
    const stock = parseInt(document.getElementById('productStock').value.trim());
    const description = document.getElementById('productDescription').value.trim();

    if (name && category && !isNaN(price) && !isNaN(stock)) {
        products.push({ name, category, price, stock, description });
        renderProducts();
        document.getElementById('productForm').reset();
    } else {
        alert('Semua field harus diisi dengan benar!');
    }
});

// Render Produk
function renderProducts() {
    const tbody = document.getElementById('productTable').querySelector('tbody');
    tbody.innerHTML = '';
    products.forEach((product, index) => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>${product.description}</td>
                <td><button onclick="deleteProduct(${index})">Hapus</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Hapus Produk
function deleteProduct(index) {
    products.splice(index, 1);
    renderProducts();
}

// Tambah Transaksi
document.getElementById('transactionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const productName = document.getElementById('transactionProduct').value.trim();
    const quantity = parseInt(document.getElementById('transactionQuantity').value.trim());
    const customerName = document.getElementById('transactionCustomer').value.trim();
    const paymentStatus = document.querySelector('input[name="paymentStatus"]:checked').value;

    if (productName && !isNaN(quantity) && quantity > 0 && customerName) {
        const product = products.find(p => p.name === productName);
        if (product && product.stock >= quantity) {
            transactions.push({
                product: productName,
                quantity,
                customer: customerName,
                totalPrice: product.price * quantity,
                paymentStatus
            });
            product.stock -= quantity;
            renderTransactions();
            renderProducts();
            document.getElementById('transactionForm').reset();
        } else {
            alert('Stok produk tidak mencukupi atau input tidak valid.');
        }
    } else {
        alert('Semua field transaksi harus diisi dengan benar!');
    }
});

// Render Transaksi
function renderTransactions() {
    const tbody = document.getElementById('transactionTable').querySelector('tbody');
    tbody.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const row = `
            <tr>
                <td>${transaction.product}</td>
                <td>${transaction.quantity}</td>
                <td>${transaction.customer}</td>
                <td>${transaction.totalPrice}</td>
                <td>${transaction.paymentStatus}</td>
                <td><button onclick="deleteTransaction(${index})">Hapus</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Hapus Transaksi
function deleteTransaction(index) {
    const transaction = transactions[index];
    const product = products.find(p => p.name === transaction.product);
    if (product) {
        product.stock += transaction.quantity;
    }
    transactions.splice(index, 1);
    renderTransactions();
    renderProducts();
}



document.addEventListener('DOMContentLoaded', () => {
    // Populate product options in transaction form
    const productSelect = document.getElementById('transactionProduct');
    products.forEach(product => {
        productSelect.innerHTML += `<option value="${product.name}">${product.name} - ${product.price} (Stok: ${product.stock})</option>`;
    });
});




function generateReport() {
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    const filteredTransactions = transactions.filter(transaction => {
        return new Date(transaction.date) >= new Date(startDate) && new Date(transaction.date) <= new Date(endDate);
    });

    let reportHtml = `
        <h2>Laporan Transaksi</h2>
        <table>
            <thead>
                <tr>
                    <th>Produk</th>
                    <th>Jumlah</th>
                    <th>Pelanggan</th>
                    <th>Total Harga</th>
                    <th>Status Pembayaran</th>
                    <th>Tanggal</th>
                </tr>
            </thead>
            <tbody>
    `;

    filteredTransactions.forEach(transaction => {
        reportHtml += `
            <tr>
                <td>${transaction.product}</td>
                <td>${transaction.quantity}</td>
                <td>${transaction.customer}</td>
                <td>${transaction.totalPrice}</td>
                <td>${transaction.paymentStatus}</td>
                <td>${transaction.date}</td>
            </tr>
        `;
    });

    reportHtml += `</tbody></table>`;

    document.getElementById('reportContainer').innerHTML = reportHtml;
}




// Populate Kategori, Produk, Supplier
function populateDropdowns() {
    const categorySelect = document.getElementById('productCategory');
    const transactionProductSelect = document.getElementById('transactionProduct');

    categories.forEach(category => {
        const option = `<option value="${category.name}">${category.name}</option>`;
        categorySelect.innerHTML += option;
        transactionProductSelect.innerHTML += option;
    });
}

// Menampilkan Laporan
document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generateReport();
});

// Fungsi Generasi Laporan
function generateReport() {
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    const filteredTransactions = transactions.filter(transaction => {
        return new Date(transaction.date) >= new Date(startDate) && new Date(transaction.date) <= new Date(endDate);
    });

    let reportHtml = `
        <h4>Laporan Transaksi (${startDate} - ${endDate})</h4>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Produk</th>
                    <th>Jumlah</th>
                    <th>Pelanggan</th>
                    <th>Total Harga</th>
                    <th>Status Pembayaran</th>
                    <th>Tanggal</th>
                </tr>
            </thead>
            <tbody>
    `;

    filteredTransactions.forEach(transaction => {
        reportHtml += `
            <tr>
                <td>${transaction.product}</td>
                <td>${transaction.quantity}</td>
                <td>${transaction.customer}</td>
                <td>${transaction.totalPrice}</td>
                <td>${transaction.paymentStatus}</td>
                <td>${transaction.date}</td>
            </tr>
        `;
    });

    reportHtml += `</tbody></table>`;

    document.getElementById('reportContainer').innerHTML = reportHtml;
}

// Tampilkan Form Penjualan dan Produk sesuai data Dropdown
populateDropdowns();
