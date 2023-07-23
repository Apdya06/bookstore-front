<template>
    <div>
        <v-container grid-list-md>
            <v-subheader>All Categories</v-subheader>
            <v-layout row wrap>
                <v-flex v-for="category in categories" xs6 :key="category.id"> 
                    <v-card :to="'/category/'+ category.slug" class="category-card">
                        <v-img v-if="category.image" :src="getImage(category.image)" height="150px">
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
        <div class="text-xs-center">
            <v-pagination v-model="page" @input="go" :length="lengthPage" :total-visible="5"></v-pagination>
        </div>
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

.status {
    font-size: 14px;
    color: gray;
    margin-left: 5px;
}
  
.category-status v-icon {
    margin-right: 5px;
}
</style>

<script>
    export default {
        data () {
            return {
                categories: [],
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
            getCategoryIcon(status) {
                return status === 'PUBLISH' ? 'mdi-check-circle' : 'mdi-alert-circle';
            },
            go(){
                let url = '/categories'
                if(this.page > 0) url = url + '?page=' + this.page
                this.axios.get(url)
                .then((response) => {
                    let response_data = response.data
                    let categories = response_data.data
                    this.lengthPage = response_data.meta.last_page 
                    this.categories = categories 
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response);
                    } else {
                        console.log(error);
                    }
                })
            },
        }, 
        created(){
            this.go()
        }
    } 
</script>