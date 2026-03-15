// ============================================
// Neo Moloi's TUTORING WEBSITE - JAVASCRIPT
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVIGATION & MENU
    // ============================================
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Search icon functionality
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            const searchQuery = prompt('What are you looking for?');
            if (searchQuery) {
                console.log('Searching for:', searchQuery);
                // You can implement actual search functionality here
                alert(`Search functionality will be implemented. Searching for: ${searchQuery}`);
            }
        });
    }

    // Mobile menu toggle (if you add hamburger menu)
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.style.display = 'none';
        
        // Add to nav
        nav.insertBefore(hamburger, navLinks);
        
        // Toggle menu
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });
        
        // Show hamburger on mobile
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'block';
            } else {
                hamburger.style.display = 'none';
                navLinks.classList.remove('mobile-active');
            }
        });
    };

    // ============================================
    // HERO SECTION BUTTONS
    // ============================================
    
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to classes section or open registration form
            const classesSection = document.querySelector('.classes');
            if (classesSection) {
                classesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Or redirect to registration page
            // window.location.href = 'register.html';
            
            // Or show modal
            showRegistrationModal();
        });
    });

    // ============================================
    // CLASS CARDS - LEARN MORE BUTTONS
    // ============================================
    
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.class-card');
            const className = card.querySelector('h3').textContent;
            
            if (this.textContent.includes('Coming Soon')) {
                alert('This program is coming soon! Stay tuned for updates.');
                return;
            }
            
            if (this.textContent.includes('Contact Us')) {
                scrollToContact();
                return;
            }
            
            if (this.textContent.includes('Register')) {
                showRegistrationModal(className);
                return;
            }
            
            // Default action - show more info
            showClassDetails(className);
        });
    });

    // ============================================
    // REGISTER TODAY SECTION BUTTONS
    // ============================================
    
    const allClassesButtons = document.querySelectorAll('.btn-gold');
    allClassesButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('All Classes') || this.textContent.includes('View All Classes')) {
                const classesSection = document.querySelector('.classes');
                if (classesSection) {
                    classesSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    const contactButtons = document.querySelectorAll('.btn-teal');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Contact')) {
                scrollToContact();
            }
        });
    });

    // ============================================
    // FAQ SECTION
    // ============================================
    
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            this.classList.toggle('active');
        });
    });

    // More FAQ button
    const moreFaqButton = document.querySelector('.btn-more-faq');
    if (moreFaqButton) {
        moreFaqButton.addEventListener('click', function() {
            // Redirect to FAQ page or expand all FAQs
            window.location.href = 'faq.html';
            // OR expand all FAQs:
            // faqItems.forEach(item => item.classList.add('active'));
        });
    }

    // ============================================
    // SOCIAL MEDIA LINKS
    // ============================================
    
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Define your social media URLs
            const socialUrls = {
                0: 'https://www.facebook.com/neomoloicentre', // Facebook
                1: 'https://www.instagram.com/neomoloicentre', // Instagram
                2: 'https://www.tiktok.com/@neomoloicentre', // TikTok
                3: 'https://www.linkedin.com/in/neomoloicentre', // LinkedIn
                4: 'https://www.youtube.com/@nemoloicentre' // YouTube
            };
            
            const url = socialUrls[index];
            if (url) {
                window.open(url, '_blank');
            }
        });
    });

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.class-card, .testimonial-card').forEach(card => {
        observer.observe(card);
    });

    // ============================================
    // STICKY HEADER
    // ============================================
    
    const header = document.querySelector('header');
    const topBar = document.querySelector('.top-bar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('sticky');
            topBar.style.display = 'none';
        } else {
            header.classList.remove('sticky');
            topBar.style.display = 'flex';
        }
        
        lastScroll = currentScroll;
    });

    // ============================================================
// cart.js — Science & Geography Centre Cart System
// ============================================================

const Cart = (() => {
  const STORAGE_KEY = 'sgc_cart';

  // ── helpers ──────────────────────────────────────────────
  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }

  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateBadge();
  }

  // ── public API ────────────────────────────────────────────
  function addItem(id, name, price, image = '') {
    const items = load();
    const existing = items.find(i => i.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ id, name, price, image, qty: 1 });
    }
    save(items);
    showToast(`"${name}" added to cart!`);
  }

  function removeItem(id) {
    const items = load().filter(i => i.id !== id);
    save(items);
    if (typeof renderCart === 'function') renderCart();
  }

  function updateQty(id, qty) {
    const items = load();
    const item = items.find(i => i.id === id);
    if (item) {
      item.qty = Math.max(1, qty);
      save(items);
      if (typeof renderCart === 'function') renderCart();
    }
  }

  function getItems() { return load(); }

  function getCount() {
    return load().reduce((sum, i) => sum + i.qty, 0);
  }

  function getTotal() {
    return load().reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function clear() {
    save([]);
    if (typeof renderCart === 'function') renderCart();
  }

  // ── badge update (runs on every page that has the navbar) ─
  function updateBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const count = getCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  // ── toast notification ────────────────────────────────────
  function showToast(message) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cart-toast';
      toast.style.cssText = `
        position:fixed; bottom:30px; right:30px; z-index:9999;
        background:#c8a96e; color:#fff; padding:14px 22px;
        border-radius:10px; font-family:inherit; font-size:0.9rem;
        box-shadow:0 6px 24px rgba(0,0,0,.25); opacity:0;
        transform:translateY(16px);
        transition:opacity .3s, transform .3s;
        pointer-events:none;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(16px)';
    }, 2800);
  }

  // ── init: inject cart icon into existing navbar ───────────
  function injectCartIcon() {
    // Works with the existing nav structure seen in the screenshots
    const nav = document.querySelector('nav') || document.querySelector('header nav') || document.querySelector('.navbar');
    if (!nav) return;

    // Find "Contact Us" link and insert cart icon after it
    const links = nav.querySelectorAll('a');
    let contactLink = null;
    links.forEach(a => {
      if (a.textContent.trim().toLowerCase().includes('contact')) contactLink = a;
    });

    const cartBtn = document.createElement('a');
    cartBtn.href = 'cart.html';
    cartBtn.id = 'nav-cart-btn';
    cartBtn.title = 'Shopping Cart';
    cartBtn.style.cssText = `
      position:relative; display:inline-flex; align-items:center;
      justify-content:center; margin-left:18px; color:inherit;
      text-decoration:none; vertical-align:middle;
    `;
    cartBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
           viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0
                 0 2-1.61L23 6H6"/>
      </svg>
      <span id="cart-badge" style="
        display:none; position:absolute; top:-8px; right:-10px;
        background:#c8a96e; color:#fff; font-size:0.65rem;
        font-weight:700; min-width:18px; height:18px; border-radius:50%;
        align-items:center; justify-content:center; padding:0 3px;
        line-height:1;
      ">0</span>
    `;

    if (contactLink) {
      contactLink.insertAdjacentElement('afterend', cartBtn);
    } else {
      nav.appendChild(cartBtn);
    }

    updateBadge();
  }

  // Run injection when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectCartIcon);
  } else {
    injectCartIcon();
  }

  return { addItem, removeItem, updateQty, getItems, getCount, getTotal, clear, updateBadge };
})();


// ── "Add to Cart" button wiring ───────────────────────────────
// Any button with data-product-id, data-product-name, data-product-price
// (and optionally data-product-image) will work automatically.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-product-id]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const { productId, productName, productPrice, productImage } = btn.dataset;
      Cart.addItem(
        productId,
        productName,
        parseFloat(productPrice),
        productImage || ''
      );
    });
  });

  // Also wire any existing "ADD TO CART" buttons that may not use data attributes
  document.querySelectorAll('.add-to-cart-btn, .add-to-cart').forEach(btn => {
    if (!btn.dataset.wired) {
      btn.dataset.wired = '1';
      btn.addEventListener('click', e => {
        e.preventDefault();
        // Try to find product info from surrounding card
        const card = btn.closest('[class*="product"], [class*="card"], [class*="item"]') || btn.parentElement;
        const name = card?.querySelector('h2,h3,h4,.product-title')?.textContent?.trim() || 'Product';
        const priceEl = card?.querySelector('[class*="price"], .price');
        const price = priceEl ? parseFloat(priceEl.textContent.replace(/[^0-9.]/g, '')) : 0;
        const img = card?.querySelector('img')?.src || '';
        const id = name.toLowerCase().replace(/\s+/g, '-');
        Cart.addItem(id, name, price, img);
      });
    }
  });
});

    // ============================================
    // HELPER FUNCTIONS
    // ============================================
    
    // Show registration modal
    function showRegistrationModal(className = '') {
        const modal = createModal(
            'Register for Classes',
            `
            <form id="registrationForm">
                <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" required>
                </div>
                <div class="form-group">
                    <label>Grade Level *</label>
                    <select name="grade" required>
                        <option value="">Select Grade</option>
                        <option value="8">Grade 8</option>
                        <option value="9">Grade 9</option>
                        <option value="10">Grade 10</option>
                        <option value="11">Grade 11</option>
                        <option value="12">Grade 12</option>
                        <option value="upgrade">Matric Upgrade</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Subject of Interest *</label>
                    <select name="subject" required>
                        <option value="">Select Subject</option>
                        <option value="mathematics">Mathematics</option>
                        <option value="science">Physical Science</option>
                        <option value="both">Both Maths & Science</option>
                    </select>
                </div>
                ${className ? `<input type="hidden" name="class" value="${className}">` : ''}
                <div class="form-group">
                    <label>Message (Optional)</label>
                    <textarea name="message" rows="3"></textarea>
                </div>
                <button type="submit" class="btn-gold">Submit Registration</button>
            </form>
            `
        );

        // Handle form submission
        const form = document.getElementById('registrationForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            console.log('Registration data:', data);
            
            // Here you would send data to your server
            // For now, show success message
            alert('Thank you for registering! We will contact you shortly.');
            closeModal();
            
            // You can also redirect or send an email
            // window.location.href = 'mailto:info@mlungisinkosl.co.za?subject=Registration&body=' + JSON.stringify(data);
        });
    }

    // Show class details
    function showClassDetails(className) {
        const classInfo = {
            'Mathematics Classes': {
                description: 'Comprehensive mathematics tutoring covering algebra, geometry, trigonometry, and calculus for grades 8-12.',
                features: [
                    'Personalized learning approach',
                    'Practice problems and assignments',
                    'Exam preparation',
                    'Video lessons and resources'
                ]
            },
            'Science Classes': {
                description: 'In-depth Physical Science tutoring covering mechanics, waves, electricity, and chemistry for grades 10-12.',
                features: [
                    'Practical demonstrations',
                    'Laboratory techniques',
                    'NSC exam focused',
                    'Past paper practice'
                ]
            },
            'Matric Upgrade Classes': {
                description: 'Specialized program for students looking to improve their matric results.',
                features: [
                    'Flexible scheduling',
                    'One-on-one tutoring available',
                    'Comprehensive revision',
                    'Mock exams'
                ]
            }
        };

        const info = classInfo[className] || {
            description: 'Learn more about our programs.',
            features: []
        };

        const featuresHTML = info.features.map(f => `<li>✓ ${f}</li>`).join('');

        createModal(
            className,
            `
            <p style="margin-bottom: 20px;">${info.description}</p>
            <h4 style="margin-bottom: 10px;">What You'll Get:</h4>
            <ul style="list-style: none; padding: 0;">
                ${featuresHTML}
            </ul>
            <div style="margin-top: 30px; display: flex; gap: 10px;">
                <button onclick="showRegistrationModal('${className}')" class="btn-gold">Register Now</button>
                <button onclick="closeModal()" class="btn-teal">Close</button>
            </div>
            `
        );
    }

    // Scroll to contact section
    function scrollToContact() {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            // If no footer, show contact modal
            showContactModal();
        }
    }

    // Show contact modal
    function showContactModal() {
        createModal(
            'Contact Us',
            `
            <div style="text-align: left;">
                <p style="margin-bottom: 15px;"><strong>📞 Phone:</strong> (064) 554 7199</p>
                <p style="margin-bottom: 15px;"><strong>✉️ Email:</strong> info@mlungisinkosl.co.za</p>
                <p style="margin-bottom: 20px;"><strong>🕒 Office Hours:</strong> Mon-Fri: 8am-5pm</p>
                <button onclick="closeModal()" class="btn-teal">Close</button>
            </div>
            `
        );
    }

    // Create modal
    function createModal(title, content) {
        // Remove existing modal if any
        const existingModal = document.getElementById('customModal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'customModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal when clicking X or outside
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        return modal;
    }

    // Close modal - make it global
    window.closeModal = function() {
        const modal = document.getElementById('customModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    };

    // Make showRegistrationModal global
    window.showRegistrationModal = showRegistrationModal;

    // ============================================
    // FORM VALIDATION
    // ============================================
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[\d\s\-\+\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTop';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4a7c7e 0%, #5a8d8f 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(74, 124, 126, 0.4);
    `;
    
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // CART FUNCTIONALITY (if needed)
    // ============================================
    
    let cartItems = [];
    
    const cartInfo = document.querySelector('.cart-info');
    if (cartInfo) {
        cartInfo.addEventListener('click', function() {
            if (cartItems.length === 0) {
                alert('Your cart is empty');
            } else {
                // Show cart modal
                showCartModal();
            }
        });
    }

    function showCartModal() {
        const cartHTML = cartItems.map(item => `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>${item.price}</span>
            </div>
        `).join('');

        createModal(
            'Shopping Cart',
            `
            <div class="cart-list">
                ${cartHTML || '<p>Your cart is empty</p>'}
            </div>
            <button onclick="closeModal()" class="btn-teal">Close</button>
            `
        );
    }

    // ============================================
    // NEWSLETTER SUBSCRIPTION (if added)
    // ============================================
    
    function subscribeNewsletter(email) {
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        console.log('Subscribing email:', email);
        alert('Thank you for subscribing to our newsletter!');
        
        // Send to your backend
        // fetch('/api/subscribe', {
        //     method: 'POST',
        //     body: JSON.stringify({ email }),
        //     headers: { 'Content-Type': 'application/json' }
        // });
    }

    // ============================================
    // ANIMATIONS ON SCROLL
    // ============================================
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.class-card, .testimonial-card, .feature-list li');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        });

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => scrollObserver.observe(element));
    };

    animateOnScroll();

    // ============================================
    // CONSOLE WELCOME MESSAGE
    // ============================================
    
    console.log('%c Welcome to Mlungisi Nkosi Maths & Science Centre! ', 'background: #4a7c7e; color: white; font-size: 16px; padding: 10px;');
    console.log('%c Empowering students through quality education ', 'color: #d4b896; font-size: 14px;');

});

// ============================================
// ADDITIONAL CSS FOR MODALS (Add to HTML)
// ============================================

const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal {
        display: block;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        transition: background-color 0.3s;
    }

    .modal.show {
        background-color: rgba(0, 0, 0, 0.7);
    }

    .modal-content {
        background-color: #fefefe;
        margin: 5% auto;
        padding: 0;
        border-radius: 15px;
        width: 90%;
        max-width: 600px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        transform: translateY(-50px);
        opacity: 0;
        transition: all 0.3s;
    }

    .modal.show .modal-content {
        transform: translateY(0);
        opacity: 1;
    }

    .modal-header {
        padding: 25px 30px;
        background: linear-gradient(135deg, #4a7c7e 0%, #5a8d8f 100%);
        color: white;
        border-radius: 15px 15px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-header h2 {
        margin: 0;
        font-size: 24px;
        font-weight: 400;
    }

    .modal-close {
        font-size: 32px;
        font-weight: 300;
        cursor: pointer;
        transition: transform 0.3s;
    }

    .modal-close:hover {
        transform: rotate(90deg);
    }

    .modal-body {
        padding: 30px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #333;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 12px 15px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 15px;
        font-family: inherit;
        transition: border-color 0.3s;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #4a7c7e;
    }

    .fade-in {
        animation: fadeIn 0.6s ease-in;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    header.sticky {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    }

    .hamburger {
        background: none;
        border: none;
        color: white;
        font-size: 28px;
        cursor: pointer;
        padding: 10px;
    }

    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            left: -100%;
            top: 60px;
            flex-direction: column;
            background-color: #4a7c7e;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.3);
            padding: 20px 0;
        }

        .nav-links.mobile-active {
            left: 0;
        }

        .modal-content {
            width: 95%;
            margin: 10% auto;
        }
    }

    #scrollToTop:hover {
        transform: scale(1.1);
    }
`;

document.head.appendChild(modalStyles);