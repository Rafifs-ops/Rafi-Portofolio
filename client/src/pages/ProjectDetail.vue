<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const projectId = route.params.id;

// State management
const projects = ref([]);
const isLoading = ref(true); // Tambahkan loading state
const error = ref(null); // Tambahkan error state

// Mengambil data
onMounted(async () => {
    try {
        const response = await fetch("https://rafi-portofolio.onrender.com/api/data/projects");
        if (!response.ok) throw new Error("Gagal mengambil data");
        const data = await response.json();
        projects.value = data;
    } catch (err) {
        console.error(err);
        error.value = "Terjadi kesalahan saat memuat data.";
    } finally {
        isLoading.value = false;
    }
})

// Computed property untuk mencari project spesifik
const project = computed(() => {
    if (projects.value.length > 0) {
        return projects.value.find(p => p._id == projectId);
    }
    return null;
})
</script>

<template>
    <div class="project-page-wrapper">
        <div class="glow-bg"></div>

        <div class="container d-flex justify-content-center align-items-center" style="min-height: 80vh;">

            <div v-if="isLoading" class="text-center text-white">
                <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3">Memuat Detail Project...</p>
            </div>

            <div v-else-if="error" class="text-center text-danger glass-card p-5">
                <h3>Error</h3>
                <p>{{ error }}</p>
            </div>

            <div v-else-if="!project" class="text-center text-white glass-card p-5">
                <h3>Project Tidak Ditemukan</h3>
                <p>Project dengan ID {{ projectId }} tidak tersedia.</p>
                <router-link to="/" class="btn btn-glow mt-3">Kembali ke Beranda</router-link>
            </div>

            <Transition name="slide-up" appear v-else>
                <div class="glass-card">

                    <div class="image-banner position-relative">
                        <div class="image-overlay"></div>
                        <img :src="project?.thumb_img" :alt="project?.title" class="project-img" />

                        <div class="tech-stack-floating d-none d-md-flex">
                            <span v-for="(tech, index) in project?.tech_stack" :key="index" class="tech-badge">
                                {{ tech }}
                            </span>
                        </div>
                    </div>

                    <div class="content-section p-4 p-md-5">
                        <div class="d-flex justify-content-between align-items-start flex-wrap mb-3">
                            <div>
                                <h5 class="sub-title mb-2">FEATURED PROJECT</h5>
                                <h1 class="project-title">{{ project?.title }}</h1>
                            </div>
                            <a :href="project?.link_web" target="_blank" class="btn btn-glow d-none d-lg-inline-flex">
                                Visit Website
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-box-arrow-up-right ms-2" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                                    <path fill-rule="evenodd"
                                        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                                </svg>
                            </a>
                        </div>

                        <div class="d-flex flex-wrap gap-2 mb-4 d-md-none">
                            <span v-for="(tech, index) in project?.tech_stack" :key="index" class="tech-badge-mobile">
                                {{ tech }}
                            </span>
                        </div>

                        <hr class="divider my-4">

                        <div class="description-box">
                            <p>{{ project?.description }}</p>
                        </div>

                        <div class="mt-4 d-lg-none text-center">
                            <a :href="project?.link_web" target="_blank" class="btn btn-glow w-100">
                                Visit Website
                            </a>
                        </div>
                    </div>

                </div>
            </Transition>

        </div>
    </div>
</template>

<style scoped>
/* CSS SAMA SEPERTI SEBELUMNYA, TIDAK PERLU DIUBAH */
/* Tambahkan style ini untuk spinner jika belum ada Bootstrap JS/CSS global */
.spinner-border {
    width: 3rem;
    height: 3rem;
}

.project-page-wrapper {
    background: linear-gradient(135deg, #3A1078 0%, #2F58CD 100%);
    min-height: 100vh;
    position: relative;
    font-family: 'Segoe UI', Roboto, sans-serif;
    color: white;
    padding-top: 120px;
    padding-bottom: 80px;
}

.glow-bg {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 60%;
    background: radial-gradient(circle, #4E31AA 0%, transparent 60%);
    opacity: 0.5;
    z-index: 0;
    filter: blur(100px);
    pointer-events: none;
}

.glass-card {
    background: rgba(58, 16, 120, 0.4);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 24px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    z-index: 1;
    max-width: 900px;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.image-banner {
    width: 100%;
    height: 400px;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid rgba(55, 149, 189, 0.3);
}

.project-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.image-banner:hover .project-img {
    transform: scale(1.03);
}

.image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, rgba(58, 16, 120, 0.9), transparent);
    z-index: 1;
}

.sub-title {
    color: #3795BD;
    letter-spacing: 3px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
}

.project-title {
    font-weight: 800;
    font-size: 2.8rem;
    background: linear-gradient(to right, #fff, #3795BD);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 0;
}

.divider {
    border-color: rgba(55, 149, 189, 0.3);
}

.description-box p {
    color: #e2e8f0;
    line-height: 1.8;
    font-size: 1.05rem;
    margin-bottom: 1.2rem;
    font-weight: 300;
    text-align: justify;
}

.tech-stack-floating {
    position: absolute;
    bottom: 25px;
    left: 30px;
    z-index: 2;
    gap: 10px;
}

.tech-badge {
    background: rgba(47, 88, 205, 0.25);
    color: #fff;
    padding: 6px 16px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    border: 1px solid #3795BD;
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
}

.tech-badge:hover {
    background: #3795BD;
    color: #fff;
    transform: translateY(-2px);
}

.tech-badge-mobile {
    background: rgba(78, 49, 170, 0.6);
    color: #fff;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 0.75rem;
    border: 1px solid #4E31AA;
}

.btn-glow {
    background: linear-gradient(90deg, #2F58CD 0%, #3795BD 100%);
    color: white;
    padding: 10px 30px;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    border: none;
    transition: all 0.3s ease;
    box-shadow: 0 0 15px rgba(55, 149, 189, 0.4);
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.btn-glow:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 25px rgba(55, 149, 189, 0.7);
    color: #fff;
}

.slide-up-enter-active {
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(50px) scale(0.95);
}

@media (max-width: 768px) {
    .project-page-wrapper {
        padding-top: 100px;
        padding-left: 15px;
        padding-right: 15px;
    }

    .image-banner {
        height: 250px;
    }

    .project-title {
        font-size: 2rem;
    }

    .content-section {
        padding: 1.5rem !important;
    }
}
</style>