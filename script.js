document.addEventListener('DOMContentLoaded', () => {
    // Cart array to store items
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to update cart display
    function updateCartDisplay() {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 5px;">
                <div>
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                    <button class="remove-from-cart" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const item = {
                name: product.querySelector('h3').textContent,
                price: parseFloat(product.querySelector('p').textContent.replace('₹', '')),
                image: product.querySelector('img').src
            };

            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${item.name} added to cart!`);
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simulate form submission
            alert(`Thank you, ${name}! Your message has been sent.`);
            contactForm.reset();
        });
    }

    // Checkout functionality
    const checkoutButton = document.querySelector('#cart button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Proceeding to checkout...');
            // Clear cart after checkout
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        });
    }

    // Navigation highlighting
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Initial cart display update
    updateCartDisplay();
});