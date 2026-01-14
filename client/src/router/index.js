import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main.vue'
import ProjectDetail from '@/pages/ProjectDetail.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
        }
    ]
})

export default router