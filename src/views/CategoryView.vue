<template>
    <div>
        <v-container grid-list-md>
            <v-subheader> {{ category.name }}</v-subheader>
            <v-img v-if="category.image" :src="getImage(category.image)" height="150px" class="book-card"></v-img>
            <v-subheader>Books by "{{ category.name }}" category </v-subheader>
            <v-layout row wrap>
                <v-flex v-for="book in books" xs6 :key="book.id">
                    <v-card :to="'/book/' + book.slug" class="book-card">
                        <v-img v-if="book.cover" :src="getImage(book.cover)" height="150px">
                            <v-container fill-height fluid pa-2>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="title white--text text-block" vtext="book.title"></span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                        <v-card-text class="book-info">
                            <div class="author-publisher">
                                <span class="author">{{ book.author }}</span>
                                <span class="publisher">{{ book.publisher }}</span>
                            </div>
                            <div class="price-stock">
                                <span class="price">Price: ${{ book.price.toLocaleString('id-ID', {style:"currency", currency:"IDR"}) }}</span>
                                <span class="stock">Stock: {{ book.stock }}</span>
                            </div>
                            </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                                <v-icon>favorite</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>bookmark</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>share</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
            <template>
                <div class="text-xs-center">
                    <v-pagination v-model="page" @input="go" :length="lengthPage" :total-visible="5"></v-pagination>
                </div>
            </template>
        </v-container>
    </div>
</template>

<style>
.text-block {
    position:absolute;
    bottom: 5px;
    left: 5px;
    background-color: black;
    padding-left: 5px;
    padding-right: 5px;
    opacity: 0.7;
    width: 100%;
}
.book-card {
    border-radius: 10px !important;
    overflow: hidden !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
 }
  
.book-card:hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2) !important;
}
  
.book-info {
    margin-top: 10px !important;
}
.author-publisher {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}
  
.author, .publisher {
    font-size: 12px;
    color: gray;
  }
  
.price-stock {
    font-size: 14px;
}
  
.price {
    font-weight: bold;
}
  
.stock {
    margin-left: 5px;
}
</style>

<script>
    export default {
        data(){
            return {
                category: {},
                books: [],
                page: 0,
                lengthPage: 0
            }
        },
        methods: {
            getImage (image){
                if(image == null) return "/img/unavailable.jpg" 
                const imageDir = image.split('/')
                const imageName = imageDir[6];
                return process.env.VUE_APP_BACKEND_URL+'/images/'+imageName
            },

            go(){
                let slug = this.$route.params.slug
                let url = '/categories/slug/' + slug
                if(this.page>0) url = url + '?page=' + this.page
                url = encodeURI(url)
                this.axios.get(url)
                .then((response) => {
                    let response_data = response.data
                    let category = response_data.data
                    this.category = category
                    this.books = category.books.data
                    this.lengthPage = category.books.last_page
                })
                .catch((error) =>{
                    if (error.response) {
                        console.log(error.response);
                    } else {
                        console.log(error);
                    }
                })
            }
        },
        created(){
            this.go()
        }
    }
</script>