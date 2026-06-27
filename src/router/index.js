import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main.vue'
import ProjectDetail from '@/pages/ProjectDetail.vue'
import AdminLogin from '@/pages/Admin/AdminLogin.vue'
import AdminDashboard from '@/pages/Admin/AdminDashboard.vue'
import AdminProjectForm from '@/pages/Admin/AdminProjectForm.vue'
import AdminSkillForm from '@/pages/Admin/AdminSkillForm.vue'
import AdminCertificationForm from '@/pages/Admin/AdminCertificationForm.vue'
import { supabase } from '../supabase'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
    routes: [
        {
            path: "/",
            name: "Main",
            component: Main,
        },
        {
            path: "/project-detail/:id",
            name: "ProjectDetail",
            component: ProjectDetail
        },
        // Admin Routes
        { path: '/login', name: 'Login', component: AdminLogin },
        {
            path: '/admin/dashboard',
            name: 'AdminDashboard',
            component: AdminDashboard,
            meta: { requiresAuth: true } // Tandai rute ini butuh login
        },
        {
            path: '/admin/projects/form/:id?', // ? berarti opsional (bisa buat baru atau edit)
            name: 'AdminProjectForm',
            component: AdminProjectForm,
            meta: { requiresAuth: true }
        },
        {
            path: '/admin/skills/form/:id?',
            name: 'AdminSkillForm',
            component: AdminSkillForm,
            meta: { requiresAuth: true }
        },
        {
            path: '/admin/certifications/form/:id?',
            name: 'AdminCertificationForm',
            component: AdminCertificationForm,
            meta: { requiresAuth: true }
        }
    ]
})

// --- Proteksi Rute ---
router.beforeEach(async (to, from, next) => {
    const { data: { session } } = await supabase.auth.getSession()

    if (to.meta.requiresAuth && !session) {
        next({ name: 'Login' })
    } else {
        next()
    }
})

export default router