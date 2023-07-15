<!-- <template>
    <div>
        <v-container grid-list-md>
            <v-subheader class="text-h6">
                Random Category
                <v-spacer></v-spacer>
                <router-link to="/categories">See All</router-link>
            </v-subheader>
            <v-layout row wrap>
                <v-flex xs6 v-for="category in categories" :key="category.id">
                    <v-card :to="'/category/'+ category.slug" class="category-card">
                        <v-img :src="getImage('/categories/' + category.image)" height="250px">
                            <v-container fill-height fluid pa-2>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="title white--text text-block">{{ category.name }}</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                        <v-card-text class="category-status">
                            <v-icon>{{ getCategoryIcon(category.status) }}</v-icon>
                            <span class="status">{{ category.status }}</span>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-md>
            <v-subheader>
                Top Books
                <v-spacer></v-spacer>
                <router-link to="/books">See All</router-link>
            </v-subheader>
            <v-layout row wrap>
                <v-flex v-for="(book, index) in books" :key="index" xs6>
                    <v-card :to="'/book/'+ book.slug" class="book-card">
                        <v-img :src="getImage('/books/'+book.cover)" height="150px">
                            <v-container fill-height fluid pa-2>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="title white--text text-block">{{ book.title }}</span>
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
                                <span class="price">Price: ${{ book.price }}</span>
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
        </v-container>  
    </div>
</template> -->

<template>
    <div>
        <!-- Bagian pertama yaitu category -->
        <v-container grid-list-md>
            <v-subheader>
                Random Category
                <v-spacer></v-spacer> 
                <!--link ke route categories yang nantinya akan kita definisikan routing dan componentnya -->
                <router-link to="/categories">See All</router-link>
            </v-subheader>
            <v-layout row wrap>
                <!-- variabel categories ini nanti akan kita isi dengan data dari endpoint category -->
                <v-flex v-for="category in categories" xs6 :key="category.id"> 
                    <v-card :to="'/category/'+ category.slug">
                        <!-- untuk load image supaya lebih rapi akan kita buatkan method getImage -->
                        <v-img :src="getImage(category.image)" height="150px">
                            <v-container fill-height fluid pa-2>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <!-- nama category-nya akan ditampilkan di sini -->
                                        <span class="title white--text text-block" v-text="category.name"></span>
                                    </v-flex> 
                                </v-layout>
                            </v-container>
                        </v-img>
                        <!-- icon dummy saja, nantinya kamu bisa sesuaikan -->
                        <v-card-actions> 
                            <v-spacer></v-spacer>
                            <v-btn icon>
                                <v-icon>favorite</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>bookmark</v-icon>
                            </V-btn>
                            <v-btn icon>
                                <v-icon>share</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <!-- Bagian kedua yaitu Book --> 
        <v-container grid-list-md>
            <v-subheader>
                Top Books
                <v-spacer></v-spacer>
                <!-- link ke route books yang nantinya akan kita definisikan routing dan componentnya -->
                <router-link to="/books">See All</router-link>
            </v-subheader>
            <v-layout row wrap>
                <!-- data buku kita tampilkan dalam dua kolom (xs6) -->
                <v-flex v-for="(book, index) in books" xs6 :key="index">
                    <v-card :to="'/book/'+ book.slug"> 
                        <v-img height="150px" :src="getImage(book.cover)">
                            <v-container fill-height fluid pa-2> 
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="title white--text text-block" v-text="book.title"></span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
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
        </v-container>
    </div>
</template>

<style scoped>
.text-block {
    position: absolute;
    bottom: 5px;
    left: 5px;
    background-color: black;
    padding-left: 5px;
    padding-right: 5px;
    opacity: 0.7;
    width: 100%;
}
  
  /* .category-card {
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  
  .category-status {
    display: flex;
    align-items: center;
  }
  
  .status {
    font-size: 14px;
    color: gray;
    margin-left: 5px;
  }
  
  .category-status v-icon {
    margin-right: 5px;
  }
  
  .book-card {
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .book-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  
  .book-info {
    margin-top: 10px;
  }
  
  .author-publisher {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  
  .author,
  .publisher {
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
  } */
</style>
<script>
    export default {
        data: () => ({
            categories: [], // kita definisikan sebagai array kosong
            books: []
        }), 
        methods: {
            getImage (image){
                const imageDir = image.split('/')
                const imageName = imageDir[6];
                if(imageName != null && imageName.length>0){
                // return "http://bookstore-api.test/images"+ imageName
                return process.env.VUE_APP_BACKEND_URL+'/images/'+imageName
                }
                // default image jika tidak ditemukan, // letakkan image ini pada folder /public/ing di project Vue
                return "/img/unavailable.jpg"
            },
            getCategoryIcon(status) {
                return status === 'PUBLISH' ? 'mdi-check-circle' : 'mdi-alert-circle';
            },
        },
        created(){
            let count = 4
            // request ke endpoint category random dengan parameter count = 4
            this.axios.get('/categories/random/'+count)
            .then((response) => { 
                let categories = response.data.data
                // ketika dapat datanya maka nilainya dimasukkan ke dalam properti data categories
                this.categories = categories
            })
            .catch((error) => { 
                let responses = error.response
                console.log(responses)
            })
            count = 8
            // request ke endpoint top book dengan parameter count = 8
            this.axios.get('/books/top/'+count) 
            .then((response) => {
                let books = response.data.data 
                this.books = books
            })
            .catch((error) => {
            let responses = error.response 
            console.log(responses)
            })
        }
    }
</script>