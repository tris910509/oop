// Simpan produk, transaksi, kategori, dan supplier
let products = [];
let transactions = [];
let categories = [];
let suppliers = [];

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    alert(message);
}

// Tambahkan Produk
function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const categoryId = document.getElementById('product-category-id').value;
    const supplierId = document.getElementById('product-supplier-id').value;

    if (!name || !price || !categoryId || !supplierId) {
        alert('Harap isi semua kolom produk.');
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
    showNotification('Produk berhasil ditambahkan.');
}

// Perbarui daftar produk
function updateProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        productList.innerHTML += `
            <div class="product-item">
                <p>${product.name} - Rp ${product.price} - Kategori: ${product.category_id} - Supplier: ${product.supplier_id}</p>
            </div>
        `;
    });
}

// Tambahkan Transaksi
function addTransaction() {
    const customerName = document.getElementById('transaction-customer-name').value;
    const productId = document.getElementById('transaction-product-id').value;
    const quantity = document.getElementById('transaction-quantity').value;

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
        customerName: customerName,
        productId: parseInt(productId),
        quantity: parseInt(quantity),
        status: 'Pending'
    };

    transactions.push(newTransaction);
    updateTransactionList();
    showNotification('Transaksi berhasil ditambahkan.');
}

// Perbarui daftar transaksi
function updateTransactionList() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const product = products.find(p => p.id === transaction.productId);
        if (product) {
            transactionList.innerHTML += `
                <div class="transaction-item">
                    <p>
                        ${transaction.customerName} - Produk: ${product.name} - Jumlah: ${transaction.quantity} - Status: ${transaction.status}
                        <button class="btn btn-info btn-sm ml-2" onclick="changeTransactionStatus(${transaction.id}, 'Lunas')">Lunas</button>
                        <button class="btn btn-danger btn-sm ml-2" onclick="changeTransactionStatus(${transaction.id}, 'Dibatalkan')">Batalkan</button>
                    </p>
                </div>
            `;
        } else {
            console.error('Produk tidak ditemukan dalam transaksi:', transaction);
        }
    });
}

// Ubah status transaksi
function changeTransactionStatus(transactionId, status) {
    const transaction = transactions.find(t => t.id === transactionId);
    if (transaction) {
        transaction.status = status;
        updateTransactionList();
        showNotification(`Status transaksi berhasil diperbarui menjadi ${status}.`);
    } else {
        alert('Transaksi tidak ditemukan.');
    }
}

// Filter Produk berdasarkan Kategori dan Supplier
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

// Tambahkan Kategori
function addCategory() {
    const name = document.getElementById('category-name').value;
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

// Tambahkan Supplier
function addSupplier() {
    const name = document.getElementById('supplier-name').value;
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

// Update Daftar Kategori dan Supplier
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

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    updateProductSelectOptions();
    updateCategorySelectOptions();
    updateSupplierSelectOptions();
    updateCategoryList();
    updateSupplierList();
});
