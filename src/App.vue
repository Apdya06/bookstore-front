<template>
    <v-app>

        <c-header />

        <c-alert />

        <keep-alive>
            <v-dialog v-model="statusDialog" fullscreen hide-overlay transition="dialogbottom-transition">
                <component :is="currentComponent"></component>
            </v-dialog>
        </keep-alive>
            
        <c-side-bar />

        <v-main>
            <v-slide-y-transition mode="out-in">
                <router-view></router-view>
            </v-slide-y-transition>
        </v-main>
        
        <c-footer />
  </v-app>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import CHeader from './components/CHeader.vue'
    import CFooter from './components/CFooter.vue'
    import CSideBar from './components/CSideBar.vue'
    import CAlert from './components/CAlert.vue'
    import SearchList from './views/SearchList.vue'
    import LoginPage from './views/LoginPage.vue'
    import RegisterPage from './views/RegisterPage.vue'
    import CartView from './views/CartView.vue'
    import CheckoutPage from './views/CheckoutPage.vue'
    
    export default {
        name: 'App',
        components: {
            CHeader,
            CFooter,
            CSideBar,
            CAlert,
            SearchList,
            LoginPage,
            RegisterPage,
            CartView,
            CheckoutPage,
        },
        methods: {
            ...mapActions({
                setStatusDialog: 'dialog/setStatus',
            }),
            setDialogStatus(value) {
                this.setStatusDialog(value);
            },
        },
        computed: {
            ...mapGetters({
                dialogStatus: 'dialog/status',
                currentComponent: 'dialog/component',
            }),
            statusDialog: {
                get() {
                    return this.dialogStatus;
                },
                set(value) {
                    this.setDialogStatus(value);
                },
            },
        }
    }
</script>
<style type="text/css"> 
    .v-toolbar { Flex: 0 !important; }
    .v-application .py-3 { text-align: center !important;}
    .v-card_text { text-align: center !important;} 
</style>m