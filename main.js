document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Sticky Header Wrapper
    const navbar = document.getElementById('navbar');
    const topBar = document.querySelector('.top-bar');
    
    if (navbar && topBar) {
        const headerWrapper = document.createElement('div');
        headerWrapper.className = 'sticky-header-wrapper';
        topBar.parentNode.insertBefore(headerWrapper, topBar);
        headerWrapper.appendChild(topBar);
        headerWrapper.appendChild(navbar);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Automatic Copyright Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Cookie Consent Banner
    if (!localStorage.getItem('cookieConsent')) {
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-consent-banner show';
        cookieBanner.innerHTML = `
            <div class="cookie-banner-title">We respect your privacy</div>
            <div class="cookie-banner-text">
                Cookies help us improve your experience, deliver personalized content, and analyze traffic. You can choose which cookies to allow by clicking <b>Customize</b>. Click <b>Accept All</b> to consent or <b>Reject All</b> to decline non-essential cookies.
            </div>
            <div class="cookie-banner-buttons">
                <button class="cookie-btn cookie-btn-customize">Customize</button>
                <button class="cookie-btn cookie-btn-reject">Reject All</button>
                <button class="cookie-btn cookie-btn-accept">Accept All</button>
            </div>
        `;
        document.body.appendChild(cookieBanner);

        const acceptBtn = cookieBanner.querySelector('.cookie-btn-accept');
        const rejectBtn = cookieBanner.querySelector('.cookie-btn-reject');
        const customizeBtn = cookieBanner.querySelector('.cookie-btn-customize');

        const closeBanner = () => {
            cookieBanner.classList.remove('show');
            setTimeout(() => cookieBanner.remove(), 300);
        };

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            closeBanner();
        });

        rejectBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'rejected');
            closeBanner();
        });

        customizeBtn.addEventListener('click', () => {
            closeBanner();
        });
    }

});
