<template>
    <div>
        <v-subheader>History Belanja</v-subheader>
        <v-card flat>
            <v-container>
                <v-simple-table>
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td><br>
                                InvoiceL {{ item.invoice_number }}
                                <div class="primary--text title">{{ item.total_price.toLocaleString('id-ID', 
                                    {style:"currency", currency:"IDR"}) }}</div>
                                <small>date: {{ item.updated_at }}. courier: {{ item.courier_service }}</small><br><br>
                            </td>
                            <td>
                                {{ item.status }}
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-container>
        </v-card>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default{
        name: "MyOrderPage",
        data () {
            return {
                items: [],
            }
        },
        computed: {
            ...mapGetters({
                user : 'auth/user',
            })
        },
        methods: {
            ...mapActions({
                setAlert: 'alert/set',
            }),
        },
        mounted() {
            let config = {
                headers: { 'Authorization': 'Bearer ' + this.user.api_token }
            }
            this.axios.get('/my-order', config)
            .then((response) => {
                let { data } = response.data
                this.items = data
            })
            .catch((error) => {
                let{data} = error.response
                this.setAlert({
                    status: true,
                    text: data.message,
                    type: 'error',
                })
            })
        }
    }
</script>
