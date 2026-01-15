<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Mendapatkan tahun saat ini secara otomatis
const currentYear = new Date().getFullYear();

// State untuk visibilitas tombol "Back to Top"
const showScrollBtn = ref(false);

// Fungsi Scroll ke Atas
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Event Listener untuk mendeteksi posisi scroll
const handleScroll = () => {
    // Munculkan tombol jika scroll lebih dari 300px
    showScrollBtn.value = window.scrollY > 300;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <footer class="footer-wrapper text-white pt-5 pb-4">
        <div class="container">

            <div class="row align-items-center justify-content-between g-4">

                <div class="col-md-6 col-lg-4 text-center text-md-start">
                    <h3 class="brand-text mb-2">Rafi's <span class="highlight">PORTFOLIO</span></h3>
                    <p class="small text-white-50">
                       Building future digital solutions with creativity and modern technology.
                    </p>
                </div>

                <div class="col-md-6 col-lg-4 text-center">
                    <div class="d-flex justify-content-center gap-3 quick-links">
                        <a href="#profile" class="footer-link">Home</a>
                        <a href="#projects" class="footer-link">Projects</a>
                        <a href="#contact" class="footer-link">Contact</a>
                    </div>
                </div>

                <div class="col-lg-4 text-center text-lg-end">
                    <div class="social-box">
                        <a href="https://instagram.com/rafi.febrian.suprapto" class="social-icon" target="_blank"><img src="../../public/logos/ig.png" class="icon-img"></a>
                        <a href="https://wa.me/62895383151668" class="social-icon" target="_blank"><img src="../../public/logos/wa.png" class="icon-img"></a>
                        <a href="https://www.linkedin.com/in/rafi-febrian-suprapto-8a9a42312" class="social-icon" target="_blank"><img src="../../public/logos/linkedin.png" class="icon-img"></a>
                    </div>
                </div>

            </div>

            <div class="neon-divider my-4"></div>

            <div class="row">
                <div class="col-12 text-center">
                    <p class="copyright-text mb-0">
                        &copy; {{ currentYear }} Rafi Febrian Suprapto
                    </p>
                </div>
            </div>

        </div>

        <Transition name="fade-up">
            <button v-if="showScrollBtn" @click="scrollToTop" class="back-to-top-btn" aria-label="Back to Top">
                <i class="bi-arrow-up"></i>
            </button>
        </Transition>

    </footer>
</template>

<style scoped>
/* 1. Background Footer */
.footer-wrapper {
    /* Menggunakan warna paling gelap agar kontras dengan section Contact */
    background: linear-gradient(180deg, #1a0538 0%, #0d021f 100%);
    position: relative;
    overflow: hidden;
    border-top: 1px solid rgba(55, 149, 189, 0.2);
}

/* 2. Tipografi Brand */
.brand-text {
    font-weight: 700;
    letter-spacing: 1px;
}

.highlight {
    color: #3795BD;
    text-shadow: 0 0 10px rgba(55, 149, 189, 0.5);
}

/* 3. Quick Links */
.footer-link {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    position: relative;
}

.footer-link:hover {
    color: #3795BD;
    text-shadow: 0 0 8px rgba(55, 149, 189, 0.6);
}

/* 4. Social Icons */
.social-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin: 0 5px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid transparent;
}

.social-icon:hover {
    background: #3A1078;
    border-color: #3795BD;
    transform: translateY(-3px);
    box-shadow: 0 0 15px rgba(55, 149, 189, 0.4);
}

.icon-img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    transition: transform 0.3s ease;
}

/* 5. Neon Divider */
.neon-divider {
    height: 1px;
    width: 100%;
    background: linear-gradient(90deg, transparent, #2F58CD, #3795BD, #2F58CD, transparent);
    opacity: 0.5;
}

/* 6. Copyright Text */
.copyright-text {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.4);
}

.pulse-heart {
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

/* 7. Floating Back to Top Button */
.back-to-top-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #2F58CD, #3795BD);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(47, 88, 205, 0.5);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.back-to-top-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(55, 149, 189, 0.8);
    background: linear-gradient(135deg, #3795BD, #4E31AA);
}

/* Animasi Tombol Muncul (Vue Transition) */
.fade-up-enter-active,
.fade-up-leave-active {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-up-enter-from,
.fade-up-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
}
</style>