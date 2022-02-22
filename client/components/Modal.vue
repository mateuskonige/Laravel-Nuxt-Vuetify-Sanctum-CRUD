 <template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Add
                <slot />
            </v-btn>
        </template>

        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                Add some new
                <slot />
            </v-card-title>

            <v-form ref="form" lazy-validation @submit.prevent="store()">
                <v-card-text>
                    <v-text-field
                        outlined
                        type="text"
                        label="Name"
                        v-model="form.name"
                        :error-messages="errors.name"
                    ></v-text-field>

                    <v-text-field
                        outlined
                        type="number"
                        step="0.1"
                        label="Amount"
                        v-model="form.amount"
                        :error-messages="errors.amount"
                    ></v-text-field>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false" color="primary" text>Cancel</v-btn>
                    <v-btn type="submit" color="primary" depressed>Submit</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

 <script>
export default {
    props: ['dialog'],

    data() {
        return {
            form: {
                name: '',
                amount: ''
            },
            errors: [],
        }
    },

    methods: {
        async store() {
            try {
                await this.$axios.$post('api/products', this.form)
                this.$refs.form.reset()
                this.errors = []
                this.$emit('saved')
                this.$toast.success('Successfully added new product', { duration: 2000 })
            } catch (err) {
                if (err.response.status = 422) {
                    this.errors = err.response.data.errors
                    console.log(this.errors)
                }
            }
        }
    }
}
</script>
