<script setup>
import { ref } from 'vue';

// State untuk UI (Loading & Success)
const isSubmitting = ref(false);
const isSent = ref(false);

// State Form Data
const form = ref({
    sender: '',
    email: '',
    whatsapp: '',
    subject: '',
    messages: ''
});
// Handler Submit
const handleSubmit = async () => {
    try {
        isSubmitting.value = true;

        // Proses kirim data ke API
        await fetch('https://rafi-portofolio.onrender.com/api/message/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form.value)
        });

        isSent.value = true
    } catch (err) {
        isSubmitting.value = false
        isSent.value = false
        console.log(`error: ${err.message}`)
    } finally {
        isSubmitting.value = false
    }
};
</script>

<template>
    <section id="contact" class="contact-section py-5">
        <div class="container">

            <div class="row align-items-center g-5">

                <div class="col-lg-5 text-center text-lg-start text-white">
                    <h2 class="display-5 fw-bold mb-3 title-gradient">Let's Work Together</h2>
                    <p class="lead text-white-50 mb-4">
                        Have an interesting idea? Or want to collaborate? Fill out the form below and let's make
                        something great.
                    </p>

                    <div
                        class="d-flex align-items-center justify-content-center justify-content-lg-start mb-3 contact-item">
                        <div class="icon-circle me-3"><img src="../../public/logos/email.png" class="icon-img"></div>
                        <span>rafifebrians150206@gmail.com</span>
                    </div>
                    <div
                        class="d-flex align-items-center justify-content-center justify-content-lg-start mb-4 contact-item">
                        <div class="icon-circle me-3"><img src="../../public/logos/location.png" class="icon-img"></div>
                        <span>Jakarta, Indonesia</span>
                    </div>

                    <div class="social-links mt-4">
                        <a href="https://instagram.com/rafi.febrian.suprapto" class="social-icon"><img
                                src="../../public/logos/ig.png" class="icon-img"></a>
                        <a href="https://wa.me/62895383151668" class="social-icon"><img src="../../public/logos/wa.png"
                                class="icon-img"></a>
                        <a href="https://linkedin.com/in/username" class="social-icon"><img
                                src="../../public/logos/linkedin.png" class="icon-img"></a>
                    </div>
                </div>

                <div class="col-lg-7">
                    <div class="glass-form p-4 rounded-4">

                        <Transition name="fade-slide" mode="out-in">

                            <form v-if="!isSent" @submit.prevent="handleSubmit" key="form">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label text-white-50 small">Full Name</label>
                                        <input type="text" class="form-control custom-input" v-model="form.sender"
                                            required placeholder="John Doe">
                                    </div>

                                    <div class="col-md-6">
                                        <label class="form-label text-white-50 small">Email Address</label>
                                        <input type="email" class="form-control custom-input" v-model="form.email"
                                            required placeholder="name@example.com">
                                    </div>

                                    <div class="col-md-6">
                                        <label class="form-label text-white-50 small">WhatsApp</label>
                                        <input type="tel" class="form-control custom-input" v-model="form.whatsapp"
                                            placeholder="+62 8xx xxxx">
                                    </div>

                                    <div class="col-md-6">
                                        <label class="form-label text-white-50 small">Subject</label>
                                        <select class="form-select custom-input" v-model="form.subject">
                                            <option value="" disabled selected>Select a subject</option>
                                            <option value="Web Design">Web Design</option>
                                            <option value="Fullstack Dev">Fullstack Development</option>
                                            <option value="Consultation">IT Consulting</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div class="col-12">
                                        <label class="form-label text-white-50 small">Your Message</label>
                                        <textarea class="form-control custom-input" rows="3" v-model="form.messages"
                                            required placeholder="Tell your message here....."></textarea>
                                    </div>

                                    <div class="col-12 mt-4">
                                        <button type="submit" class="btn btn-submit w-100 py-3 fw-bold"
                                            :disabled="isSubmitting">
                                            <span v-if="isSubmitting">
                                                <i class="fas fa-spinner fa-spin me-2"></i> Sending...
                                            </span>
                                            <span v-else>
                                                Send <i class="fas fa-paper-plane ms-2"></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <div v-else class="text-center py-5" key="success">
                                <div class="success-icon mb-4">
                                    <i class="bi bi-check-lg"></i>
                                </div>
                                <h3 class="text-white fw-bold">Message Sent !</h3>
                                <p class="text-white-50">Thank you for contacting me. I will reply to your message as
                                    soon as possible.</p>
                                <button class="btn btn-outline-light btn-sm mt-3" @click="isSent = false">Send another
                                    message</button>
                            </div>

                        </Transition>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<style scoped>
/* 1. Background Section */
.contact-section {
    /* Gradasi lanjutan dari section sebelumnya, diakhiri warna gelap solid */
    background: linear-gradient(180deg, #4E31AA 0%, #3A1078 60%, #1a0538 100%);
    position: relative;
    overflow: hidden;
}

/* Judul Gradient */
.title-gradient {
    background: linear-gradient(90deg, #fff, #3795BD);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* 2. Glassmorphism Form Container */
.glass-form {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}

/* 3. Custom Input Styles */
.custom-input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(55, 149, 189, 0.2);
    /* Border biru tipis */
    color: #fff;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.custom-input:focus {
    background: rgba(255, 255, 255, 0.1);
    border-color: #3795BD;
    /* Warna Cyan saat fokus */
    box-shadow: 0 0 15px rgba(55, 149, 189, 0.3);
    outline: none;
    color: #fff;
}

.custom-input::placeholder {
    color: rgba(255, 255, 255, 0.3);
}

/* Styling Dropdown Option (karena option bawaan browser susah di-style transparan) */
.custom-input option {
    background-color: #3A1078;
    /* Background solid agar text terbaca */
    color: white;
}

/* 4. Tombol Submit Futuristik */
.btn-submit {
    background: linear-gradient(90deg, #2F58CD, #4E31AA);
    border: none;
    color: white;
    border-radius: 50px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    z-index: 1;
}

.btn-submit::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: linear-gradient(90deg, #3795BD, #2F58CD);
    transition: width 0.3s ease;
    z-index: -1;
    border-radius: 50px;
}

.btn-submit:hover::before {
    width: 100%;
}

.btn-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(47, 88, 205, 0.5);
    color: white;
}

/* 5. Social & Contact Icons */
.icon-circle {
    width: 40px;
    height: 40px;
    background: rgba(55, 149, 189, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3795BD;
    font-size: 1.1rem;
}

.icon-img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.contact-item:hover .icon-circle {
    background: #3795BD;
    color: white;
    transition: 0.3s;
}

.social-links {
    display: flex;
    gap: 15px;
}

.social-btn {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    transition: all 0.3s;
}

.social-btn:hover {
    background: #2F58CD;
    transform: translateY(-3px);
    box-shadow: 0 0 15px rgba(47, 88, 205, 0.5);
}

/* 6. Success State Styles */
.success-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #3795BD;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    box-shadow: 0 0 30px rgba(55, 149, 189, 0.6);
    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

/* 7. Vue Transition Animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.5s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
</style>