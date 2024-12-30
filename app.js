// Data Simulasi
let categories = [];
let products = [];
let suppliers = [];
let transactions = [];
let users = [];

// Fungsi Tambah Kategori
document.getElementById("categoryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const categoryName = document.getElementById("categoryName").value.trim();
    if (categoryName) {
        categories.push({ name: categoryName });
        document.getElementById("categoryName").value = "";
        updateCategoryTable();
        populateCategoryDropdown();
        alert("Kategori berhasil ditambahkan!");
    } else {
        alert("Nama kategori tidak boleh kosong.");
    }
});

// Fungsi Menampilkan Kategori
function updateCategoryTable() {
    const categoryTable = document.getElementById("categoryTable");
    categoryTable.innerHTML = categories
        .map(
            (category, index) => `
        <tr>
            <td>${category.name}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteCategory(${index})">Hapus</button>
            </td>
        </tr>`
        )
        .join("");
}

// Fungsi Menghapus Kategori
function deleteCategory(index) {
    categories.splice(index, 1);
    updateCategoryTable();
    populateCategoryDropdown();
    alert("Kategori berhasil dihapus.");
}

// Fungsi Populasi Dropdown Kategori
function populateCategoryDropdown() {
    const categoryDropdown = document.getElementById("productCategory");
    categoryDropdown.innerHTML = '<option value="" disabled selected>Pilih kategori</option>';
    categories.forEach((category) => {
        categoryDropdown.innerHTML += `<option value="${category.name}">${category.name}</option>`;
    });
}

// Fungsi Tambah Produk
document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const productName = document.getElementById("productName").value.trim();
    const productCategory = document.getElementById("productCategory").value;
    const productPrice = parseFloat(document.getElementById("productPrice").value);
    const productStock = parseInt(document.getElementById("productStock").value, 10);
    const productDescription = document.getElementById("productDescription").value.trim();

    if (productName && productCategory && productPrice > 0 && productStock >= 0) {
        products.push({
            name: productName,
            category: productCategory,
            price: productPrice,
            stock: productStock,
            description: productDescription,
        });
        updateProductTable();
        document.getElementById("productForm").reset();
        alert("Produk berhasil ditambahkan!");
    } else {
        alert("Mohon lengkapi semua data produk.");
    }
});

// Fungsi Menampilkan Produk
function updateProductTable() {
    const productTable = document.getElementById("productTable");
    productTable.innerHTML = products
        .map(
            (product, index) => `
        <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.description}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Hapus</button>
            </td>
        </tr>`
        )
        .join("");
}

// Fungsi Menghapus Produk
function deleteProduct(index) {
    products.splice(index, 1);
    updateProductTable();
    alert("Produk berhasil dihapus.");
}

// Fungsi Tambah Supplier
document.getElementById("supplierForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const supplierName = document.getElementById("supplierName").value.trim();
    const supplierContact = document.getElementById("supplierContact").value.trim();
    if (supplierName && supplierContact) {
        suppliers.push({ name: supplierName, contact: supplierContact });
        document.getElementById("supplierForm").reset();
        updateSupplierTable();
        alert("Supplier berhasil ditambahkan!");
    } else {
        alert("Mohon lengkapi semua data supplier.");
    }
});

// Fungsi Menampilkan Supplier
function updateSupplierTable() {
    const supplierTable = document.getElementById("supplierTable");
    supplierTable.innerHTML = suppliers
        .map(
            (supplier, index) => `
        <tr>
            <td>${supplier.name}</td>
            <td>${supplier.contact}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteSupplier(${index})">Hapus</button>
            </td>
        </tr>`
        )
        .join("");
}

// Fungsi Menghapus Supplier
function deleteSupplier(index) {
    suppliers.splice(index, 1);
    updateSupplierTable();
    alert("Supplier berhasil dihapus.");
}

// Fungsi Tambah Transaksi
document.getElementById("transactionForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const transactionProduct = document.getElementById("transactionProduct").value;
    const transactionQuantity = parseInt(document.getElementById("transactionQuantity").value, 10);
    const transactionCustomer = document.getElementById("transactionCustomer").value.trim();
    const paymentStatus = document.querySelector('input[name="paymentStatus"]:checked').value;

    const product = products.find((prod) => prod.name === transactionProduct);

    if (transactionProduct && transactionQuantity > 0 && product.stock >= transactionQuantity) {
        const totalPrice = product.price * transactionQuantity;
        transactions.push({
            product: transactionProduct,
            quantity: transactionQuantity,
            customer: transactionCustomer,
            totalPrice: totalPrice,
            paymentStatus: paymentStatus,
            date: new Date().toISOString().split("T")[0],
        });
        product.stock -= transactionQuantity;
        updateTransactionTable();
        updateProductTable();
        alert("Transaksi berhasil ditambahkan!");
    } else {
        alert("Stok tidak mencukupi atau data tidak valid.");
    }
});

// Fungsi Menampilkan Transaksi
function updateTransactionTable() {
    const transactionTable = document.getElementById("transactionTable");
    transactionTable.innerHTML = transactions
        .map(
            (transaction, index) => `
        <tr>
            <td>${transaction.product}</td>
            <td>${transaction.quantity}</td>
            <td>${transaction.customer}</td>
            <td>${transaction.totalPrice}</td>
            <td>${transaction.paymentStatus}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${index})">Hapus</button>
            </td>
        </tr>`
        )
        .join("");
}

// Fungsi Menghapus Transaksi
function deleteTransaction(index) {
    const transaction = transactions[index];
    const product = products.find((prod) => prod.name === transaction.product);
    if (product) {
        product.stock += transaction.quantity;
    }
    transactions.splice(index, 1);
    updateTransactionTable();
    updateProductTable();
    alert("Transaksi berhasil dihapus.");
}

// Inisialisasi
populateCategoryDropdown();
updateCategoryTable();
updateProductTable();
updateSupplierTable();
updateTransactionTable();
