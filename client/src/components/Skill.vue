<script setup>
import { ref, onMounted } from 'vue';

const showSkills = ref(false);

// Data Skills
const skills = ref([]);
onMounted(async () => {
    await fetch('http://localhost:8080/api/data/skills').then(e => e.json()).then(data => skills.value = data)
    showSkills.value = true;
});
</script>

<template>
    <section id="skills" class="skills-wrapper py-5">
        <div class="container">

            <div class="row mb-5 text-center" v-if="showSkills">
                <div class="col-12">
                    <h2 class="section-title fw-bold text-white">Skills</h2>
                    <div class="divider mx-auto"></div>
                </div>
            </div>

            <div class="row justify-content-center g-4">
                <TransitionGroup name="staggered-fade" appear>
                    <div v-for="(skill, index) in skills" :key="skill.name" v-show="showSkills"
                        class="col-6 col-md-4 col-lg-3" :style="{ transitionDelay: `${index * 100}ms` }">
                        <div class="skill-card d-flex flex-column align-items-center justify-content-center p-4 h-100">
                            <div class="icon-box mb-3">
                                <img :src="skill.logo" :alt="skill.name" class="skill-logo">
                            </div>
                            <h5 class="skill-name text-white m-0">{{ skill.name }}</h5>
                        </div>
                    </div>
                </TransitionGroup>
            </div>

        </div>
    </section>
</template>

<style scoped>
/* 1. Background Gradient */
.skills-wrapper {
    width: 100%;
    position: relative;
    background: linear-gradient(180deg, #3795BD 0%, #2F58CD 40%, #4E31AA 80%, #3A1078 100%);
    overflow: hidden;
}

/* 2. Judul Futuristik */
.section-title {
    font-size: 2.5rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-shadow: 0 0 10px rgba(55, 149, 189, 0.5);
}

.divider {
    height: 3px;
    width: 80px;
    background: #fff;
    box-shadow: 0 0 10px #fff;
    border-radius: 50px;
}

/* 3. Kartu Skill Glassmorphism */
.skill-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    /* Penting: Untuk menjaga konten tetap di tengah */
    min-height: 160px;
}

.skill-card:hover {
    transform: translateY(-10px) scale(1.02);
    background: rgba(58, 16, 120, 0.4);
    border-color: #3795BD;
    box-shadow: 0 0 25px rgba(55, 149, 189, 0.4), inset 0 0 10px rgba(55, 149, 189, 0.2);
}

/* --- 4. PERBAIKAN ICON/IMAGE STYLING --- */

.icon-box {
    /* Wadah tetap (fixed container) untuk menjaga alignment */
    height: 70px;
    width: 70px;
    display: flex;
    align-items: center;
    /* Vertikal Center */
    justify-content: center;
    /* Horizontal Center */
    position: relative;
    transition: transform 0.3s ease;
}

.skill-logo {
    /* Ukuran gambar */
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;

    /* Agar gambar tidak gepeng */
    object-fit: contain;

    /* Filter awal (sedikit grayscale atau normal + shadow halus) */
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Efek saat Card di Hover */
.skill-card:hover .icon-box {
    transform: scale(1.1);
    /* Wadah sedikit membesar */
}

.skill-card:hover .skill-logo {
    /* Efek Glow Cyan sesuai tema */
    filter: drop-shadow(0 0 8px #3795BD) brightness(1.1);
    transform: scale(1.1);
}

.skill-name {
    font-weight: 500;
    letter-spacing: 1px;
    font-size: 1.1rem;
    position: relative;
    z-index: 2;
}

/* 5. Animasi Staggered */
.staggered-fade-enter-from {
    opacity: 0;
    transform: translateY(50px) scale(0.8);
}

.staggered-fade-enter-to {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.staggered-fade-enter-active {
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Responsiveness untuk Layar Kecil (Mobile) */
@media (max-width: 576px) {
    .skill-card {
        min-height: 140px;
        padding: 1.5rem !important;
    }

    .icon-box {
        height: 50px;
        width: 50px;
    }

    .skill-name {
        font-size: 0.9rem;
    }
}
</style>