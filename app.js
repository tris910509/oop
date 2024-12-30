// Mendapatkan elemen DOM
const productForm = document.getElementById('product-form');
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');
const productQuantity = document.getElementById('product-quantity');
const productList = document.getElementById('product-list').getElementsByTagName('tbody')[0];
const totalAmount = document.getElementById('total-amount');

// Memuat data produk dari localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Fungsi untuk menyimpan data produk ke localStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Fungsi untuk menampilkan daftar produk
function renderProducts() {
    productList.innerHTML = '';
    let total = 0;
    products.forEach((product, index) => {
        const row = productList.insertRow();
        row.innerHTML = `
            <td>${product.name}</td>
            <td>Rp ${product.price.toLocaleString()}</td>
            <td>${product.quantity}</td>
            <td>Rp ${(product.price * product.quantity).toLocaleString()}</td>
            <td>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Hapus</button>
            </td>
        `;
        total += product.price * product.quantity;
    });
    totalAmount.textContent = total.toLocaleString();
}

// Fungsi untuk menambah produk
function addProduct(name, price, quantity) {
    products.push({ name, price, quantity });
    saveProducts();
    renderProducts();
}

// Fungsi untuk mengedit produk
function editProduct(index) {
    const product = products[index];
    productName.value = product.name;
    productPrice.value = product.price;
    productQuantity.value = product.quantity;
    productForm.onsubmit = (e) => {
        e.preventDefault();
        product.name = productName.value;
        product.price = parseFloat(productPrice.value);
        product.quantity = parseInt(productQuantity.value);
        saveProducts();
        renderProducts();
        productForm.onsubmit = addProductHandler;
        productForm.reset();
    };
}

// Fungsi untuk menghapus produk
function deleteProduct(index) {
    products.splice(index, 1);
    saveProducts();
    renderProducts();
}

// Event listener untuk form tambah produk
productForm.onsubmit = (e) => {
    e.preventDefault();
    addProduct(
        productName.value,

::contentReference[oaicite:0]{index=0}
