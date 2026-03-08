/* ==============================
   Mokshly — Shared JavaScript
   ============================== */

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initScrollAnimations();
    initMobileMenu();
});

/* --- Navigation --- */
function initNav() {
    const nav = document.querySelector('.nav-wrapper');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // Mark active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* --- Mobile Menu --- */
function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
        const isOpen = menu.classList.contains('open');
        toggle.setAttribute('aria-expanded', isOpen);

        // Animate hamburger to X
        const bars = toggle.querySelectorAll('span');
        if (bars.length === 3) {
            bars[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
            bars[1].style.opacity = isOpen ? '0' : '1';
            bars[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
        }
    });
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* --- Shared HTML Components --- */

function getNavHTML() {
    return `
    <nav class="nav-wrapper">
        <div class="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
            <a href="index.html" class="font-serif text-lg tracking-wide logo-gradient font-semibold">MOKSHLY</a>

            <!-- Desktop nav -->
            <div class="hidden md:flex items-center gap-8 font-sans text-sm tracking-wide">
                <a href="manifesto.html" class="nav-link">Manifesto</a>
                <a href="offering.html" class="nav-link">Our Offering</a>
                <a href="about.html" class="nav-link">About</a>
            </div>

            <!-- Mobile hamburger -->
            <button id="menu-toggle" class="md:hidden flex flex-col gap-1.5 p-1" aria-label="Toggle menu" aria-expanded="false">
                <span class="block w-5 h-px bg-warm-900 transition-transform duration-200"></span>
                <span class="block w-5 h-px bg-warm-900 transition-opacity duration-200"></span>
                <span class="block w-5 h-px bg-warm-900 transition-transform duration-200"></span>
            </button>
        </div>

        <!-- Mobile menu -->
        <div id="mobile-menu" class="mobile-menu md:hidden bg-warm-50 border-t border-warm-800/5">
            <div class="px-6 py-4 flex flex-col gap-4 font-sans text-sm tracking-wide">
                <a href="manifesto.html" class="nav-link py-1">Manifesto</a>
                <a href="offering.html" class="nav-link py-1">Our Offering</a>
                <a href="about.html" class="nav-link py-1">About</a>
            </div>
        </div>
    </nav>`;
}

function getFooterHTML() {
    return `
    <footer class="bg-warm-50">
        <div class="gradient-bar"></div>
        <div class="max-w-6xl mx-auto px-6 py-12 md:py-16">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                <div>
                    <a href="index.html" class="font-serif text-lg tracking-wide logo-gradient font-semibold">MOKSHLY</a>
                    <p class="mt-2 font-sans text-xs text-warm-800/40 tracking-wide">Human sustainability infrastructure</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-8 sm:gap-16 font-sans text-sm">
                    <div class="flex flex-col gap-3">
                        <a href="manifesto.html" class="footer-link">Manifesto</a>
                        <a href="offering.html" class="footer-link">Our Offering</a>
                        <a href="about.html" class="footer-link">About Us</a>
                    </div>
                    <div class="flex flex-col gap-3">
                        <a href="mailto:contact@mokshly.com" class="footer-link">Contact Us</a>
                        <a href="#" class="footer-link">Terms of Use</a>
                        <a href="#" class="footer-link">Privacy Policy</a>
                    </div>
                </div>
            </div>
            <div class="mt-12 pt-6 border-t border-warm-800/5">
                <p class="font-sans text-xs text-warm-800/30 tracking-wide">&copy; ${new Date().getFullYear()} Mokshly. All rights reserved.</p>
            </div>
        </div>
    </footer>`;
}

/* Inject nav and footer into pages */
function injectComponents() {
    const navSlot = document.getElementById('nav-slot');
    const footerSlot = document.getElementById('footer-slot');
    if (navSlot) navSlot.innerHTML = getNavHTML();
    if (footerSlot) footerSlot.innerHTML = getFooterHTML();
}

// Auto-inject on load
document.addEventListener('DOMContentLoaded', injectComponents);
