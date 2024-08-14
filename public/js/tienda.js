
document.addEventListener('DOMContentLoaded', () => {
    const cartPopup = document.getElementById('cartPopup');
    const cartItems = document.getElementById('cartItems');
    const closeCart = document.getElementById('closeCart');
    const shopContainer = document.querySelector('.shop-container');

    // Event listener para añadir productos al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = e.target.getAttribute('data-product');
            const li = document.createElement('li');
            li.textContent = productName;
            cartItems.appendChild(li);
            cartPopup.style.display = 'flex';
        });
    });

    // Event listener para cerrar el carrito
    closeCart.addEventListener('click', () => {
        cartPopup.style.display = 'none';
    });

    // Event listener para abrir el popup de compra
    shopContainer.addEventListener('click', () => {
        openPurchasePopup();
    });

    // Function to open the purchase popup
    function openPurchasePopup() {
        const purchasePopup = document.createElement('div');
        purchasePopup.className = 'purchase-popup';
        purchasePopup.style.display = 'flex';
        purchasePopup.style.position = 'fixed';
        purchasePopup.style.top = '0';
        purchasePopup.style.left = '0';
        purchasePopup.style.width = '100%';
        purchasePopup.style.height = '100%';
        purchasePopup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        purchasePopup.style.justifyContent = 'center';
        purchasePopup.style.alignItems = 'center';
        purchasePopup.style.zIndex = '1000';

        const purchaseContent = document.createElement('div');
        purchaseContent.className = 'purchase-content';
        purchaseContent.style.backgroundColor = '#fff';
        purchaseContent.style.padding = '20px';
        purchaseContent.style.borderRadius = '10px';
        purchaseContent.style.width = '400px';

        purchaseContent.innerHTML = `
            <h2>Realizar Compra</h2>
            <form id="purchaseForm">
                <label for="name">Nombre:</label><br>
                <input type="text" id="name" name="name" required><br><br>

                <label for="cardNumber">Número de Tarjeta:</label><br>
                <input type="text" id="cardNumber" name="cardNumber" required><br><br>

                <label for="cartItemsList">Productos en el Carrito:</label><br>
                <ul id="cartItemsList">${cartItems.innerHTML}</ul><br>

                <button type="submit">Confirmar Compra</button>
                <button type="button" id="closePurchase">Cancelar</button>
            </form>
        `;

        purchasePopup.appendChild(purchaseContent);
        document.body.appendChild(purchasePopup);

        // Event listener to close the purchase popup
        const closePurchase = document.getElementById('closePurchase');
        closePurchase.addEventListener('click', () => {
            purchasePopup.style.display = 'none';
        });

        // Event listener for the purchase form submission
        document.getElementById('purchaseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Compra realizada con éxito!');
            purchasePopup.style.display = 'none';
            cartItems.innerHTML = ''; // Clear cart after purchase
        });
    }
});

