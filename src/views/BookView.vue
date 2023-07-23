<template>
    <div class="about">
        <v-container class="category-card">
            <v-subheader class="title mb-5">{{ book.title }}</v-subheader>
            <v-img v-if="book.cover" :src="getImage(book.cover)" height="200px" class="book-card"></v-img>
            <v-subheader>Information</v-subheader>
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                        <tr>
                            <th class="text-xs-left">Author: </th><td>{{ book.author }}</td>
                        </tr>
                        <tr>
                            <th class="text-xs-left">Publisher: </th><td>{{ book.publisher }}</td> 
                        </tr>
                        <tr>
                            <th class="text-xs-left">Price: </th><td v-if="book.price">
                            {{ book.price.toLocaleString('id-ID', {style:"currency", currency:"IDR"}) }}</td>
                        </tr>
                        <tr>
                            <th class="text-xs-left">Weight: </th><td>{{ book.weight }} kg</td>
                        </tr>
                        <tr>
                            <th class="text-xs-left">Stock: </th><td>{{ book.stock }}</td>
                        </tr>
                        <tr>
                            <th class="text-xs-left">Categories: </th>
                            <td>
                                <span v-for="category in book.categories" :key="category.id">
                                    {{ category.name }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <v-subheader>Descripton</v-subheader>
            <p class="body-2"> {{ book.description }}</p>
            <div style="position:relative">
                <v-btn block color="success" @click="buy" :disabled="book.stock == 0">
                    <v-icon>save_alt</v-icon> &nbsp;BUY
                </v-btn>
            </div>
        </v-container>
    </div>
</template>

<style>
.book-card {
    border-radius: 10px !important;
    overflow: hidden !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
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
.v-data-table tbody tr:not(:last-child) {
        border-bottom: 8px solid transparent;
}
</style>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                book: {},
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
                addCart: 'cart/add',
                setAler: 'alert/set'
            }),
            buy() {
                this.addCart(this.book)
                this.setAler({
                    status: true,
                    text: 'Added to Cart',
                    type: 'success'
                })
            }
        },
        created() {
            const slug = this.$route.params.slug;
            const url = '/books/slug/' + slug;
            this.axios.get(url)
            .then((response) => {
                let book = response.data.data;
                this.book = book;
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                } else {
                    console.log(error);
                }
            });
        },
    };
</script>