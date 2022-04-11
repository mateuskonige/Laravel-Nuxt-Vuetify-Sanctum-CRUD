<template>
    <v-container>
        <Loading v-if="$fetchState.pending" />
        <div v-else>
            <div class="d-flex align-center">
                <v-btn to="/products" text color="primary">voltar</v-btn>
                <h1 class="ml-6">Informações sobre {{ form.name }}</h1>
            </div>

            <v-divider class="my-6"></v-divider>

            <v-form ref="form" @submit.prevent="updateProduct()">
                <v-card elevation="0">
                    <v-card-text>
                        <v-text-field
                            outlined
                            label="Name"
                            type="text"
                            v-model="form.name"
                            :error-messages="errors.name"
                        >{{ form.name }}</v-text-field>

                        <v-text-field
                            outlined
                            label="Amount"
                            type="number"
                            v-model="form.amount"
                            :error-messages="errors.amount"
                        >{{ form.amount }}</v-text-field>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            type="submit"
                            color="primary"
                            v-if="form.name !== product.name || form.amount !== product.amount"
                        >
                            <v-icon>mdi-replay</v-icon>&nbsp;Update
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </div>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: "",
                amount: "",

            },
            product: {},
            hover: false,
            errors: []
        };
    },
    async fetch() {
        await this.getSingleProduct();
        this.form.name = this.product.name
        this.form.amount = this.product.amount
    },
    fetchDelay: 1000,

    methods: {
        async getSingleProduct() {
            const data = this.$axios.$get(`/api/products/${this.$route.params.id}`);
            const res = await data;
            this.product = res.data;
        },

        async updateProduct() {
            try {
                await this.$axios.$put(`api/products/${this.$route.params.id}`, this.form)
                this.errors = []
                this.$emit('saved')
                this.$router.push('/products')
                this.$toast.success('Successfully updated', { duration: 2000 })
            } catch (err) {
                if (err.response.status = 422) {
                    this.errors = err.response.data.errors
                    console.log(this.errors)
                }
            }
        }
    },
}
</script>
