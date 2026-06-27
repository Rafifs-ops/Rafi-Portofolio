<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../../supabase'

const route = useRoute()
const router = useRouter()
const isEditing = ref(false)

// Data Form
const form = ref({
    name: '',
    logo: ''
})

const file = ref(null)
const previewUrl = ref(null)
const isUploading = ref(false)

const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
        file.value = selectedFile
        previewUrl.value = URL.createObjectURL(selectedFile)
    } else {
        file.value = null
        if (!isEditing.value || !form.value.logo) {
            previewUrl.value = null
        } else {
            previewUrl.value = form.value.logo
        }
    }
}

onMounted(async () => {
    // Jika URL memiliki ID, berarti kita mode Edit
    if (route.params.id) {
        isEditing.value = true
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .eq('id', route.params.id)
            .single()

        if (data) {
            form.value = {
                name: data.name,
                logo: data.logo
            }
            if (data.logo) {
                previewUrl.value = data.logo
            }
        }
    }
})

async function saveSkill() {
    isUploading.value = true

    let logoUrl = form.value.logo

    if (file.value) {
        const fileExt = file.value.name.split('.').pop()
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`
        const filePath = `skills_img/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from("rafis-portfolio-assets")
            .upload(filePath, file.value)

        if (uploadError) {
            console.error('Upload error:', uploadError)
            alert('Gagal mengupload logo: ' + uploadError.message)
            isUploading.value = false
            return
        }

        const { data: urlData } = supabase.storage
            .from("rafis-portfolio-assets")
            .getPublicUrl(filePath)

        logoUrl = urlData.publicUrl
    }

    const skillData = {
        name: form.value.name,
        logo: logoUrl
    }

    if (isEditing.value) {
        await supabase.from('skills').update(skillData).eq('id', route.params.id)
    } else {
        await supabase.from('skills').insert([skillData])
    }

    isUploading.value = false
    router.push('/admin/dashboard') // Kembali ke daftar admin (dashboard)
}
</script>

<template>
    <div class="container py-4" style="max-width: 600px;">
        <h1 class="fs-2 fw-bold mb-4">{{ isEditing ? 'Edit Skill' : 'Tambah Skill Baru' }}</h1>

        <form @submit.prevent="saveSkill" class="bg-white p-4 rounded shadow-sm">
            <div class="mb-3">
                <label class="form-label fw-semibold">Nama Skill</label>
                <input v-model="form.name" type="text" class="form-control" required placeholder="Contoh: Vue.js" />
            </div>

            <div class="mb-4">
                <label class="form-label fw-semibold">Upload Logo</label>
                <input type="file" @change="handleFileUpload" accept="image/*" class="form-control"
                    :required="!isEditing && !form.logo" />
                <div v-if="previewUrl" class="mt-3">
                    <p class="mb-1 text-muted small">Preview Logo:</p>
                    <img :src="previewUrl" alt="Preview" class="img-thumbnail" style="max-height: 150px;" />
                </div>
            </div>

            <div class="d-flex justify-content-end gap-2">
                <router-link to="/admin/dashboard" class="btn btn-secondary px-4 py-2">
                    Batal
                </router-link>
                <button type="submit" class="btn btn-success fw-bold px-4 py-2" :disabled="isUploading">
                    {{ isUploading ? 'Menyimpan...' : 'Simpan Skill' }}
                </button>
            </div>
        </form>
    </div>
</template>
