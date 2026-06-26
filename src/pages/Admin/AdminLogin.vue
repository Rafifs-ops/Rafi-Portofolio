<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../supabase'

const email = ref('')
const password = ref('')
const router = useRouter()
const errorMsg = ref('')

async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    })

    if (error) {
        errorMsg.value = "Login gagal: " + error.message
    } else {
        router.push('/admin/dashboard') // Arahkan ke dashboard admin jika sukses
    }
}
</script>

<template>
    <div class="vh-100 d-flex align-items-center justify-content-center bg-light">
        <form @submit.prevent="handleLogin" class="bg-white p-5 rounded shadow-sm" style="width: 24rem;">
            <h2 class="fs-4 fw-bold mb-4 text-center">Admin Login</h2>
            <div v-if="errorMsg" class="mb-3 text-danger small">{{ errorMsg }}</div>

            <input v-model="email" type="email" placeholder="Email" class="form-control mb-3" required />
            <input v-model="password" type="password" placeholder="Password" class="form-control mb-4" required />

            <button type="submit" class="btn btn-primary w-100">Masuk</button>
        </form>
    </div>
</template>