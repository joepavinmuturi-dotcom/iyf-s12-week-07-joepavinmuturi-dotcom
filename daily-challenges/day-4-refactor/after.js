// AFTER: same behaviour, easier to read, safer to change.
const VAT_RATE = 0.16;
const MIN_PRICE = 0;
const MAX_PRICE = 100;

const items = [];

function isValidItem(name, price) {
    return name.trim() !== "" && price > MIN_PRICE && price < MAX_PRICE;
}

function priceWithVat(price) {
    return price * (1 + VAT_RATE);
}

export function addItem(name, price) {
    if (!isValidItem(name, price)) {
        throw new Error(`Invalid item: "${name}" with price ${price}`);
    }
    items.push({ name, price: priceWithVat(price) });
}

export function getTotal() {
    return items.reduce((total, item) => total + item.price, 0);
}
