<!-- <template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script> -->
<template>
    <v-app>

        <c-header />
        
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
    import CHeader from '@/components/CHeader.vue'
    import CFooter from '@/components/CFooter.vue'
    import CSideBar from '@/components/CSideBar.vue'

    export default {
        name: 'App',
        components: {
            CHeader,
            CFooter,
            CSideBar
        }
    }
</script>
<style type="text/css"> 
    .v-toolbar { Flex: 0 !important; }
    .v-application .py-3 { text-align: center !important;}
    .v-card_text { text-align: center !important;} 
</style>