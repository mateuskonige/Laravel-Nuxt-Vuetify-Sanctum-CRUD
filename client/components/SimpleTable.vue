 <template>
    <v-card>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Amount</th>
                        <th class="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id">
                        <td>{{ product.name }}</td>
                        <td>R$ {{ product.amount }}</td>
                        <td class="text-right">
                            <v-btn
                                depressed
                                color="info"
                                :to="{ name: 'products-id', params: { id: product.id } }"
                            >
                                <v-icon light>mdi-eye</v-icon>
                            </v-btn>
                            <v-btn depressed color="error" @click="deleteProduct(product.id)">
                                <v-icon light>mdi-delete</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-card>
</template>

 <script>
export default {
    props: ['products', 'form'],

    methods: {
        async deleteProduct(id) {
            try {
                await this.$axios.$delete(`/api/products/${id}`)
                this.$toast.success('Successfully removed', { duration: 2000 })
                this.$emit("removed")
            } catch (err) {
                console.log(err)
            }


        }
    }

}
</script>

 <style>
</style>
