document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    });

    // Mobile Menu Toggle
    const openNavMenu = document.querySelector('.open-nav-menu');
    const closeNavMenu = document.querySelector('.close-nav-menu');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    openNavMenu.addEventListener('click', toggleMenu);
    closeNavMenu.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);
    
    	function toggleMenu() {
		navMenu.classList.toggle('active');
		menuOverlay.classList.toggle('active');
		document.body.classList.toggle('hidden-scrolling');
		openNavMenu.classList.toggle('active');
	}
    
    // Close Mobile Menu When Clicking Menu Items
    const navMenuItems = document.querySelectorAll('.nav-menu .menu-item a');
    navMenuItems.forEach(item => {
        if(item.parentElement.classList.contains('menu-item-has-children')) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const subMenu = this.parentElement.querySelector('.sub-menu');
                subMenu.classList.toggle('active');
            });
        } else {
            item.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.classList.remove('hidden-scrolling');
            });
        }
    });

    // Search Toggle
    const searchBtn = document.querySelector('.search-btn');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeSearch = document.querySelector('.close-search');
    
    searchBtn.addEventListener('click', function() {
        searchOverlay.classList.add('active');
        document.body.classList.add('hidden-scrolling');
    });
    
    closeSearch.addEventListener('click', function() {
        searchOverlay.classList.remove('active');
        document.body.classList.remove('hidden-scrolling');
    });

    // Hero Slider
    const sliderItems = document.querySelectorAll('.slider-item');
    const prevSlide = document.querySelector('.prev-slide');
    const nextSlide = document.querySelector('.next-slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        sliderItems.forEach(item => item.classList.remove('active'));
        sliderItems[index].classList.add('active');
    }
    
    function nextSlideFunc() {
        currentSlide = (currentSlide + 1) % sliderItems.length;
        showSlide(currentSlide);
    }
    
    function prevSlideFunc() {
        currentSlide = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
        showSlide(currentSlide);
    }
    
    nextSlide.addEventListener('click', nextSlideFunc);
    prevSlide.addEventListener('click', prevSlideFunc);
    
    // Auto Slide
    let slideInterval = setInterval(nextSlideFunc, 5000);
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlideFunc, 5000);
    }
    
    nextSlide.addEventListener('click', resetInterval);
    prevSlide.addEventListener('click', resetInterval);
    
    // Initialize first slide
    showSlide(currentSlide);

    // Product Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productsGrid = document.querySelector('.products-grid');
    
    // Sample product data
    const products = [
        {
            id: 1,
            title: 'Ahşap Sehpa',
            category: 'mobilya',
            price: 599,
            oldPrice: 799,
            image: 'images/product1.jpg.svg',
            badge: 'Yeni'
        },
        {
            id: 2,
            title: 'Modern Koltuk Takımı',
            category: 'mobilya',
            price: 3499,
            oldPrice: 4299,
            image: 'images/product2.jpg.svg',
            badge: 'İndirim'
        },
        {
            id: 3,
            title: 'El Yapımı Tesbih',
            category: 'tesbih',
            price: 299,
            image: 'images/product3.jpg.svg'
        },
        {
            id: 4,
            title: 'Ahşap Dekoratif Tablo',
            category: 'aksesuar',
            price: 199,
            image: 'images/product4.jpg.svg'
        },
        {
            id: 5,
            title: 'Şık Yemek Masası',
            category: 'mobilya',
            price: 2299,
            image: 'images/product5.jpg.svg'
        },
        {
            id: 6,
            title: 'Kehribar Tesbih',
            category: 'tesbih',
            price: 499,
            oldPrice: 599,
            image: 'images/product6.jpg.svg',
            badge: 'İndirim'
        },
        {
            id: 7,
            title: 'Modern Avize',
            category: 'aksesuar',
            price: 899,
            image: 'images/product7.jpg.svg'
        },
        {
            id: 8,
            title: 'Rahat Koltuk',
            category: 'mobilya',
            price: 1599,
            image: 'images/product8.jpg.svg'
        }
    ];
    
    // Display products
    function displayProducts(category = 'all') {
        productsGrid.innerHTML = '';
        
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(product => product.category === category);
        
        filteredProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.setAttribute('data-category', product.category);
            productItem.setAttribute('data-id', product.id);
            
            let badgeHTML = '';
            if(product.badge) {
                badgeHTML = `<span class="product-badge">${product.badge}</span>`;
            }
            
            let oldPriceHTML = '';
            if(product.oldPrice) {
                oldPriceHTML = `<span class="old-price">${product.oldPrice}₺</span>`;
            }
            
            productItem.innerHTML = `
                ${badgeHTML}
                <div class="product-img">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-actions">
                        <button class="quick-view-btn" data-id="${product.id}"><i class="fas fa-eye"></i></button>
                        <button class="add-to-wishlist" data-id="${product.id}"><i class="fas fa-heart"></i></button>
                    </div>
                </div>
                <div class="product-content">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <div>
                            ${oldPriceHTML}
                            <span class="current-price">${product.price}₺</span>
                        </div>
                        <button class="add-to-cart" data-id="${product.id}"><i class="fas fa-shopping-cart"></i></button>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productItem);
        });
        
        // Add event listeners to new elements
        addProductEventListeners();
    }
    
    // Initialize products
    displayProducts();
    
    // Tab click event
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            displayProducts(category);
        });
    });
    
    // Add product event listeners
    function addProductEventListeners() {
        // Quick view
        const quickViewBtns = document.querySelectorAll('.quick-view-btn');
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                openQuickView(productId);
            });
        });
        
        // Add to cart
        const addToCartBtns = document.querySelectorAll('.add-to-cart');
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                addToCart(productId);
            });
        });
    }
    
    // Quick View Modal
    const quickViewModal = document.querySelector('.quick-view-modal');
    const closeQuickView = document.querySelector('.close-quick-view');
    const quickViewContent = document.querySelector('.quick-view-content');
    
    function openQuickView(productId) {
        const product = products.find(p => p.id == productId);
        
        if(product) {
            let oldPriceHTML = '';
            if(product.oldPrice) {
                oldPriceHTML = `<span class="old-price">${product.oldPrice}₺</span>`;
            }
            
            quickViewContent.innerHTML = `
                <div class="quick-view-img">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="quick-view-details">
                    <h2>${product.title}</h2>
                    <div class="price">
                        ${oldPriceHTML}
                        <span class="current-price">${product.price}₺</span>
                    </div>
                    <div class="category"><span>Kategori:</span> ${product.category}</div>
                    <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div class="quantity-selector">
                        <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
                        <input type="number" value="1" min="1" class="quantity-input">
                        <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
                    </div>
                    <button class="btn add-to-cart-btn" data-id="${product.id}">Sepete Ekle</button>
                </div>
            `;
            
            // Add event listener to quick view add to cart button
            const quickViewAddToCart = document.querySelector('.add-to-cart-btn');
            quickViewAddToCart.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const quantity = document.querySelector('.quantity-input').value;
                addToCart(productId, quantity);
            });
            
            // Quantity controls
            const minusBtn = document.querySelector('.quantity-btn.minus');
            const plusBtn = document.querySelector('.quantity-btn.plus');
            const quantityInput = document.querySelector('.quantity-input');
            
            minusBtn.addEventListener('click', function() {
                let value = parseInt(quantityInput.value);
                if(value > 1) {
                    quantityInput.value = value - 1;
                }
            });
            
            plusBtn.addEventListener('click', function() {
                let value = parseInt(quantityInput.value);
                quantityInput.value = value + 1;
            });
            
            quickViewModal.classList.add('active');
            document.body.classList.add('hidden-scrolling');
        }
    }
    
    closeQuickView.addEventListener('click', function() {
        quickViewModal.classList.remove('active');
        document.body.classList.remove('hidden-scrolling');
    });
    
    // Cart Functionality
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const cartBody = document.querySelector('.cart-body');
    const cartCount = document.querySelector('.cart-count');
    const totalPrice = document.querySelector('.total-price');
    
    let cart = [];
    
    // Open/Close Cart
    cartBtn.addEventListener('click', function() {
        cartSidebar.classList.add('active');
        document.body.classList.add('hidden-scrolling');
    });
    
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        document.body.classList.remove('hidden-scrolling');
    });
    
    // Add to Cart
    function addToCart(productId, quantity = 1) {
        const product = products.find(p => p.id == productId);
        
        if(product) {
            const existingItem = cart.find(item => item.id == productId);
            
            if(existingItem) {
                existingItem.quantity += parseInt(quantity);
            } else {
                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: parseInt(quantity)
                });
            }
            
            updateCart();
            showAddedToCartMessage(product.title);
        }
    }
    
    // Update Cart
    function updateCart() {
        cartBody.innerHTML = '';
        let count = 0;
        let total = 0;
        
        if(cart.length === 0) {
            cartBody.innerHTML = '<p class="empty-cart">Sepetiniz boş</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <h3 class="cart-item-title">${item.title}</h3>
                        <div class="cart-item-price">${item.price}₺</div>
                        <div class="cart-item-actions">
                            <div class="quantity-control">
                                <button class="quantity-btn minus" data-id="${item.id}"><i class="fas fa-minus"></i></button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn plus" data-id="${item.id}"><i class="fas fa-plus"></i></button>
                            </div>
                            <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
                cartBody.appendChild(cartItem);
                
                count += item.quantity;
                total += item.price * item.quantity;
            });
            
            // Add event listeners to cart items
            const minusBtns = document.querySelectorAll('.quantity-btn.minus');
            const plusBtns = document.querySelectorAll('.quantity-btn.plus');
            const removeBtns = document.querySelectorAll('.remove-item');
            
            minusBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    updateCartItemQuantity(productId, -1);
                });
            });
            
            plusBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    updateCartItemQuantity(productId, 1);
                });
            });
            
            removeBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    removeCartItem(productId);
                });
            });
        }
        
        cartCount.textContent = count;
        totalPrice.textContent = total + '₺';
    }
    
    // Update Cart Item Quantity
    function updateCartItemQuantity(productId, change) {
        const itemIndex = cart.findIndex(item => item.id == productId);
        
        if(itemIndex !== -1) {
            cart[itemIndex].quantity += change;
            
            if(cart[itemIndex].quantity < 1) {
                cart.splice(itemIndex, 1);
            }
            
            updateCart();
        }
    }
    
    // Remove Cart Item
    function removeCartItem(productId) {
        cart = cart.filter(item => item.id != productId);
        updateCart();
    }
    
    // Show Added to Cart Message
    function showAddedToCartMessage(productTitle) {
        const message = document.createElement('div');
        message.className = 'added-to-cart-message';
        message.innerHTML = `
            <div class="message-content">
                <i class="fas fa-check-circle"></i>
                <span>${productTitle} sepete eklendi!</span>
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 3000);
    }
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if(window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Testimonials Slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;
    
    testimonialsSlider.addEventListener('mousedown', dragStart);
    testimonialsSlider.addEventListener('touchstart', dragStart);
    
    testimonialsSlider.addEventListener('mousemove', drag);
    testimonialsSlider.addEventListener('touchmove', drag);
    
    testimonialsSlider.addEventListener('mouseup', dragEnd);
    testimonialsSlider.addEventListener('mouseleave', dragEnd);
    testimonialsSlider.addEventListener('touchend', dragEnd);
    
    function dragStart(e) {
        if(e.type === 'touchstart') {
            startPos = e.touches[0].clientX;
        } else {
            startPos = e.clientX;
            e.preventDefault();
        }
        
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        testimonialsSlider.classList.add('grabbing');
    }
    
    function drag(e) {
        if(isDragging) {
            const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const diff = currentPosition - startPos;
            currentTranslate = prevTranslate + diff;
        }
    }
    
    function dragEnd() {
        cancelAnimationFrame(animationID);
        isDragging = false;
        
        const movedBy = currentTranslate - prevTranslate;
        
        if(movedBy < -100 && currentIndex < testimonialsSlider.children.length - 1) {
            currentIndex += 1;
        }
        
        if(movedBy > 100 && currentIndex > 0) {
            currentIndex -= 1;
        }
        
        setPositionByIndex();
        testimonialsSlider.classList.remove('grabbing');
    }
    
    function animation() {
        setSliderPosition();
        if(isDragging) requestAnimationFrame(animation);
    }
    
    function setSliderPosition() {
        testimonialsSlider.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function setPositionByIndex() {
        const itemWidth = testimonialsSlider.children[0].offsetWidth + 30;
        currentTranslate = currentIndex * -itemWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }
    
    // Brands Slider
    const brandsSlider = document.querySelector('.brands-slider');
    let brandIndex = 0;
    
    function moveBrands() {
        brandIndex++;
        if(brandIndex > 2) brandIndex = 0;
        
        const itemWidth = brandsSlider.children[0].offsetWidth + 30;
        brandsSlider.style.transform = `translateX(-${brandIndex * itemWidth}px)`;
    }
    
    setInterval(moveBrands, 3000);
    
    // Initialize empty cart
    updateCart();
});