<script setup>
import { ref, onMounted } from 'vue';

// Data Sertifikat
const certificates = ref([]);
onMounted(async () => {
    await fetch('https://rafi-portofolio.onrender.com/api/data/certifications').then(e => e.json()).then(data => certificates.value = data)
});

// State untuk Modal
const selectedCertificate = ref(null);
// Method buka modal
const openModal = (cert) => {
    selectedCertificate.value = cert;
    document.body.style.overflow = 'hidden'; // Mencegah scroll body saat modal terbuka
};
// Method tutup modal
const closeModal = () => {
    selectedCertificate.value = null;
    document.body.style.overflow = 'auto'; // Mengembalikan scroll body
};
</script>

<template>
    <section id="certificates" class="cert-section py-5">
        <div class="container">

            <div class="row mb-5 text-center">
                <div class="col-12">
                    <h2 class="section-title text-white fw-bold">Certifications</h2>
                    <div class="divider mx-auto"></div>
                </div>
            </div>

            <div class="row g-4 justify-content-center">
                <div class="col-md-6 col-lg-4" v-for="cert in certificates" :key="cert.id">
                    <div class="cert-card" @click="openModal(cert)">
                        <div class="img-container">
                            <img :src="cert.img" :alt="cert.title" class="cert-thumb img-fluid">
                            <div class="overlay-icon">
                                <i class="bi bi-search"></i>
                            </div>
                        </div>
                        <div class="cert-info p-3 text-center">
                            <h6 class="text-white m-0 text-truncate">{{ cert.title }}</h6>
                        </div>
                    </div>
                </div>
            </div>

            <Teleport to="body">
                <Transition name="modal-fade">
                    <div v-if="selectedCertificate" class="modal-backdrop" @click.self="closeModal">

                        <div class="modal-content-wrapper">
                            <button class="close-btn" @click="closeModal">
                                <i class="bi bi-x-lg"></i>
                            </button>

                            <img :src="selectedCertificate.img" :alt="selectedCertificate.title" class="modal-img">

                            <h3 class="modal-title mt-3">{{ selectedCertificate.title }}</h3>
                        </div>

                    </div>
                </Transition>
            </Teleport>

        </div>
    </section>
</template>

<style scoped>
/* 1. Background Section */
.cert-section {
    /* Gradasi sedikit berbeda dari section sebelumnya untuk variasi visual */
    background: linear-gradient(180deg, #2F58CD 0%, #3A1078 60%, #4E31AA 100%);
    position: relative;
}

/* Judul & Divider */
.section-title {
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(55, 149, 189, 0.5);
}

.divider {
    height: 3px;
    width: 50px;
    background: #3795BD;
    box-shadow: 0 0 10px #3795BD;
    border-radius: 2px;
    margin-top: 1rem;
}

/* 2. Certificate Thumbnail Card */
.cert-card {
    cursor: pointer;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(55, 149, 189, 0.2);
    transition: all 0.3s ease;
}

.cert-card:hover {
    transform: translateY(-5px);
    border-color: #3795BD;
    /* Warna Cyan menyala */
    box-shadow: 0 0 15px rgba(55, 149, 189, 0.3);
}

.img-container {
    position: relative;
    overflow: hidden;
    height: 200px;
}

.cert-thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}

/* Efek Hover Zoom Gambar Thumbnail */
.cert-card:hover .cert-thumb {
    transform: scale(1.1);
    filter: brightness(0.7);
    /* Sedikit gelap agar icon terlihat */
}

/* Icon Search di Tengah saat Hover */
.overlay-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    font-size: 2rem;
    color: #fff;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.cert-card:hover .overlay-icon {
    transform: translate(-50%, -50%) scale(1);
}

.cert-info {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(58, 16, 120, 0.4);
}

/* 3. MODAL STYLING */
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    /* Background gelap transparan */
    backdrop-filter: blur(8px);
    /* Efek blur di belakang modal */
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.modal-content-wrapper {
    position: relative;
    max-width: 900px;
    width: 100%;
    text-align: center;
    /* Agar konten modal memiliki animasi scale */
}

.modal-img {
    max-height: 70vh;
    /* Tidak full layar, max 70% tinggi viewport */
    max-width: 100%;
    border-radius: 8px;
    border: 2px solid #3795BD;
    box-shadow: 0 0 30px rgba(55, 149, 189, 0.4);
    object-fit: contain;
}

.modal-title {
    color: #fff;
    font-weight: 600;
    margin-top: 15px;
    font-size: 1.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Tombol Close */
.close-btn {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
    transition: color 0.3s;
}

.close-btn:hover {
    color: #3795BD;
}

/* Responsive adjustment untuk tombol close di mobile */
@media (max-width: 768px) {
    .close-btn {
        top: -50px;
        right: 50%;
        transform: translateX(50%);
        /* Center tombol close di atas gambar pada mobile */
    }
}

/* 4. Vue Transition Animation (Zoom & Fade) */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
    transform: scale(0.9);
    /* Mulai sedikit lebih kecil (zoom in effect) */
}

.modal-fade-enter-to,
.modal-fade-leave-from {
    opacity: 1;
    transform: scale(1);
}
</style>