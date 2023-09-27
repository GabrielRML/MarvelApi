<script setup>

import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <nav>
        <div class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body">
            <div class="conteiner-fluid">
                <router-link to="/" class="navbar-brand" style="margin-left: 20px;">MarvelApi</router-link>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bse-toggle="#navbarNav" aria-controls="navbarNav" aria-expanded="false" arial-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link" aria-current="page">Personagens</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/Comics" class="nav-link">Revistas Em Quadrinhos</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="main">
        <router-view></router-view>
    </div>

    <footer class="bg-dark text-light">
    </footer>
</template>

<style scoped>
</style>
