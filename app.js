// Array untuk menyimpan produk, kategori, supplier, dan pelanggan
let products = [];
let categories = [];
let suppliers = [];
let customers = [];

// Fungsi untuk menampilkan kategori
function loadCategories() {
    categories.forEach((category) => {
        const categorySelect = document.getElementById('product-category');
        categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    });
}

// Fungsi untuk menampilkan supplier
function loadSuppliers() {
    suppliers.forEach((supplier) => {
        const supplierSelect = document.getElementById('product-supplier');
        supplierSelect.innerHTML += `<option value="${supplier.id}">${supplier.name}</option>`;
    });
}

// Fungsi untuk menampilkan pelanggan
function loadCustomers() {
    const customerSelect = document.getElementById('customer-select');
    customers.forEach((customer) => {
        customerSelect.innerHTML += `<option value="${customer.id}">${customer.name}</option>`;
    });
}

// Fungsi untuk menampilkan produk
function displayProducts(filteredData = products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    if (filteredData.length === 0) {
        productList.innerHTML = '<p>Tidak ada produk.</p>';
        return;
    }

    filteredData.forEach((product, index) => {
        const category = categories.find(cat => cat.id === product.category_id)?.name || 'N/A';
        const supplier = suppliers.find(supp => supp.id === product.supplier_id)?.name || 'N/A';

        productList.innerHTML += `
            <div class="product-item">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Harga: Rp ${product.price}</p>
                <p>Kategori: ${category}</p>
                <p>Supplier: ${supplier}</p>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Hapus</button>
            </div>
        `;
    });

    // Hapus pagination sebelumnya jika ada
    const pagination = document.querySelector('.pagination');
    if (pagination) {
        pagination.remove();
    }

    if (filteredData.length > 10) {
        createPagination(filteredData);
    }
}

// Fungsi untuk menambah produk
function addProduct(product) {
    if (!product.name || !product.description || isNaN(product.price)) {
        alert("Harap isi semua kolom dengan benar.");
        return;
    }
    products.push(product);
    displayProducts();
}

// Fungsi untuk edit produk
function editProduct(index) {
    const product = products[index];

    document.getElementById('product-name').value = product.name;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-category').value = product.category_id;
    document.getElementById('product-supplier').value = product.supplier_id;
    
    document.getElementById('product-form').classList.remove('hidden');
    document.getElementById('add-product-btn').style.display = 'none';
    
    document.getElementById('form').onsubmit = (event) => {
        event.preventDefault();
        
        products[index] = {
            name: document.getElementById('product-name').value,
            description: document.getElementById('product-description').value,
            price: parseFloat(document.getElementById('product-price').value),
            category_id: parseInt(document.getElementById('product-category').value),
            supplier_id: parseInt(document.getElementById('product-supplier').value)
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
    document.getElementById('product-category').value = '';
    document.getElementById('product-supplier').value = '';
    
    document.getElementById('product-form').classList.add('hidden');
    document.getElementById('add-product-btn').style.display = 'block';
}

// Fungsi submit form
document.getElementById('form').onsubmit = (event) => {
    event.preventDefault();
    
    const product = {
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: parseFloat(document.getElementById('product-price').value),
        category_id: parseInt(document.getElementById('product-category').value),
        supplier_id: parseInt(document.getElementById('product-supplier').value)
    };
    
    addProduct(product);
    cancelForm();
};

// Fungsi pencarian produk berdasarkan kategori dan supplier
function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category_id.toString().includes(query) || 
        product.supplier_id.toString().includes(query)
    );
    displayProducts(filteredProducts);
}

// Fungsi untuk membuat pagination
function createPagination(data) {
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');
    
    let pages = Math.ceil(data.length / 10);
    for (let i = 1; i <= pages; i++) {
        pagination.innerHTML += `<button onclick="goToPage(${i}, data)">${i}</button>`;
    }
    
    document.getElementById('product-list').appendChild(pagination);
}

// Fungsi untuk mengganti halaman produk
function goToPage(page, data) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    let start = (page - 1) * 10;
    let end = page * 10;
    const productsToShow = data.slice(start, end);
    
    displayProducts(productsToShow);
}

// Tampilkan produk saat halaman dimuat
displayProducts();
