// Array untuk menyimpan produk
let products = [];

// Fungsi untuk menampilkan produk
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    if (products.length === 0) {
        productList.innerHTML = '<p>Tidak ada produk.</p>';
        return;
    }
    
    products.forEach((product, index) => {
        productList.innerHTML += `
            <div class="product-item">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Harga: Rp ${product.price}</p>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Hapus</button>
            </div>
        `;
    });
}

// Fungsi untuk menambah produk
function addProduct(product) {
    products.push(product);
    displayProducts();
}

// Fungsi untuk edit produk
function editProduct(index) {
    const product = products[index];
    
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-price').value = product.price;
    
    document.getElementById('product-form').classList.remove('hidden');
    document.getElementById('add-product-btn').style.display = 'none';
    
    document.getElementById('form').onsubmit = (event) => {
        event.preventDefault();
        
        products[index] = {
            name: document.getElementById('product-name').value,
            description: document.getElementById('product-description').value,
            price: parseFloat(document.getElementById('product-price').value)
        };
        
        displayProducts();
        cancelForm();
    };
}

// Fungsi untuk hapus produk
function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
}

// Fungsi untuk menampilkan form
document.getElementById('add-product-btn').addEventListener('click', () => {
    document.getElementById('product-form').classList.remove('hidden');
    document.getElementById('add-product-btn').style.display = 'none';
});

// Fungsi untuk membatalkan form
function cancelForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-description').value = '';
    document.getElementById('product-price').value = '';
    
    document.getElementById('product-form').classList.add('hidden');
    document.getElementById('add-product-btn').style.display = 'block';
}

// Fungsi submit form
document.getElementById('form').onsubmit = (event) => {
    event.preventDefault();
    
    const product = {
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: parseFloat(document.getElementById('product-price').value)
    };
    
    addProduct(product);
    cancelForm();
};

// Tampilkan produk saat halaman dimuat
displayProducts();
