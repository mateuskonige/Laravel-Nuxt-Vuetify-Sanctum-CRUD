<template>
    <v-container>
        <div class="d-flex align-center justify-space-between">
            <h1>Products</h1>
            <Modal :form="form" :dialog="dialog" @saved="reFetch">product</Modal>
        </div>

        <Loading v-if="$fetchState.pending" />
        <div v-else>
            <div class="text-center my-6">
                <v-pagination
                    @input="onPageChange"
                    v-model="pagination.current"
                    :length="pagination.total"
                    :total-visible="7"
                    circle
                ></v-pagination>
            </div>
            <SimpleTable :products="products" @removed="reFetch" @editProduct="editProduct" />
        </div>
    </v-container>
</template>

<script>
import Loading from "../../components/Loading.vue";
import SimpleTable from "../../components/SimpleTable.vue";
import Modal from "~/components/Modal.vue";

export default {
    data() {
        return {
            products: [],
            links: [],
            form: {},
            pagination: {
                current: 1,
                total: 0
            },
            dialog: false
        };
    },
    async fetch() {
        await this.getProducts();
    },
    methods: {
        async getProducts() {
            try {
                const data = this.$axios.$get(`/api/products?page=${this.pagination.current}`);
                let res = await data;
                console.log(res)
                this.products = res.data
                this.pagination.current = res.meta.current_page;
                this.pagination.total = res.meta.last_page;
            }
            catch (err) {
                console.log(err);
            }
        },
        onPageChange() {
            this.$fetch();
        },
        reFetch() {
            this.dialog = false
            this.$fetch();
        }
    },
    components: { Loading, SimpleTable, Modal }
}
</script>
