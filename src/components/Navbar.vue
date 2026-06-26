<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// State untuk Mobile Menu
const isMenuOpen = ref(false);

// State untuk mendeteksi scroll (agar navbar berubah warna)
const isScrolled = ref(false);

// List Menu Navigasi (Pastikan ID ini sesuai dengan section yang dibuat sebelumnya)
const navLinks = [
    { name: 'Profile', target: 'profile' },
    { name: 'Skills', target: 'skills' },
    { name: 'Projects', target: 'projects' },
    { name: 'Certificates', target: 'certificates' },
    { name: 'Contact', target: 'contact' },
];

// Toggle Menu Mobile
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// Fungsi Smooth Scroll
const scrollToSection = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
        // Scroll ke elemen
        element.scrollIntoView({ behavior: 'smooth' });
        // Tutup menu jika di mobile
        isMenuOpen.value = false;
    }
};

// Event Listener untuk Scroll
const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <nav class="navbar fixed-top transition-all" :class="{ 'navbar-scrolled': isScrolled }">
        <div class="container">

            <a class="navbar-brand fw-bold" href="#" @click.prevent="window.scrollTo({ top: 0, behavior: 'smooth' })">
                <span class="brand-text">Rafi's <span class="highlight">PORTFOLIO</span></span>
            </a>

            <div class="d-none d-lg-flex gap-4 align-items-center">
                <a v-for="link in navLinks" :key="link.name" href="#" class="nav-link-custom"
                    @click.prevent="scrollToSection(link.target)">
                    {{ link.name }}
                </a>
            </div>

            <button class="hamburger-btn d-lg-none" @click="toggleMenu" :class="{ 'active': isMenuOpen }">
                <span></span>
                <span></span>
                <span></span>
            </button>

        </div>

        <Transition name="slide-fade">
            <div v-if="isMenuOpen" class="mobile-menu d-lg-none">
                <ul class="list-unstyled text-center">
                    <li v-for="(link, index) in navLinks" :key="link.name" class="mb-4"
                        :style="{ '--delay': index * 0.1 + 's' }">
                        <a href="#" class="mobile-link" @click.prevent="scrollToSection(link.target)">
                            {{ link.name }}
                        </a>
                    </li>
                </ul>
            </div>
        </Transition>
    </nav>
</template>

<style scoped>
/* 1. Navbar Container Styling */
.navbar {
    padding: 20px 0;
    transition: all 0.4s ease;
    z-index: 1000;
    background: transparent;
    /* Awal transparan */
}

/* State saat di-scroll: Menjadi Glassmorphism Gelap */
.navbar-scrolled {
    padding: 15px 0;
    background: rgba(58, 16, 120, 0.85);
    /* #3A1078 transparan */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* 2. Logo Styling */
.brand-text {
    font-size: 1.5rem;
    color: #fff;
    letter-spacing: 1px;
}

.highlight {
    color: #3795BD;
    /* Cyan */
    text-shadow: 0 0 10px rgba(55, 149, 189, 0.6);
}

/* 3. Desktop Link Styling */
.nav-link-custom {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    transition: all 0.3s ease;
    padding: 5px 0;
}

/* Efek Garis Bawah saat Hover */
.nav-link-custom::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #3795BD;
    transition: width 0.3s ease;
    box-shadow: 0 0 8px #3795BD;
}

.nav-link-custom:hover {
    color: #fff;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.nav-link-custom:hover::after {
    width: 100%;
}

/* 4. Hamburger Button (Custom CSS Burger) */
.hamburger-btn {
    background: none;
    border: none;
    cursor: pointer;
    width: 30px;
    height: 20px;
    position: relative;
    z-index: 1002;
    /* Di atas menu mobile */
}

.hamburger-btn span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: #fff;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
}

.hamburger-btn span:nth-child(1) {
    top: 0px;
}

.hamburger-btn span:nth-child(2) {
    top: 9px;
}

.hamburger-btn span:nth-child(3) {
    top: 18px;
}

/* Hamburger Active Animation (Menjadi X) */
.hamburger-btn.active span:nth-child(1) {
    top: 9px;
    transform: rotate(135deg);
    background: #3795BD;
}

.hamburger-btn.active span:nth-child(2) {
    opacity: 0;
    left: -60px;
}

.hamburger-btn.active span:nth-child(3) {
    top: 9px;
    transform: rotate(-135deg);
    background: #3795BD;
}

/* 5. Mobile Menu Overlay */
.mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(180deg, #3A1078 0%, #2F58CD 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
}

.mobile-link {
    font-size: 1.5rem;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    text-transform: uppercase;
    display: inline-block;
    transition: all 0.3s;
}

.mobile-link:hover {
    color: #3795BD;
    transform: scale(1.1);
    text-shadow: 0 0 20px rgba(55, 149, 189, 0.8);
}

/* 6. Vue Transitions */
/* Slide Fade untuk Mobile Menu */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.4s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>