<template>
    <v-navigation-drawer v-model="drawer" absolute fixed clipped>
        <v-toolbar dark color="primary">
            <v-btn icon dark @click="drawer=false">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Bookstore</v-toolbar-title>
        </v-toolbar>
        <v-list v-if="guest">
            <v-list-item>
                <v-btn @click="register()" depressed block rounded color="secondary" class="white--text">
                    Register 
                    <v-icon right dark>person_add</v-icon>
                </v-btn>
            </v-list-item>
            <v-list-item>
                <v-btn @click="login()" block rounded depressed color="accent lighten-1" class="white--text"> 
                    Login 
                    <v-icon right dark>lock_open</v-icon>
                </v-btn>
            </v-list-item>
        </v-list>
        <v-list v-if="!guest">
            <v-list-item>
                <v-list-item-avatar>
                    <img :src="getImage(user.avatar)">
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>
                        {{ user.name }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
                <v-list-item>
                <v-btn block small rounded depressed color="error lighten-1" class="white--text" @click.stop="logout();">
                    Logout
                    <v-icon small right dark>settings_power</v-icon>
                </v-btn>
            </v-list-item>
        </v-list>
        <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <template v-for="(item, index) in items">
                <v-list-item :key="index" :href="item.route" :to="{name: item.route}" v-if="!item.auth || (item.auth && !guest)" >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
    import {mapGetters, mapActions } from 'vuex'
    export default { 
        name: 'c-side-bar',
        data: () => ({
            items: [
                { title: 'Home', icon: 'dashboard', route: 'home' },
                { title: 'About', icon: 'question_answer', route: 'about' },
            ],            
        }),
        methods: {
            getImage (image){
                if(image == null) return process.env.VUE_APP_BACKEND_URL+'/images/notfound.png' 
                const imageDir = image.split('/')
                const imageName = imageDir[6];
                return process.env.VUE_APP_BACKEND_URL+'/images/'+imageName
            },
            ...mapActions({
                setSideBar: 'setSideBar',
                setStatusDialog : 'dialog/setStatus',
                setComponent : 'dialog/setComponent',
                setAuth : 'auth/set',
                setAlert : 'alert/set',
            }),
            login(){
                this.setStatusDialog(true)
                this.setComponent('login-page')
                this.setSideBar(false)
            },
            logout(){
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.user.api_token,
                    },
                }
                this.axios
                .post('/logout', {}, config)
                .then(() => {
                    this.setAuth({})
                    this.setAlert({
                        status: true,
                        text: 'Logout succesfuly',
                        type: 'success',
                    })
                    this.setSideBar(false)
                })
                .catch((error)=> {
                let response = {};                       
                    if (error.response) {
                        response = error.response;
                        this.setAlert({
                            status: true,
                            text: response.data.data.message,
                            type: 'error',
                        });
                    }
                     else {
                        response = error;
                        this.setAlert({
                            status: true,
                            text: response,
                            type: 'error',
                        }); 
                    }
                })
            },
            register(){
                this.setStatusDialog(true)
                this.setComponent('register-page')
                this.setSideBar(false)
            },
        },
        computed: {
            ...mapGetters({
                sideBar: 'sideBar',
                user: 'auth/user',
                guest: 'auth/guest',
            }),
            drawer: {
                get () {
                    return this.sideBar
                }, 
                set (value) { 
                    this.setSideBar(value)
                }
            },
        },
    }
</script>   