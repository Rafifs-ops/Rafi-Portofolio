<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase'
import { useRouter } from 'vue-router'

const projects = ref([])
const skills = ref([])
const certifications = ref([])
const messages = ref([])

const activeTab = ref('projects') // State untuk tab aktif (projects, skills, certifications, messages)
const router = useRouter()

// Modal Messages
const selectedMessage = ref(null)

async function fetchProjects() {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    projects.value = data
}

async function fetchSkills() {
    const { data } = await supabase.from('skills').select('*').order('created_at', { ascending: false })
    skills.value = data
}

async function fetchCertifications() {
    const { data } = await supabase.from('certifications').select('*').order('created_at', { ascending: false })
    certifications.value = data
}

async function fetchMessages() {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
    messages.value = data
}

async function deleteProject(id) {
    if (confirm("Yakin ingin menghapus proyek ini?")) {
        await supabase.from('projects').delete().eq('id', id)
        fetchProjects() // Refresh data
    }
}

async function deleteSkill(id) {
    if (confirm("Yakin ingin menghapus skill ini?")) {
        await supabase.from('skills').delete().eq('id', id)
        fetchSkills() // Refresh data
    }
}

async function deleteCertification(id) {
    if (confirm("Yakin ingin menghapus sertifikasi ini?")) {
        await supabase.from('certifications').delete().eq('id', id)
        fetchCertifications() // Refresh data
    }
}

async function deleteMessage(id) {
    if (confirm("Yakin ingin menghapus pesan ini?")) {
        await supabase.from('messages').delete().eq('id', id)
        fetchMessages() // Refresh data
        closeMessageModal()
    }
}

function openMessageModal(msg) {
    selectedMessage.value = msg
}

function closeMessageModal() {
    selectedMessage.value = null
}

async function logout() {
    await supabase.auth.signOut()
    router.push('/login')
}

onMounted(() => {
    fetchProjects()
    fetchSkills()
    fetchCertifications()
    fetchMessages()
})
</script>

<template>
    <div class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="fs-2 fw-bold">Admin Dashboard Rafi's Portfolio</h1>
            <div>
                <button @click="logout" class="btn btn-secondary">Logout</button>
            </div>
        </div>

        <!-- Navigation Tabs -->
        <ul class="nav nav-tabs mb-4">
            <li class="nav-item">
                <button class="nav-link" :class="{ active: activeTab === 'projects' }"
                    @click="activeTab = 'projects'">Projects</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" :class="{ active: activeTab === 'skills' }"
                    @click="activeTab = 'skills'">Skills</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" :class="{ active: activeTab === 'certifications' }"
                    @click="activeTab = 'certifications'">Certifications</button>
            </li>
            <li class="nav-item">
                <button class="nav-link" :class="{ active: activeTab === 'messages' }"
                    @click="activeTab = 'messages'">Messages</button>
            </li>
        </ul>

        <!-- PROJECTS TAB -->
        <div v-if="activeTab === 'projects'">
            <div class="d-flex justify-content-between mb-3">
                <h3 class="fw-bold m-0">Projects List</h3>
                <router-link to="/admin/projects/form" class="btn btn-primary">
                    + Tambah Proyek
                </router-link>
            </div>
            <div class="table-responsive bg-white shadow-sm rounded">
                <table class="table mb-0">
                    <thead class="table-light">
                        <tr>
                            <th class="p-3 text-start">Judul</th>
                            <th class="p-3 text-start">Tech Stack</th>
                            <th class="p-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="project in projects" :key="project.id">
                            <td class="p-3 align-middle">{{ project.title }}</td>
                            <td class="p-3 align-middle">{{ project.tech_stack?.join(', ') }}</td>
                            <td class="p-3 text-center align-middle">
                                <router-link :to="`/admin/projects/form/${project.id}`"
                                    class="text-primary text-decoration-none me-3">Edit</router-link>
                                <button @click="deleteProject(project.id)"
                                    class="btn btn-link text-danger text-decoration-none p-0">Hapus</button>
                            </td>
                        </tr>
                        <tr v-if="projects.length === 0">
                            <td colspan="3" class="p-3 text-center text-muted">Belum ada data proyek.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- SKILLS TAB -->
        <div v-if="activeTab === 'skills'">
            <div class="d-flex justify-content-between mb-3">
                <h3 class="fw-bold m-0">Skills List</h3>
                <router-link to="/admin/skills/form" class="btn btn-primary">
                    + Tambah Skill
                </router-link>
            </div>
            <div class="table-responsive bg-white shadow-sm rounded">
                <table class="table mb-0">
                    <thead class="table-light">
                        <tr>
                            <th class="p-3 text-start">Logo</th>
                            <th class="p-3 text-start">Nama Skill</th>
                            <th class="p-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="skill in skills" :key="skill.id">
                            <td class="p-3 align-middle">
                                <img :src="skill.logo" alt="Logo" style="height: 40px; object-fit: contain;" />
                            </td>
                            <td class="p-3 align-middle">{{ skill.name }}</td>
                            <td class="p-3 text-center align-middle">
                                <router-link :to="`/admin/skills/form/${skill.id}`"
                                    class="text-primary text-decoration-none me-3">Edit</router-link>
                                <button @click="deleteSkill(skill.id)"
                                    class="btn btn-link text-danger text-decoration-none p-0">Hapus</button>
                            </td>
                        </tr>
                        <tr v-if="skills.length === 0">
                            <td colspan="3" class="p-3 text-center text-muted">Belum ada data skill.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- CERTIFICATIONS TAB -->
        <div v-if="activeTab === 'certifications'">
            <div class="d-flex justify-content-between mb-3">
                <h3 class="fw-bold m-0">Certifications List</h3>
                <router-link to="/admin/certifications/form" class="btn btn-primary">
                    + Tambah Sertifikasi
                </router-link>
            </div>
            <div class="table-responsive bg-white shadow-sm rounded">
                <table class="table mb-0">
                    <thead class="table-light">
                        <tr>
                            <th class="p-3 text-start">Gambar</th>
                            <th class="p-3 text-start">Judul</th>
                            <th class="p-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cert in certifications" :key="cert.id">
                            <td class="p-3 align-middle">
                                <img :src="cert.img" alt="Cert"
                                    style="height: 50px; border-radius: 4px; object-fit: cover;" />
                            </td>
                            <td class="p-3 align-middle">{{ cert.title }}</td>
                            <td class="p-3 text-center align-middle">
                                <router-link :to="`/admin/certifications/form/${cert.id}`"
                                    class="text-primary text-decoration-none me-3">Edit</router-link>
                                <button @click="deleteCertification(cert.id)"
                                    class="btn btn-link text-danger text-decoration-none p-0">Hapus</button>
                            </td>
                        </tr>
                        <tr v-if="certifications.length === 0">
                            <td colspan="3" class="p-3 text-center text-muted">Belum ada data sertifikasi.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- MESSAGES TAB -->
        <div v-if="activeTab === 'messages'">
            <h3 class="fw-bold mb-3">Messages Inbox</h3>
            <div class="table-responsive bg-white shadow-sm rounded">
                <table class="table mb-0 table-hover">
                    <thead class="table-light">
                        <tr>
                            <th class="p-3 text-start">Pengirim</th>
                            <th class="p-3 text-start">Email / WA</th>
                            <th class="p-3 text-start">Subjek</th>
                            <th class="p-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="msg in messages" :key="msg.id" style="cursor: pointer;"
                            @click="openMessageModal(msg)">
                            <td class="p-3 align-middle fw-semibold">{{ msg.sender }}</td>
                            <td class="p-3 align-middle">
                                <div>{{ msg.email }}</div>
                                <div class="small text-muted">{{ msg.whatsapp || '-' }}</div>
                            </td>
                            <td class="p-3 align-middle">{{ msg.subject }}</td>
                            <td class="p-3 text-center align-middle">
                                <button @click.stop="deleteMessage(msg.id)"
                                    class="btn btn-link text-danger text-decoration-none p-0">Hapus</button>
                            </td>
                        </tr>
                        <tr v-if="messages.length === 0">
                            <td colspan="4" class="p-3 text-center text-muted">Belum ada pesan masuk.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Message Details Modal -->
        <div v-if="selectedMessage" class="modal-backdrop fade show"
            style="display: block; background: rgba(0,0,0,0.5);"></div>
        <div v-if="selectedMessage" class="modal fade show" style="display: block;" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">Detail Pesan</h5>
                        <button type="button" class="btn-close" @click="closeMessageModal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="fw-semibold small text-muted">Pengirim</label>
                            <div>{{ selectedMessage.sender }}</div>
                        </div>
                        <div class="mb-3">
                            <label class="fw-semibold small text-muted">Kontak</label>
                            <div>Email: <a :href="`mailto:${selectedMessage.email}`">{{ selectedMessage.email }}</a>
                            </div>
                            <div v-if="selectedMessage.whatsapp">WhatsApp: <a
                                    :href="`https://wa.me/${selectedMessage.whatsapp.replace(/[^0-9]/g, '')}`"
                                    target="_blank">{{ selectedMessage.whatsapp }}</a></div>
                        </div>
                        <div class="mb-3">
                            <label class="fw-semibold small text-muted">Subjek</label>
                            <div>{{ selectedMessage.subject }}</div>
                        </div>
                        <div class="mb-3">
                            <label class="fw-semibold small text-muted">Pesan</label>
                            <div class="p-3 bg-light rounded" style="white-space: pre-wrap;">{{
                                selectedMessage.messages }}</div>
                        </div>
                        <div class="text-end small text-muted mt-2">
                            Diterima pada: {{ new Date(selectedMessage.created_at).toLocaleString('id-ID') }}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger me-auto"
                            @click="deleteMessage(selectedMessage.id)">Hapus Pesan</button>
                        <button type="button" class="btn btn-secondary" @click="closeMessageModal">Tutup</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.nav-tabs .nav-link {
    color: #495057;
    cursor: pointer;
    font-weight: 500;
}

.nav-tabs .nav-link.active {
    color: #0d6efd;
    font-weight: 600;
}
</style>