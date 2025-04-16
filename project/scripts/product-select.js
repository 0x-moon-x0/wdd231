document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.getElementById("productSelect");
    const productsURL = "https://0x-moon-x0.github.io/wdd231/project/data/products.json";

    async function fetchProducts() {
        try {
            const response = await fetch(productsURL);
            if (!response.ok) throw new Error("Network response was not ok");
            const products = await response.json();

            products.forEach(product => {
                const option = document.createElement("option");
                option.value = product.productName;
                option.textContent = product.productName;
                productSelect.appendChild(option);
            });
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    }

    fetchProducts();
});