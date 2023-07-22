<template>
    <v-card>
        <v-toolbar dark color="primary">
            <v-btn icon dark @click="close">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Your Shopping Cart!</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container fluid>
            <div v-if="countCart===0">
                <v-alert outlined color="warning" icon="mdi-cart-off">
                    Keranjang belanja kosong!
                </v-alert>
            </div>
            <v-list three-line v-if="countCart > 0">
                <template v-for="(item, index) in carts">
                    <v-list-item :key="'cart'+index">
                        <v-list-item-avatar>
                            <v-img :src="getImage(item.cover)"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-html="item.title"></v-list-item-title>
                            <v-list-item-subtitle>
                                Rp. {{ item.price.toLocaleString('id-ID') }}
                                ({{ item.weight }} kg)
                                <span style="float:right">
                                    <v-btn icon small rounded depressed @click.stop="removeCart(item)">
                                        <v-icon dark color="error">mdi-minus-circle</v-icon>
                                    </v-btn>
                                    {{ item.quantity }}
                                    <v-btn icon small rounded depressed @click.stop="addCart(item)">
                                        <v-icon dark color="success">mdi-plus-circle</v-icon>
                                    </v-btn>
                                </span>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
            <v-card>
                <v-card-text>
                    <v-layout wrap>
                        <v-flex pa-1 xs6>
                            Total Price ({{ totalQuantity }} items)<br>
                            <span class="title">Rp. {{ totalPrice.toLocaleString('id-ID') }}</span>
                        </v-flex>
                        <v-flex pa-1 xs6 text-right>
                            <v-btn color="primary" @click="checkout" :disabled="totalQuantity==0">
                                <v-icon>mdi-cart-arrow-right</v-icon> &nbsp;
                                Checkout
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-container>
    </v-card>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'CartView',
        methods: {
            getImage (image){
                if(image == null) return process.env.VUE_APP_BACKEND_URL+'/images/notfound.png' 
                const imageDir = image.split('/')
                const imageName = imageDir[6];
                return process.env.VUE_APP_BACKEND_URL+'/images/'+imageName
            },
            checkout(){
                this.$emit('closed', false)
                this.$router.push({path: "/checkout"})
            },
            close(){
                this.setStatusDialog(false)
            },
            ...mapActions({
                setStatusDialog: 'dialog/setStatus',
                setAlert: 'alert/set',
                removeCart: 'cart/remove',
                setCart: 'cart/set',
            }),
            addCart(item) {
                if(item.quantity === item.stock && item.error != null) {
                    return this.setAlert({
                        status: true,
                        text: item.error.text,
                        type: item.error.type   
                    });
                }
                this.$store.dispatch('cart/add', item)
            },
        },
        computed: {
            ...mapGetters({
                carts: 'cart/carts',
                countCart: 'cart/count',
                totalPrice: 'cart/totalPrice',
                totalQuantity: 'cart/totalQuantity',
                totalWeight: 'cart/totalWeight',
            }),
        },
    }
</script>