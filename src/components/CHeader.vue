<template>
    <!-- toolbar vuetify dengan warna primary -->
    <v-app-bar dark color="primary">

        <!-- header bagian kiri -->
        <!-- <v-app-bar-nav-icon @click="setSideBar(!sideBar)"></v-app-bar-nav-icon> -->
        <v-app-bar-nav-icon v-if="isHome" @click="setSideBar(!sideBar)"></v-app-bar-nav-icon>
        <v-btn v-if="!isHome" icon @click="$router.go(-1)"> 
            <v-icon>arrow_back</v-icon>
        </v-btn>

        <!-- header bagian tengah -->
        <v-toolbar-title class="white--text">Bookstore</v-toolbar-title>
        
        <!-- separator supaya header bagaian kanan posisinya rata kanan -->
        <v-spacer></v-spacer>
        
        <!-- header bagian kanan -->
        <v-btn icon>
            <v-badge left overlap color="orange">
                <span slot="badge">1</span>
                <v-icon>shopping_cart</v-icon>
            </v-badge>
        </v-btn>
        
        <!-- kolom pencarian di bawah header -->
        <v-text-field v-if="isHome" slot="extension" hide-details append-icon="mic" text_label="Search" 
        prepend-inner-icon="search" solo-inverted></v-text-field>
    </v-app-bar>
</template>
<script>
    import {mapGetters, mapActions } from 'vuex'
    export default {
        name: 'c-header',
        methods: {
            ...mapActions({
                setSideBar: 'setSideBar',
            }),
        },
        computed: {
            ...mapGetters({
                sideBar: 'sideBar',
            }),
        isHome () {
            return (this.$route.path==='/')
            },
        }
    } 
</script>