<template>
    <div>
        <v-container grid-list-md>
            <v-subheader>
                Random Category
                <v-spacer></v-spacer> 
                <router-link to="/categories">See All</router-link>
            </v-subheader>
            <v-layout row wrap>
                <v-flex v-for="category in categories" xs6 :key="category.id"> 
                    <v-card :to="'/category/'+ category.slug" class="category-card">
                        <v-img :src="getImage(category.image)" height="150px">
                            <v-container fill-height fluid pa-2>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="title white--text text-block" v-text="category.name"></span>
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
                <v-flex v-for="(book, index) in books" xs6 :key="index">
                    <v-card :to="'/book/'+ book.slug" class="book-card"> 
                        <v-img height="150px" :src="getImage(book.cover)">
                            <v-container fill-height fluid pa-2> 
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="title white--text text-block" v-text="book.title"></span>
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
                                <span class="price">Price: {{ book.price.toLocaleString('id-ID', {style:"currency", currency:"IDR"}) }}</span>
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
  
.category-card {
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
        data: () => ({
            categories: [], 
            books: []
        }), 
        methods: {
            getImage (image){
                if(image == null) return "/img/unavailable.jpg" 
                const imageDir = image.split('/')
                const imageName = imageDir[6];
                return process.env.VUE_APP_BACKEND_URL+'/images/'+imageName
            },
            getCategoryIcon(status) {
                return status === 'PUBLISH' ? 'mdi-check-circle' : 'mdi-alert-circle';
            },
        },
        created(){
            let count = 4
            this.axios.get('/categories/random/'+count)
            .then((response) => { 
                let categories = response.data.data
                this.categories = categories
            })
            .catch((error) => { 
                let responses = error.response
                console.log(responses)
            })
            count = 8
            const url = '/books/top/'+count
            this.axios.get(url) 
            .then((response) => {
                let books = response.data.data 
                this.books = books
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                } else {
                    console.log(error);
                }
            })
        }
    }
</script>