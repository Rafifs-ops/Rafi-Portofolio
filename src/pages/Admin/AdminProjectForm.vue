<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../../supabase'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css' // Style untuk editor

const route = useRoute()
const router = useRouter()
const isEditing = ref(false)

// Data Form
const form = ref({
    title: '',
    caption: '',
    description: '', // Ini akan menyimpan tag HTML dari WYSIWYG
    thumb_img: '',
    link_web: '',
    link_yt: '',
    tech_stack: '' // Kita input sebagai string pisah koma sementara
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
        if (!isEditing.value || !form.value.thumb_img) {
            previewUrl.value = null
        } else {
            previewUrl.value = form.value.thumb_img
        }
    }
}

onMounted(async () => {
    // Jika URL memiliki ID, berarti kita mode Edit
    if (route.params.id) {
        isEditing.value = true
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', route.params.id)
            .single()

        if (data) {
            form.value = {
                ...data,
                // Ubah array ['Vue', 'Node'] jadi string "Vue, Node" agar mudah diedit di form
                tech_stack: data.tech_stack ? data.tech_stack.join(', ') : ''
            }
            if (data.thumb_img) {
                previewUrl.value = data.thumb_img
            }
        }
    }
})

async function saveProject() {
    isUploading.value = true

    // Ubah string "Vue, Node" kembali jadi Array ['Vue', 'Node'] untuk PostgreSQL
    const techStackArray = form.value.tech_stack.split(',').map(item => item.trim())

    let thumbUrl = form.value.thumb_img

    if (file.value) {
        const fileExt = file.value.name.split('.').pop()
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`
        const filePath = `projects_img/${fileName}`
        
        const { error: uploadError } = await supabase.storage
            .from("rafi's-portfolio-assets")
            .upload(filePath, file.value)
            
        if (uploadError) {
            console.error('Upload error:', uploadError)
            alert('Gagal mengupload thumbnail: ' + uploadError.message)
            isUploading.value = false
            return
        }
        
        const { data: urlData } = supabase.storage
            .from("rafi's-portfolio-assets")
            .getPublicUrl(filePath)
            
        thumbUrl = urlData.publicUrl
    }

    const projectData = {
        title: form.value.title,
        caption: form.value.caption,
        description: form.value.description, // HTML string murni
        thumb_img: thumbUrl,
        link_web: form.value.link_web,
        link_yt: form.value.link_yt,
        tech_stack: techStackArray
    }

    if (isEditing.value) {
        await supabase.from('projects').update(projectData).eq('id', route.params.id)
    } else {
        await supabase.from('projects').insert([projectData])
    }

    isUploading.value = false
    router.push('/admin/dashboard') // Kembali ke daftar proyek
}
</script>

<template>
    <div class="container py-4" style="max-width: 800px;">
        <h1 class="fs-2 fw-bold mb-4">{{ isEditing ? 'Edit Proyek' : 'Tambah Proyek Baru' }}</h1>

        <form @submit.prevent="saveProject">
            <div class="mb-3">
                <label class="form-label fw-semibold">Judul Proyek</label>
                <input v-model="form.title" type="text" class="form-control" required />
            </div>

            <div class="mb-3">
                <label class="form-label fw-semibold">Upload Thumbnail</label>
                <input type="file" @change="handleFileUpload" accept="image/*" class="form-control" :required="!isEditing && !form.thumb_img" />
                <div v-if="previewUrl" class="mt-3">
                    <p class="mb-1 text-muted small">Preview Thumbnail:</p>
                    <img :src="previewUrl" alt="Preview" class="img-thumbnail" style="max-height: 200px;" />
                </div>
            </div>

            <div class="mb-3">
                <label class="form-label fw-semibold">Link Video Demo (Youtube)</label>
                <input v-model="form.link_yt" type="url" class="form-control" required />
            </div>

            <div class="mb-3">
                <label class="form-label fw-semibold">Caption Singkat</label>
                <textarea v-model="form.caption" class="form-control" required></textarea>
            </div>

            <div class="mb-3">
                <label class="form-label fw-semibold">Deskripsi Lengkap (Rich Text)</label>
                <div class="bg-white border rounded">
                    <QuillEditor v-model:content="form.description" contentType="html" theme="snow"
                        style="min-height: 300px;" />
                </div>
            </div>

            <div class="mb-3">
                <label class="form-label fw-semibold">Link Website</label>
                <input v-model="form.link_web" type="url" class="form-control" />
            </div>

            <div class="mb-4">
                <label class="form-label fw-semibold">Tech Stack (Pisahkan dengan koma)</label>
                <input v-model="form.tech_stack" type="text" placeholder="Misal: Vue, Bootstrap, Node"
                    class="form-control" />
            </div>

            <div class="d-flex justify-content-end gap-2">
                <router-link to="/admin/dashboard" class="btn btn-secondary px-4 py-2">
                    Batal
                </router-link>
                <button type="submit" class="btn btn-success fw-bold px-4 py-2" :disabled="isUploading">
                    {{ isUploading ? 'Menyimpan...' : 'Simpan Proyek' }}
                </button>
            </div>
        </form>
    </div>
</template>