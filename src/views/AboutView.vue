<template>
    <div class="about">
        <v-container class="category-card">
            <v-subheader class="title mb-5">About</v-subheader>
            <v-img :src="getImage(about.potrait)" height="200px" class="book-card"></v-img>
            <v-subheader>Information</v-subheader>
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                        <tr>
                            <td class="text-xs-left"><strong>Name:</strong></td>
                            <td>{{ about.name }}</td>
                        </tr>
                        <tr>
                            <td class="text-xs-left"><strong>College:</strong></td>
                            <td>{{ about.college }}</td>
                        </tr>
                        <tr>
                            <td class="text-xs-left"><strong>Major:</strong></td>
                            <td>{{ about.major }}</td>
                        </tr>
                        <tr>
                            <td class="text-xs-left"><strong>Class Of:</strong></td>
                            <td>{{ about.classOf }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
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
    export default {
        data() {
            return {
                about: {
                    title: 'About',
                    potrait: 'me.png',
                    name: 'Apdya Amrul Atqia',
                    college: 'Poltek TEDC Bandung',
                    major: 'Informatic Engineering',
                    classOf: '2021',
                },
            };
        },
        methods: {
            getImage(image) {
                return process.env.VUE_APP_BACKEND_URL + '/images/' + image;
            },
        },
    };
</script>
