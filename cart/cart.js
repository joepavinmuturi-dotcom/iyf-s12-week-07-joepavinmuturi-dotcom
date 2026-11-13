const CART_KEY = "cart";

const state = {
    products: [
        { id: 1, name: "Mandazi (pack of 6)", price: 120 },
        { id: 2, name: "Chapati (pack of 5)", price: 150 },
        { id: 3, name: "Tea leaves 250g", price: 180 },
    ],
    cart: loadCart(),
};

function loadCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) ?? [];
    } catch {
        return [];
    }
}

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
}

function addToCart(productId) {
    const existing = state.cart.find((item) => item.productId === productId);
    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({ productId, quantity: 1 });
    }
    commit();
}

function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const item = state.cart.find((entry) => entry.productId === productId);
    if (item) {
        item.quantity = quantity;
    }
    commit();
}

function removeFromCart(productId) {
    state.cart = state.cart.filter((item) => item.productId !== productId);
    commit();
}

function clearCart() {
    state.cart = [];
    commit();
}

function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find((p) => p.id === item.productId);
        return total + product.price * item.quantity;
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

function commit() {
    saveCart();
    render();
}

function render() {
    const productList = document.getElementById("products");
    const cartList = document.getElementById("cart");
    productList.innerHTML = "";
    cartList.innerHTML = "";

    state.products.forEach((product) => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - KSh ${product.price} `;
        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.addEventListener("click", () => addToCart(product.id));
        li.appendChild(button);
        productList.appendChild(li);
    });

    state.cart.forEach((item) => {
        const product = state.products.find((p) => p.id === item.productId);
        const li = document.createElement("li");
        li.textContent = `${product.name} x ${item.quantity} `;

        const minus = document.createElement("button");
        minus.textContent = "-";
        minus.addEventListener("click", () => updateQuantity(item.productId, item.quantity - 1));

        const plus = document.createElement("button");
        plus.textContent = "+";
        plus.addEventListener("click", () => updateQuantity(item.productId, item.quantity + 1));

        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.addEventListener("click", () => removeFromCart(item.productId));

        li.append(minus, plus, remove);
        cartList.appendChild(li);
    });

    document.getElementById("total").textContent = getCartTotal();
    document.getElementById("cart-count").textContent = getCartCount();
}

document.getElementById("clear-cart").addEventListener("click", clearCart);
render();