<template>
    <div>
        <Loading v-if="$fetchState.pending" />

        <ul v-else>
            <li>{{ product.name }}</li>
            <li>{{ product.amount }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            product: {},
        };
    },
    async fetch() {
        await this.getSingleProduct();
    },
    fetchDelay: 1000,

    methods: {
        async getSingleProduct() {
            const data = this.$axios.$get(`/api/products/${this.$route.params.id}`);
            const res = await data;
            this.product = res.data;
        },
    },
}
</script>
