// Theatre Feast - Premium Cinema Dining JavaScript

// Application State
let appState = {
  cart: [],
  menuItems: [],
  currentFilter: 'all',
  searchTerm: '',
  isLoading: true
};

// Sample Menu Data (Premium Theatre Items)
const MENU_DATA = [
  // Snacks
  {
    id: "1",
    name: "Truffle Popcorn",
    category: "snacks",
    price:270,
    description: "Artisanal popcorn with black truffle oil and parmesan",
    image: "https://images.unsplash.com/photo-1579642761360-eabd1cca1e81?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
  },
  {
    id: "2",
    name: "chicken momos",
    category: "snacks",
    price:150,
    description: "House-made tortilla chips with premium cheese blend",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169"
  },
  {
    id: "3",
    name: "samosa",
    category: "snacks",
    price:60,
    description: "Selection of handcrafted chocolates from local chocolatiers",
    image: "https://images.unsplash.com/photo-1622715395486-08183374570a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
  },
  // Beverages
  {
    id: "4",
    name: "Signature Theatre Blend",
    category: "beverages",
    price: 69,
    description: "Our exclusive coffee blend with notes of caramel and vanilla",
    image: "https://images.unsplash.com/photo-1545285179-78da7c2b8f83?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
  },
  {
    id: "5",
    name: "Craft Beer Selection",
    category: "beverages",
    price: 89,
    description: "Rotating selection of local craft beers",
    image: "https://images.unsplash.com/photo-1612528443702-f6741f70a049?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1180"
  },
  {
    id: "6",
    name: "Premium Wine",
    category: "beverages",
    price: 149,
    description: "Curated wine selection from award-winning vineyards",
    image: "https://images.unsplash.com/photo-1695048475495-6535686c473c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
  },
  // Meals
  {
    id: "7",
    name: "Wagyu Burger",
    category: "meals",
    price: 299,
    description: "Premium wagyu beef with truffle aioli and aged cheddar",
    image: "https://images.unsplash.com/photo-1559316009-84c6a680c716?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735"
  },
  {
    id: "8",
    name: "Lobster Mac & Cheese",
    category: "meals",
    price: 329,
    description: "Fresh Maine lobster with three-cheese blend and herb crust",
    image: "https://images.unsplash.com/photo-1626911690101-ae8f428b4468?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
  },
  {
    id: "9",
    name: "Mediterranean Mezze",
    category: "meals",
    price: 229,
    description: "Artisanal selection of hummus, olives, cheese, and flatbread",
    image: "https://images.unsplash.com/photo-1748540459503-19efc015143b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=684"
  }
];

// Utility Functions
function generateUUID() {
  return 'xxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}


function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
function formatPrice(price) {
  const num = Number(price);
  if (isNaN(num)) return '₹0.00';
  return formatter.format(num);
}


// Local Storage Functions
function saveCartToStorage() {
  try {
    localStorage.setItem('theatreCart', JSON.stringify(appState.cart));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
}

function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem('theatreCart');
    if (savedCart) {
      appState.cart = JSON.parse(savedCart);
      updateCartUI();
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    appState.cart = [];
  }
}

// Toast Notifications
function showToast(title, description, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  toast.innerHTML = `
    <div class="toast-title">${title}</div>
    <div class="toast-description">${description}</div>
  `;
  
  container.appendChild(toast);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Cart Functions
function addToCart(item) {
  const existingItem = appState.cart.find(cartItem => cartItem.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    appState.cart.push({
      ...item,
      quantity: 1
    });
  }
  
  updateCartUI();
  saveCartToStorage();
  showToast('Added to cart!', `${item.name} has been added to your order.`);
}

function removeFromCart(itemId) {
  appState.cart = appState.cart.filter(item => item.id !== itemId);
  updateCartUI();
  saveCartToStorage();
}

function updateCartItemQuantity(itemId, quantity) {
  if (quantity <= 0) {
    removeFromCart(itemId);
    return;
  }
  
  const item = appState.cart.find(cartItem => cartItem.id === itemId);
  if (item) {
    item.quantity = quantity;
    updateCartUI();
    saveCartToStorage();
  }
}

function getTotalItems() {
  return appState.cart.reduce((total, item) => total + item.quantity, 0);
}

function getTotalPrice() {
  return appState.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function clearCart() {
  appState.cart = [];
  updateCartUI();
  saveCartToStorage();
}

// UI Update Functions
function updateCartUI() {
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  
  // Update cart count
  document.getElementById('cart-count').textContent = totalItems;
  
  // Update cart badge
  const badge = document.getElementById('cart-badge');
  if (totalItems > 0) {
    badge.textContent = totalItems;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
  
  // Update cart total
  document.getElementById('cart-total').textContent = formatPrice(totalPrice);
  document.getElementById('checkout-total').textContent = formatPrice(totalPrice);
  
  // Update checkout button state
  const checkoutBtn = document.getElementById('checkout-btn');
  if (totalItems > 0) {
    checkoutBtn.classList.remove('disabled');
    checkoutBtn.disabled = false;
  } else {
    checkoutBtn.classList.add('disabled');
    checkoutBtn.disabled = true;
  }
  
  renderCartItems();
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  
  if (appState.cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <svg class="empty-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="8" cy="21" r="1"/>
          <circle cx="19" cy="21" r="1"/>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L23 6H6"/>
        </svg>
        <p class="empty-cart-text">Your cart is empty</p>
        <p class="empty-cart-subtext">Add some delicious items to get started!</p>
      </div>
    `;
    return;
  }
  
  cartItemsContainer.innerHTML = appState.cart.map(item => `
    <div class="cart-item" data-testid="cart-item-${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price" data-testid="text-item-price-${item.id}">${formatPrice(item.price)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="quantity-btn" onclick="updateCartItemQuantity('${item.id}', ${item.quantity - 1})" data-testid="button-decrease-${item.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="5" x2="19" y1="12" y2="12"/>
          </svg>
        </button>
        <div class="quantity-display" data-testid="text-quantity-${item.id}">${item.quantity}</div>
        <button class="quantity-btn" onclick="updateCartItemQuantity('${item.id}', ${item.quantity + 1})" data-testid="button-increase-${item.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="12" x2="12" y1="5" y2="19"/>
            <line x1="5" x2="19" y1="12" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
}

// Menu Functions
function filterMenuItems() {
  let filteredItems = appState.menuItems;
  
  // Filter by category
  if (appState.currentFilter !== 'all') {
    filteredItems = filteredItems.filter(item => item.category === appState.currentFilter);
  }
  
  // Filter by search term
  if (appState.searchTerm) {
    filteredItems = filteredItems.filter(item => 
      item.name.toLowerCase().includes(appState.searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(appState.searchTerm.toLowerCase())
    );
  }
  
  renderMenuItems(filteredItems);
}

function renderMenuItems(items) {
  const menuGrid = document.getElementById('menu-grid');
  const noResults = document.getElementById('no-results');
  
  if (items.length === 0) {
    menuGrid.classList.add('hidden');
    noResults.classList.remove('hidden');
    return;
  }
  
  noResults.classList.add('hidden');
  menuGrid.classList.remove('hidden');
  
  menuGrid.innerHTML = items.map(item => `
    <div class="menu-card" data-testid="card-menu-${item.id}">
      <img src="${item.image}" alt="${item.name}" class="menu-card-image">
      <div class="menu-card-content">
        <div class="menu-card-header">
          <h3 class="menu-card-name">${item.name}</h3>
          <span class="menu-card-price" data-testid="text-price-${item.id}">${formatPrice(item.price)}</span>
        </div>
        <p class="menu-card-description">${item.description}</p>
        <button class="add-to-cart-btn" onclick="addToCart(${JSON.stringify(item).replace(/"/g, '&quot;')})" data-testid="button-add-to-cart-${item.id}">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="12" x2="12" y1="5" y2="19"/>
            <line x1="5" x2="19" y1="12" y2="12"/>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// Modal Functions
function openModal(modalId) {
  document.getElementById(modalId).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
  document.body.style.overflow = '';
}

// Cart Sidebar Functions
function openCartSidebar() {
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('cart-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('cart-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

// Form Validation
function validateForm(formData) {
  const errors = {};
  
  if (!formData.customerName.trim()) {
    errors.name = 'Full name is required';
  }
  
  if (!formData.customerEmail.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
    errors.email = 'Please enter a valid email';
  }
  
  if (!formData.seatNumber.trim()) {
    errors.seat = 'Seat number is required';
  }
  
  if (!formData.cardNumber.trim()) {
    errors.card = 'Card number is required';
  } else if (formData.cardNumber.replace(/\s/g, '').length < 13) {
    errors.card = 'Please enter a valid card number';
  }
  
  if (!formData.expiry.trim()) {
    errors.expiry = 'Expiry date is required';
  } else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
    errors.expiry = 'Please enter expiry in MM/YY format';
  }
  
  if (!formData.cvv.trim()) {
    errors.cvv = 'CVV is required';
  } else if (formData.cvv.length < 3) {
    errors.cvv = 'CVV must be at least 3 digits';
  }
  
  return errors;
}

function displayFormErrors(errors) {
  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  
  // Display new errors
  Object.entries(errors).forEach(([field, message]) => {
    const errorElement = document.getElementById(`${field}-error`);
    if (errorElement) {
      errorElement.textContent = message;
    }
  });
}

// Order Processing
async function processOrder(formData) {
  const orderData = {
    customerName: formData.customerName,
    customerEmail: formData.customerEmail,
    seatNumber: formData.seatNumber,
    items: appState.cart.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    total: getTotalPrice()
  };
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const orderId = generateUUID().split('-')[0].toUpperCase();
      resolve({ id: orderId, ...orderData });
    }, 2000);
  });
}

// Initialization
function initializeApp() {
  // Load menu items
  appState.menuItems = MENU_DATA;
  
  // Simulate loading delay
  setTimeout(() => {
    appState.isLoading = false;
    document.getElementById('loading').classList.add('hidden');
    filterMenuItems();
  }, 1000);
  
  // Load cart from storage
  loadCartFromStorage();
  
  // Set up event listeners
  setupEventListeners();
}

function setupEventListeners() {
  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(15, 15, 15, 0.95)';
    } else {
      header.style.background = 'rgba(15, 15, 15, 0.95)';
    }
  });
  
  // Cart button
  document.getElementById('cart-btn').addEventListener('click', openCartSidebar);
  
  // Explore menu button
  document.getElementById('explore-menu-btn').addEventListener('click', () => {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
  });
  
  // Close cart button
  document.getElementById('close-cart').addEventListener('click', closeCartSidebar);
  
  // Cart overlay
  document.getElementById('cart-overlay').addEventListener('click', closeCartSidebar);
  
  // Category filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      appState.currentFilter = btn.dataset.category;
      filterMenuItems();
    });
  });
  
  // Search input
  const searchInput = document.getElementById('search-input');
  const debouncedSearch = debounce((term) => {
    appState.searchTerm = term;
    filterMenuItems();
  }, 300);
  
  searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });
  
  // Checkout button
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (appState.cart.length > 0) {
      closeCartSidebar();
      openModal('checkout-modal');
    }
  });
  
  // Close checkout modal
  document.getElementById('close-checkout').addEventListener('click', () => {
    closeModal('checkout-modal');
  });
  
  // Checkout form
  document.getElementById('checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      customerName: document.getElementById('customer-name').value,
      customerEmail: document.getElementById('customer-email').value,
      seatNumber: document.getElementById('seat-number').value,
      cardNumber: document.getElementById('card-number').value,
      expiry: document.getElementById('expiry').value,
      cvv: document.getElementById('cvv').value
    };
    
    const errors = validateForm(formData);
    
    if (Object.keys(errors).length > 0) {
      displayFormErrors(errors);
      return;
    }
    
    // Clear errors
    displayFormErrors({});
    
    // Disable submit button and show loading
    const submitBtn = document.getElementById('complete-payment');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Processing...';
    
    try {
      const order = await processOrder(formData);
      
      // Clear cart
      clearCart();
      
      // Close checkout modal
      closeModal('checkout-modal');
      
      // Show confirmation modal
      document.getElementById('order-number').textContent = `#${order.id}`;
      openModal('confirmation-modal');
      
      // Reset form
      document.getElementById('checkout-form').reset();
      
      showToast('Order placed successfully!', 'Your delicious order will be delivered to your seat.');
      
    } catch (error) {
      showToast('Order failed', 'Please try again or contact support.', 'error');
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect width="20" height="14" x="2" y="5" rx="2"/>
          <line x1="2" x2="22" y1="10" y2="10"/>
        </svg>
        Complete Payment
      `;
    }
  });
  
  // Continue shopping button
  document.getElementById('continue-shopping').addEventListener('click', () => {
    closeModal('confirmation-modal');
  });
  
  // Close modals when clicking outside
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
  
  // Format card number input
  document.getElementById('card-number').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/(.{4})/g, '$1 ');
    e.target.value = value.trim();
  });
  
  // Format expiry input
  document.getElementById('expiry').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
  });
  
  // CVV input - numbers only
  document.getElementById('cvv').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  });
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
