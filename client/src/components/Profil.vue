<script setup>
import { ref, onMounted } from 'vue';

// State untuk mengontrol animasi saat mounted
const showProfile = ref(false);

// Data Social Media
const socialLinks = [
    { name: 'Instagram', icon: '/logos/ig.png', url: 'https://instagram.com/rafi.febrian.suprapto' },
    { name: 'WhatsApp', icon: '/logos/wa.png', url: 'https://wa.me/62895383151668' },
    { name: 'LinkedIn', icon: '/logos/linkedin.png', url: 'https://www.linkedin.com/in/rafi-febrian-suprapto-8a9a42312' }
];

onMounted(() => {
    // Trigger animasi setelah komponen dimuat
    showProfile.value = true;
});
</script>

<template>
    <section id="profile" class="hero-wrapper d-flex align-items-center justify-content-center">

        <Transition name="slide-fade">
            <div v-if="showProfile" class="container">

                <div class="glass-card p-4 p-md-5 rounded-4">
                    <div class="row align-items-center">

                        <div class="col-md-4 text-center mb-4 mb-md-0">
                            <div class="image-container">
                                <img src="../assets/img/fotorafi.jpg" alt="Profile Picture" class="profile-img img-fluid">
                            </div>
                        </div>

                        <div class="col-md-8 text-center text-md-start text-white">
                            <h2 class="greeting mb-2 fw-bold">Hello, my name is....</h2>
                            <h1 class="name fw-bold mb-3">Rafi Febrian Suprapto</h1>
                            <div class="divider mb-3"></div>
                            <p class="description lead mb-4">
                                Undergraduate student of <span class="highlight">Digital Business</span> <br>
                                at State University of Jakarta
                            </p>

                            <div class="d-flex flex-column flex-md-row align-items-center gap-4">
                                <button class="btn btn-custom">Hubungi Saya</button>

                                <div class="social-icons d-flex gap-3">
                                    <a v-for="social in socialLinks" :key="social.name" :href="social.url"
                                        target="_blank" class="social-btn" :aria-label="social.name">
                                        <img :src="social.icon" alt="" class="icon-img">
                                    </a>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </Transition>

    </section>
</template>

<style scoped>
/* 1. Background Gradient Utama & Spacing Navbar */
.hero-wrapper {
    width: 100%;
    min-height: 80vh;
    /* Sedikit dipertinggi agar proporsional */

    /* PENTING: Padding top besar untuk memberi jarak dari Navbar Fixed */
    padding-top: 120px;
    padding-bottom: 50px;

    background: linear-gradient(180deg, #3A1078 0%, #4E31AA 30%, #2F58CD 70%, #3795BD 100%);
    position: relative;
    overflow: hidden;
}

/* 2. Glassmorphism Card Effect */
.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

/* 3. Styling Foto Profil dengan Efek Glow */
.image-container {
    display: inline-block;
    padding: 5px;
    border-radius: 50%;
    background: linear-gradient(45deg, #3795BD, #4E31AA);
    box-shadow: 0 0 20px rgba(55, 149, 189, 0.6);
}

.profile-img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid #3A1078;
}

/* 4. Tipografi Modern */
.greeting {
    font-size: 1.2rem;
    font-weight: 300;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #3795BD;
}

.name {
    font-size: 3rem;
    background: -webkit-linear-gradient(0deg, #fff, #3795BD);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.3));
}

.description {
    font-weight: 300;
    opacity: 0.9;
}

.highlight {
    font-weight: 600;
    color: #3795BD;
}

.divider {
    height: 4px;
    width: 60px;
    background: #2F58CD;
    margin: 0 auto 0 auto;
    border-radius: 2px;
}

@media (min-width: 768px) {
    .divider {
        margin: 0;
    }
}

/* 5. Custom Button Futuristic */
.btn-custom {
    background: linear-gradient(90deg, #2F58CD, #4E31AA);
    color: white;
    border: none;
    padding: 12px 35px;
    border-radius: 50px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(47, 88, 205, 0.4);
    font-weight: 600;
}

.btn-custom:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(47, 88, 205, 0.6);
    color: white;
}

.icon-img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    transition: transform 0.3s ease;
}

/* 6. Social Media Buttons Styling */
.social-btn {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.2rem;
    text-decoration: none;
    transition: all 0.3s ease;
    backdrop-filter: blur(4px);
}

.social-btn:hover {
    background: #3795BD;
    /* Cyan Color */
    border-color: #3795BD;
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 0 20px rgba(55, 149, 189, 0.6);
    /* Glow effect */
}

/* 7. Vue Transition Animation */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(30px);
    opacity: 0;
}
</style>