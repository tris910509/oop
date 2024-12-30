let products = [
    { id: 1, name: "Produk A", price: 1000, category_id: 1, supplier_id: 1 },
    { id: 2, name: "Produk B", price: 2000, category_id: 1, supplier_id: 2 },
    // Produk lainnya...
];

let categories = [
    { id: 1, name: "Kategori A" },
    { id: 2, name: "Kategori B" },
    // Kategori lainnya...
];

let suppliers = [
    { id: 1, name: "Supplier A" },
    { id: 2, name: "Supplier B" },
    // Supplier lainnya...
];

let transactions = [];

function showNotification(message) {
    alert(message);
}

// Produk Management
function addProduct(name, price, categoryId, supplierId) {
    if (!name || !price || !categoryId || !supplierId) {
        alert("Harap isi semua kolom produk.");
        return;
    }

    const newProduct = {
        id: Date.now(),
        name: name,
        price: parseFloat(price),
        category_id: parseInt(categoryId),
        supplier_id: parseInt(supplierId)
    };

    products.push(newProduct);
    updateProductList();
    showNotification(`Produk ${name} berhasil ditambahkan.`);
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    const newName = prompt("Edit nama produk:", product.name);
    const newPrice = prompt("Edit harga produk:", product.price);
    const newCategoryId = prompt("Edit kategori produk:", product.category_id);
    const newSupplierId = prompt("Edit supplier produk:", product.supplier_id);

    if (newName && newPrice && newCategoryId && newSupplierId) {
        product.name = newName;
        product.price = parseFloat(newPrice);
        product.category_id = parseInt(newCategoryId);
        product.supplier_id = parseInt(newSupplierId);
        updateProductList();
        showNotification(`Produk ${newName} berhasil diperbarui.`);
    } else {
        alert("Semua kolom harus diisi.");
    }
}

function deleteProduct(productId) {
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex > -1) {
        products.splice(productIndex, 1);
        updateProductList();
        showNotification('Produk berhasil dihapus.');
    }
}

function deleteSelectedProducts() {
    const selectedProductIds = Array.from(document.querySelectorAll('input[name="product-checkbox"]:checked')).map(cb => parseInt(cb.value));
    if (selectedProductIds.length === 0) {
        alert("Harap pilih produk yang ingin dihapus.");
        return;
    }

    products = products.filter(p => !selectedProductIds.includes(p.id));
    updateProductList();
    showNotification('Produk terpilih berhasil dihapus.');
}

function updateProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product) => {
        productList.innerHTML += `
            <div class="product-item">
                <input type="checkbox" name="product-checkbox" value="${product.id}">
                <p>${product.name} - Rp ${product.price} - Kategori: ${product.category_id} - Supplier: ${product.supplier_id}</p>
                <button onclick="editProduct(${product.id})">Edit</button>
                <button onclick="deleteProduct(${product.id})">Hapus</button>
            </div>
        `;
    });
}

function updateCategorySelectOptions() {
    const categorySelect = document.getElementById('product-category-id');
    const filterCategorySelect = document.getElementById('filter-category-id');
    
    categorySelect.innerHTML = '<option value="">Pilih Kategori</option>';
    filterCategorySelect.innerHTML = '<option value="">Pilih Kategori</option>';
    
    categories.forEach(category => {
        categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
        filterCategorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    });
}

function updateSupplierSelectOptions() {
    const supplierSelect = document.getElementById('product-supplier-id');
    const filterSupplierSelect = document.getElementById('filter-supplier-id');
    
    supplierSelect.innerHTML = '<option value="">Pilih Supplier</option>';
    filterSupplierSelect.innerHTML = '<option value="">Pilih Supplier</option>';
    
    suppliers.forEach(supplier => {
        supplierSelect.innerHTML += `<option value="${supplier.id}">${supplier.name}</option>`;
        filterSupplierSelect.innerHTML += `<option value="${supplier.id}">${supplier.name}</option>`;
    });
}

// Transaksi Management
function addTransaction(customerName, productId, quantity) {
    if (!customerName || !productId || !quantity) {
        alert('Harap isi semua kolom transaksi.');
        return;
    }

    const product = products.find(p => p.id === parseInt(productId));
    if (!product) {
        alert('Produk tidak ditemukan.');
        return;
    }

    const newTransaction = {
        id: Date.now(),
        customer_name: customerName,
        product_id: product.id,
        product_name: product.name,
        quantity: parseInt(quantity),
        total_price: product.price * quantity,
        status: 'Pending'
    };

    transactions.push(newTransaction);
    updateTransactionList();
    showNotification(`Transaksi untuk ${customerName} berhasil ditambahkan.`);
}

function updateTransactionList() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';
    
    transactions.forEach(transaction => {
        transactionList.innerHTML += `
            <div class="transaction-item">
                <p>Transaksi ID: ${transaction.id}</p>
                <p>Pelanggan: ${transaction.customer_name}</p>
                <p>Produk: ${transaction.product_name}</p>
                <p>Jumlah: ${transaction.quantity}</p>
                <p>Total Harga: Rp ${transaction.total_price}</p>
                <p>Status: ${transaction.status}</p>
                <button onclick="updateTransactionStatus(${transaction.id}, 'Lunas')">Lunas</button>
                <button onclick="updateTransactionStatus(${transaction.id}, 'Dibatalkan')">Dibatalkan</button>
            </div>
        `;
    });
}

function updateTransactionStatus(transactionId, status) {
    const transaction = transactions.find(t => t.id === transactionId);
    if (transaction) {
        transaction.status = status;
        updateTransactionList();
        showNotification(`Status transaksi ID ${transactionId} berhasil diperbarui.`);
    }
}

function generateTransactionReport() {
    const report = {
        totalPending: transactions.filter(t => t.status === 'Pending').length,
        totalCompleted: transactions.filter(t => t.status === 'Lunas').length,
        totalCancelled: transactions.filter(t => t.status === 'Dibatalkan').length
    };

    alert(`
        Laporan Transaksi:
        - Total Pending: ${report.totalPending}
        - Total Lunas: ${report.totalCompleted}
        - Total Dibatalkan: ${report.totalCancelled}
    `);
}

// Filter Products
function filterProductsByCategoryAndSupplier() {
    const selectedCategoryId = document.getElementById('filter-category-id').value;
    const selectedSupplierId = document.getElementById('filter-supplier-id').value;

    const filteredProducts = products.filter(product => {
        return (selectedCategoryId === "" || product.category_id === parseInt(selectedCategoryId)) &&
               (selectedSupplierId === "" || product.supplier_id === parseInt(selectedSupplierId));
    });

    displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
    const filteredProductList = document.getElementById('filtered-product-list');
    filteredProductList.innerHTML = '';
    
    filteredProducts.forEach(product => {
        filteredProductList.innerHTML += `
            <div class="filtered-product-item">
                <p>${product.name} - Rp ${product.price} - Kategori: ${product.category_id} - Supplier: ${product.supplier_id}</p>
            </div>
        `;
    });
}

// Category Management
function addCategory(name) {
    if (!name) {
        alert('Harap isi kolom kategori.');
        return;
    }

    const newCategory = { id: Date.now(), name: name };
    categories.push(newCategory);
    updateCategorySelectOptions();
    updateProductList();
    showNotification(`Kategori ${name} berhasil ditambahkan.`);
}

function updateCategoryList() {
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';

    categories.forEach(category => {
        categoryList.innerHTML += `
            <div class="category-item">
                <p>${category.name}</p>
            </div>
        `;
    });
}

// Supplier Management
function addSupplier(name) {
    if (!name) {
        alert('Harap isi kolom supplier.');
        return;
    }

    const newSupplier = { id: Date.now(), name: name };
    suppliers.push(newSupplier);
    updateSupplierSelectOptions();
    updateProductList();
    showNotification(`Supplier ${name} berhasil ditambahkan.`);
}

function updateSupplierList() {
    const supplierList = document.getElementById('supplier-list');
    supplierList.innerHTML = '';

    suppliers.forEach(supplier => {
        supplierList.innerHTML += `
            <div class="supplier-item">
                <p>${supplier.name}</p>
            </div>
        `;
    });
}

// Initialize dropdown options
updateProductList();
updateCategorySelectOptions();
updateSupplierSelectOptions();
updateCategoryList();
updateSupplierList();
