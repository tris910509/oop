// Helpers untuk LocalStorage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// Variabel Data
let categories = getFromLocalStorage("categories");
let products = getFromLocalStorage("products");
let suppliers = getFromLocalStorage("suppliers");
let transactions = getFromLocalStorage("transactions");
let users = getFromLocalStorage("users");

// Render Kategori
function renderCategories() {
    const categoryTable = document.getElementById("categoryTable");
    categoryTable.innerHTML = "";
    categories.forEach((category, index) => {
        const row = `<tr>
            <td>${category.name}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editCategory(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCategory(${index})">Hapus</button>
            </td>
        </tr>`;
        categoryTable.innerHTML += row;
    });

    const productCategory = document.getElementById("productCategory");
    productCategory.innerHTML = `<option value="" disabled selected>Pilih Kategori</option>`;
    categories.forEach(category => {
        productCategory.innerHTML += `<option value="${category.name}">${category.name}</option>`;
    });
}

// Tambah Kategori
document.getElementById("categoryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const categoryName = document.getElementById("categoryName").value;
    categories.push({ name: categoryName });
    saveToLocalStorage("categories", categories);
    renderCategories();
    e.target.reset();
});

// Edit Kategori
function editCategory(index) {
    const newName = prompt("Masukkan nama kategori baru:", categories[index].name);
    if (newName) {
        categories[index].name = newName;
        saveToLocalStorage("categories", categories);
        renderCategories();
    }
}

// Hapus Kategori
function deleteCategory(index) {
    if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
        categories.splice(index, 1);
        saveToLocalStorage("categories", categories);
        renderCategories();
    }
}

// Render Produk
function renderProducts() {
    const productTable = document.getElementById("productTable");
    productTable.innerHTML = "";
    products.forEach((product, index) => {
        const row = `<tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Hapus</button>
            </td>
        </tr>`;
        productTable.innerHTML += row;
    });

    const transactionProduct = document.getElementById("transactionProduct");
    transactionProduct.innerHTML = `<option value="" disabled selected>Pilih Produk</option>`;
    products.forEach(product => {
        transactionProduct.innerHTML += `<option value="${product.name}">${product.name}</option>`;
    });
}

// Tambah Produk
document.getElementById("productForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const productName = document.getElementById("productName").value;
    const productCategory = document.getElementById("productCategory").value;
    const productPrice = document.getElementById("productPrice").value;
    const productStock = document.getElementById("productStock").value;
    products.push({
        name: productName,
        category: productCategory,
        price: parseFloat(productPrice),
        stock: parseInt(productStock)
    });
    saveToLocalStorage("products", products);
    renderProducts();
    e.target.reset();
});

// Edit Produk
function editProduct(index) {
    const newName = prompt("Masukkan nama produk baru:", products[index].name);
    const newPrice = prompt("Masukkan harga baru:", products[index].price);
    const newStock = prompt("Masukkan stok baru:", products[index].stock);
    if (newName && newPrice && newStock) {
        products[index].name = newName;
        products[index].price = parseFloat(newPrice);
        products[index].stock = parseInt(newStock);
        saveToLocalStorage("products", products);
        renderProducts();
    }
}

// Hapus Produk
function deleteProduct(index) {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
        products.splice(index, 1);
        saveToLocalStorage("products", products);
        renderProducts();
    }
}

// Render Supplier
function renderSuppliers() {
    const supplierTable = document.getElementById("supplierTable");
    supplierTable.innerHTML = "";
    suppliers.forEach((supplier, index) => {
        const row = `<tr>
            <td>${supplier.name}</td>
            <td>${supplier.contact}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editSupplier(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteSupplier(${index})">Hapus</button>
            </td>
        </tr>`;
        supplierTable.innerHTML += row;
    });
}

// Tambah Supplier
document.getElementById("supplierForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const supplierName = document.getElementById("supplierName").value;
    const supplierContact = document.getElementById("supplierContact").value;
    suppliers.push({ name: supplierName, contact: supplierContact });
    saveToLocalStorage("suppliers", suppliers);
    renderSuppliers();
    e.target.reset();
});

// Edit Supplier
function editSupplier(index) {
    const newName = prompt("Masukkan nama supplier baru:", suppliers[index].name);
    const newContact = prompt("Masukkan kontak baru:", suppliers[index].contact);
    if (newName && newContact) {
        suppliers[index].name = newName;
        suppliers[index].contact = newContact;
        saveToLocalStorage("suppliers", suppliers);
        renderSuppliers();
    }
}

// Hapus Supplier
function deleteSupplier(index) {
    if (confirm("Apakah Anda yakin ingin menghapus supplier ini?")) {
        suppliers.splice(index, 1);
        saveToLocalStorage("suppliers", suppliers);
        renderSuppliers();
    }
}

// Inisialisasi
renderCategories();
renderProducts();
renderSuppliers();
