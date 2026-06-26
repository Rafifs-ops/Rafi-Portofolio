<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../supabase'
import '@vueup/vue-quill/dist/vue-quill.snow.css'; // Import style quill editor agar format rich text muncul

const route = useRoute();
const router = useRouter(); // Tambahkan router untuk tombol back
const projectId = route.params.id;

// State management
const project = ref({});
const isLoading = ref(true);
const error = ref(null);

// Fungsi untuk kembali ke halaman sebelumnya
const goBack = () => {
    router.back();
};

// Mengambil data
onMounted(async () => {
    try {
        isLoading.value = true;
        const { data, error: supabaseError } = await supabase
            .from('projects')
            .select('*')
            .eq('id', projectId)
            .single();

        if (supabaseError) throw supabaseError;
        project.value = data;
    } catch (err) {
        console.error("Gagal mengambil detail proyek:", err.message);
        error.value = "Terjadi kesalahan saat memuat data.";
    } finally {
        // Simulasi loading sedikit lebih lama untuk melihat efek skeleton (Opsional, bisa dihapus)
        setTimeout(() => { isLoading.value = false; }, 500);
    }
})
</script>

<template>
    <div class="project-page-wrapper">
        <div class="glow-bg"></div>
        <div class="glow-bg glow-bg-2"></div>
        <div class="container position-relative d-flex justify-content-center align-items-center"
            style="min-height: 80vh;">

            <button @click="goBack" class="btn-back d-none d-lg-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
                <span>Kembali</span>
            </button>

            <div v-if="isLoading" class="glass-card skeleton-card w-100 text-center">
                <div class="skeleton-banner pulse"></div>
                <div class="p-5">
                    <div class="skeleton-title pulse mx-auto mb-4"></div>
                    <div class="skeleton-text pulse mx-auto mb-2"></div>
                    <div class="skeleton-text pulse mx-auto mb-2"></div>
                    <div class="skeleton-text pulse mx-auto" style="width: 60%;"></div>
                </div>
            </div>

            <div v-else-if="error" class="text-center text-danger glass-card p-5 w-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor"
                    class="bi bi-exclamation-triangle mb-3" viewBox="0 0 16 16">
                    <path
                        d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                    <path
                        d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                </svg>
                <h3 class="fw-bold">Oops! Error</h3>
                <p class="text-white-50">{{ error }}</p>
                <button @click="goBack" class="btn btn-glow mt-3">Kembali</button>
            </div>

            <div v-else-if="!project" class="text-center text-white glass-card p-5 w-100">
                <h3 class="fw-bold">Project Tidak Ditemukan</h3>
                <p class="text-white-50">Project dengan ID <span class="text-info">{{ projectId }}</span> tidak
                    tersedia.</p>
                <router-link to="/" class="btn btn-glow mt-3">Kembali ke Beranda</router-link>
            </div>

            <Transition name="slide-up" appear v-else>
                <div class="glass-card">
                    <button @click="goBack" class="btn-back-mobile d-lg-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                    </button>

                    <div class="image-banner position-relative">
                        <div class="image-overlay"></div>
                        <img :src="project?.thumb_img || 'https://via.placeholder.com/800x400?text=No+Image'"
                            :alt="project?.title" class="project-img" />

                        <div class="tech-stack-floating d-none d-md-flex">
                            <span v-for="(tech, index) in project?.tech_stack" :key="index" class="tech-badge"
                                :style="{ animationDelay: `${index * 0.1}s` }">
                                {{ tech }}
                            </span>
                        </div>
                    </div>

                    <div class="content-section p-4 p-md-5">
                        <div class="d-flex justify-content-between align-items-start flex-wrap mb-4">
                            <div>
                                <div class="d-flex align-items-center gap-2 mb-2">
                                    <div class="accent-line"></div>
                                    <h5 class="sub-title mb-0">FEATURED PROJECT</h5>
                                </div>
                                <h1 class="project-title">{{ project?.title }}</h1>
                            </div>
                            <a v-if="project?.link_web" :href="project.link_web" target="_blank"
                                class="btn btn-glow d-none d-lg-inline-flex mt-2">
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

                        <div v-if="project.link_yt" class="video-wrapper mt-5">
                            <iframe :src="project.link_yt" title="YouTube video player" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                            </iframe>
                        </div>

                        <div class="description-box mt-5 ql-snow">
                            <div v-html="project?.description" class="ql-editor px-0"></div>
                        </div>

                        <div class="mt-5 d-lg-none text-center">
                            <a v-if="project?.link_web" :href="project.link_web" target="_blank"
                                class="btn btn-glow w-100 py-3">
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
/* Base Styling & Backgrounds */
.project-page-wrapper {
    background: #0f172a;
    /* Warna dasar gelap yang lebih modern */
    min-height: 100vh;
    position: relative;
    font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
    color: white;
    padding-top: 100px;
    padding-bottom: 80px;
    overflow-x: hidden;
}

.glow-bg {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    z-index: 0;
    pointer-events: none;
    opacity: 0.4;
    animation: float 10s infinite ease-in-out alternate;
}

.glow-bg {
    top: 10%;
    left: 20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, #4E31AA 0%, transparent 70%);
}

.glow-bg-2 {
    bottom: 0%;
    right: 10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, #3795BD 0%, transparent 70%);
    animation-delay: -5s;
}

@keyframes float {
    0% {
        transform: translate(0, 0) scale(1);
    }

    100% {
        transform: translate(30px, 50px) scale(1.1);
    }
}

/* Glassmorphism Card */
.glass-card {
    background: rgba(30, 41, 59, 0.4);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    border-left: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 28px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    z-index: 1;
    max-width: 960px;
    width: 100%;
    position: relative;
}

/* Nav Buttons */
.btn-back {
    position: absolute;
    top: -20px;
    left: 0;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #cbd5e1;
    padding: 10px 20px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    z-index: 10;
}

.btn-back:hover {
    background: rgba(255, 255, 255, 0.15);
    color: white;
    transform: translateX(-5px);
}

.btn-back-mobile {
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    backdrop-filter: blur(10px);
}

/* Image Banner */
.image-banner {
    width: 100%;
    height: 450px;
    overflow: hidden;
    position: relative;
}

.project-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.image-banner:hover .project-img {
    transform: scale(1.05);
}

.image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0) 40%, rgba(15, 23, 42, 0.95) 100%);
    z-index: 1;
}

/* Typography & Content */
.accent-line {
    width: 30px;
    height: 3px;
    background: #3795BD;
    border-radius: 2px;
}

.sub-title {
    color: #7dd3fc;
    letter-spacing: 4px;
    font-size: 0.85rem;
    font-weight: 700;
}

.project-title {
    font-weight: 800;
    font-size: 3rem;
    background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 5px;
    line-height: 1.2;
}

.description-box {
    color: #ffffff;
}

.description-box p,
.description-box .ql-editor {
    color: #ffffff;
    background-color: transparent !important;
    line-height: 1.9;
    font-size: 1.1rem;
    font-weight: 400;
    overflow-y: visible;
}

.description-box .ql-editor * {
    background-color: transparent !important;
    color: inherit !important;
}

.description-box .ql-editor p {
    margin-bottom: 1rem;
}

.description-box .ql-editor h1,
.description-box .ql-editor h2,
.description-box .ql-editor h3,
.description-box .ql-editor h4 {
    color: #fff;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.description-box .ql-editor ul,
.description-box .ql-editor ol {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
}

.description-box .ql-editor a {
    color: #7dd3fc;
    text-decoration: underline;
}

/* Tech Badges */
.tech-stack-floating {
    position: absolute;
    bottom: 30px;
    left: 40px;
    z-index: 2;
    gap: 12px;
}

.tech-badge {
    background: rgba(15, 23, 42, 0.6);
    color: #e2e8f0;
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    border: 1px solid rgba(125, 211, 252, 0.3);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: fadeUp 0.5s both;
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.tech-badge:hover {
    background: rgba(55, 149, 189, 0.2);
    border-color: #3795BD;
    color: #fff;
    transform: translateY(-3px);
}

.tech-badge-mobile {
    background: rgba(55, 149, 189, 0.15);
    color: #7dd3fc;
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 0.8rem;
    border: 1px solid rgba(55, 149, 189, 0.3);
}

/* Glowing Button */
.btn-glow {
    background: linear-gradient(135deg, #4E31AA 0%, #3795BD 100%);
    color: white;
    padding: 12px 32px;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    border: none;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 8px 20px rgba(55, 149, 189, 0.3);
}

.btn-glow:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 30px rgba(55, 149, 189, 0.5);
    color: #fff;
}

/* Responsive Video Container (16:9 Aspect Ratio) */
.video-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    /* 16:9 */
    height: 0;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/* Skeleton Loading Animation */
.skeleton-card {
    height: 600px;
}

.skeleton-banner {
    height: 400px;
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
}

.skeleton-title {
    height: 40px;
    width: 80%;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 8px;
}

.skeleton-text {
    height: 20px;
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
}

.pulse {
    animation: pulse-animation 1.5s infinite ease-in-out;
}

@keyframes pulse-animation {
    0% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.5;
    }
}

/* Vue Transitions */
.slide-up-enter-active {
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(40px);
}

/* Responsive Breakpoints */
@media (max-width: 768px) {
    .project-page-wrapper {
        padding-top: 40px;
    }

    .image-banner {
        height: 300px;
    }

    .project-title {
        font-size: 2.2rem;
    }

    .description-box p {
        font-size: 1rem;
    }

    .content-section {
        padding: 1.5rem !important;
    }
}
</style>