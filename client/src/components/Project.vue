<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const showProjects = ref(false);
const isLoading = ref(false);

// Data Project
const projects = ref([]);
onMounted(async () => {
    isLoading.value = true; // Set loading true saat mulai
    try {
        const response = await fetch('https://rafi-portofolio.onrender.com/api/data/projects');
        projects.value = await response.json();

        // Trigger animasi muncul setelah data siap
        setTimeout(() => {
            showProjects.value = true;
        }, 100);
    } catch (error) {
        console.error("Gagal mengambil data project:", error);
    } finally {
        isLoading.value = false; // Matikan loading setelah selesai (sukses/gagal)
    }
});

// Router 
const router = useRouter();
function detailProject(id) {
    router.push({ name: 'ProjectDetail', params: { id: id } })
}
</script>

<template>
    <section id="projects" class="projects-section py-5">
        <div class="container">

            <div class="row mb-5 text-center">
                <div class="col-12">
                    <h2 class="section-title text-white fw-bold">Projects</h2>
                    <div class="divider mx-auto"></div>
                </div>
            </div>

            <div v-if="isLoading" class="row justify-content-center my-5">
                <div class="col-auto text-center">
                    <div class="cyber-spinner spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="text-white mt-3 small opacity-75 tracking-wider">LOADING DATA...</p>
                </div>
            </div>

            <div v-else class="row g-4 justify-content-center">
                <TransitionGroup name="card-pop">
                    <div class="col-md-6 col-lg-4" v-for="(project, index) in projects" :key="project.id"
                        v-show="showProjects" :style="{ '--delay': index * 0.2 + 's' }">

                        <div class="project-card h-100 d-flex flex-column">
                            <div class="img-wrapper">
                                <img :src="project.thumb_img" :alt="project.title" class="img-fluid project-img">
                                <div class="cyber-overlay"></div>
                            </div>

                            <div class="card-content p-4 flex-grow-1 d-flex flex-column justify-content-between">
                                <div>
                                    <h4 class="project-title text-white mb-3">{{ project.title }}</h4>
                                    <p class="project-desc text-light opacity-75 small mb-4">{{ project.caption }}
                                    </p>
                                </div>

                                <div>
                                    <div class="stack-container d-flex flex-wrap gap-2 mb-4">
                                        <span v-for="(tech, idx) in project.tech_stack" :key="idx" class="tech-badge">
                                            {{ tech }}
                                        </span>
                                    </div>

                                    <button @click="detailProject(project._id)" class="btn btn-detail w-100">
                                        See Detail
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </TransitionGroup>
            </div>

        </div>
    </section>
</template>

<style scoped>
/* 1. Background Section (Melanjutkan flow gradasi gelap) */
.projects-section {
    background: linear-gradient(to bottom, #3A1078 0%, #2F58CD 100%);
    position: relative;
    overflow: hidden;
}

/* Judul & Divider (Konsisten dengan komponen sebelumnya) */
.section-title {
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 0 15px rgba(55, 149, 189, 0.6);
}

.divider {
    height: 3px;
    width: 60px;
    background: #3795BD;
    box-shadow: 0 0 8px #3795BD;
    border-radius: 2px;
    margin-top: 1rem;
}

/* 2. Project Card - Glassmorphism Lanjutan */
.project-card {
    background: rgba(58, 16, 120, 0.25);
    /* Base ungu gelap transparan */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(55, 149, 189, 0.15);
    /* Border biru muda tipis */
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
}

.project-card:hover {
    transform: translateY(-10px);
    border-color: #3795BD;
    /* Border menyala saat hover */
    box-shadow: 0 15px 30px -10px rgba(47, 88, 205, 0.5);
    /* Glow biru elektrik */
}

/* 3. Image Area & Cyber Overlay Effect */
.img-wrapper {
    position: relative;
    overflow: hidden;
    height: 220px;
    /* Tinggi gambar tetap agar rapi */
}

.project-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

/* Lapisan filter di atas gambar */
.cyber-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Gradasi overlay dari palet warna */
    background: linear-gradient(45deg, rgba(58, 16, 120, 0.6), rgba(55, 149, 189, 0.6));
    mix-blend-mode: overlay;
    /* Memberikan efek menyatu dengan gambar */
    transition: opacity 0.4s ease;
    opacity: 1;
}

/* Saat hover, overlay hilang dan gambar zoom in sedikit */
.project-card:hover .cyber-overlay {
    opacity: 0;
}

.project-card:hover .project-img {
    transform: scale(1.1);
}

/* 4. Typography & Stack Badges */
.project-title {
    font-weight: 600;
    letter-spacing: 0.5px;
}

.tech-badge {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 20px;
    color: #fff;
    /* Gradient untuk badge dari biru medium ke biru terang */
    background: linear-gradient(90deg, #2F58CD, #3795BD);
    box-shadow: 0 2px 5px rgba(47, 88, 205, 0.3);
    white-space: nowrap;
    /* Mencegah teks badge terpotong */
}

/* 5. Vue Transition: Card Pop (Staggered) */
.card-pop-enter-active {
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    /* Efek membal (bouncy) */
    /* Menggunakan variabel CSS --delay yang di-set di template untuk efek berurutan */
    transition-delay: var(--delay);
}

.card-pop-enter-from {
    opacity: 0;
    transform: scale(0.8) translateY(60px);
    /* Mulai dari kecil dan bawah */
}

.card-pop-enter-to {
    opacity: 1;
    transform: scale(1) translateY(0);
}

.btn-detail {
    border: 1px solid #3795BD;
    /* Warna biru muda sesuai tema */
    color: #3795BD;
    background: transparent;
    border-radius: 30px;
    /* Membuat tombol lonjong */
    font-weight: 600;
    letter-spacing: 0.5px;
    padding: 8px 20px;
    transition: all 0.3s ease;
    text-transform: uppercase;
    font-size: 0.85rem;
}

.btn-detail:hover {
    background: #3795BD;
    color: #fff;
    transform: translateY(-2px);
    /* Efek naik sedikit saat hover */
    box-shadow: 0 0 15px rgba(55, 149, 189, 0.6);
    /* Efek glow */
}

.btn-detail:active {
    transform: translateY(0);
}

.cyber-spinner {
    width: 3rem;
    height: 3rem;
    color: #3795BD;
    /* Warna biru sesuai tema */
    border-width: 0.25em;
    filter: drop-shadow(0 0 5px #3795BD);
    /* Efek glow */
}

.tracking-wider {
    letter-spacing: 2px;
}
</style>