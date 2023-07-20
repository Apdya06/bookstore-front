<template>
    <v-card>
        <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="close"><v-icon>close</v-icon></v-btn>
            <v-text-field v-model="keyword" @input="doSearch" hide-details append-icon="mic" 
            text label="Search" prepend-inner-icon="search" solo-inverted ref="txtSearch"></v-text-field>
        </v-toolbar>
        <v-divider></v-divider>
        <v-subheader v-if="keyword.length > 0">Result Search "{{ keyword }}"</v-subheader>
        <v-alert :value="books.length === 0 && keyword.length > 0" color="warning">Sorry, ut no results were found.</v-alert>
        <v-list two-line v-if="books.length > 0 && keyword.length > 0">
            <v-list-item v-for="item in books" :key="item.id" @click="close" :to="'/book/'+ item.slug">
                <v-list-item-avatar>
                    <img :src="getImage(item.cover)" alt="Book Cover">
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-html="item.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-list two-line v-else-if="keyword.length === 0">
            <v-list-item>
            </v-list-item>
        </v-list>
        <v-list two-line v-else>
            <v-list-item>
            </v-list-item>
        </v-list>
    </v-card>
</template>
  
<script>
  import { mapActions } from 'vuex';
  export default {
    name: 'searchView',
    data() {
        return {
            keyword: '',
            books: [],
        };
    },
    methods: {
        getImage (image){
            if(image == null) return "/img/unavailable.jpg" 
            const imageDir = image.split('/')
            const imageName = imageDir[6];
            return process.env.VUE_APP_BACKEND_URL+'/images/'+imageName
        },
        ...mapActions({
            setStatusDialog: 'dialog/setStatus',
        }),
        close() {
            this.setStatusDialog(false);
        },
        doSearch() {
            let keyword = this.keyword;
            if (keyword.length > 0) {
                const url = '/books/search/' + keyword
                this.axios.get(url)
                .then((response) => {
                    let books = response.data.data;
                    this.books = books;
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response);
                    } else {
                        console.log(error);
                    }
                });
            }
        },
    },
    mounted() {
        if (this.$refs.txtSearch !== undefined) {
            this.$nextTick(() => this.$refs.txtSearch.focus());
        }
    },
};
</script>
  