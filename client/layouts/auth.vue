<template>
    <v-app>
        <v-container class="logo py-4 d-flex justify-center">
            <NuxtLogo />
        </v-container>

        <Nuxt keep-alive />
    </v-app>
</template>

<script>
export default {
    name: 'AuthLayout',
}
</script>

<style>
</style>
