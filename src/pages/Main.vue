<script setup>
import Profil from '@/components/Profil.vue';
import Skill from '@/components/Skill.vue';
import Project from '@/components/Project.vue';
import Certificate from '@/components/Certificate.vue';
import Contact from '@/components/Contact.vue';
import Navbar from '@/components/Navbar.vue';
import FooterComp from '@/components/Footer.vue';
</script>

<template>
    <main>
        <Navbar />
        <Profil />
        <Skill />
        <Project />
        <Certificate />
        <Contact />
        <FooterComp />
    </main>
</template>