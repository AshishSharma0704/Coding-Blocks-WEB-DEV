let productDATAS = [];

const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const productContainer = document.getElementById("productContainer");

async function fetchProducts() {
    const query = searchInput.value.trim();
    let url = "https://dummyjson.com/products";

    if (query !== "") {
        url = `https://dummyjson.com/products/search?q=${query}`;
    }

    try {
        productContainer.innerHTML = "<p>Loading...</p>";
        const response = await fetch(url);
        const data = await response.json();
        
        productDATAS = data.products; 

        applySorting();
        Display(productDATAS);
    } catch (error) {
        console.error("Error fetching data:", error);
        productContainer.innerHTML = "<p style='color:red;'>Failed to load products.</p>";
    }
}

function Display(products) {
    productContainer.innerHTML = "";

    if (products.length === 0) {
        productContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    products.forEach(product => {
        const cardHTML = `
            <div class="card">
                <img src="${product.thumbnail || 'https://via.placeholder.com/150'}" alt="${product.title}">
                <div>
                    <h3>${product.title}</h3>
                    <p>${product.description.substring(0, 60)}...</p>
                </div>
                <p class="price">$${product.price}</p>
            </div>
        `;
        productContainer.innerHTML += cardHTML;
    });
}

function applySorting() {
    const sortValue = sortSelect.value;

    if (sortValue === "asc") {
        productDATAS.sort((a, b) => a.price - b.price);
    } else if (sortValue === "desc") {
        productDATAS.sort((a, b) => b.price - a.price);
    }
}

sortSelect.addEventListener("change", () => {
    applySorting();
    Display(productDATAS);
});

searchInput.addEventListener("input", () => {
    fetchProducts();
});

fetchProducts();