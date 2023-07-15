<template>
    <div>
        <v-container grid-list-md>
            <v-subheader>All Categories</v-subheader>
            <v-layout row wrap>
                <v-flex v-for="category in categories" xs6 :key="category.id"> 
                    <v-card :to="'/category/'+ category.slug">
                        <v-img v-if="category.image" :src="getImage(category.image)" height="150px">
                            <v-container fill-height fluid pa-2>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="title white--text text-block" v-text="category.name"></span>
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
                            </V-btn>
                            <v-btn icon>
                                <v-icon>share</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <div class="text-xs-center">
            <!-- kode untuk paging halaman -->
            <v-pagination v-model="page" @input="go" :length="lengthPage" :total-visible="4"></v-pagination>
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
                const imageDir = image.split('/')
                const imageName = imageDir[6];
                if(imageName != null && imageName.length>0){
                return process.env.VUE_APP_BACKEND_URL+'/images/'+imageName
                }
                return "/img/unavailable.jpg"
            },
            go(){
                let url = '/categories'
                if(this.page > 0) url = '/categories?page=' + this.page
                this.axios.get(url)
                .then((response) => {
                    let response_data = response.data
                    let categories = response_data.data
                    this.lengthPage = response_data.meta.last_page // jumlah halaman di dapat dari meta endpoint categories
                    this.categories = categories // daftar category dari endpoint categories
                })
                .catch((error) => {
                    console.log(error)
                })
            },
        }, 
        created(){
            this.go()
        }
    } 
</script>