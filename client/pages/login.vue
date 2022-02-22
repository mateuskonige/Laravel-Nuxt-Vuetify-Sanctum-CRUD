<template>
    <v-container>
        <v-card width="768px" class="mx-auto">
            <v-card-title class="text-h5">Login</v-card-title>
            <v-form ref="form" @submit.prevent="userLogin">
                <v-card-text>
                    <v-text-field
                        outlined
                        type="email"
                        name="E-mail"
                        label="E-mail"
                        v-model="form.email"
                        :error-messages="errors.email"
                        prepend-inner-icon="mdi-email"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        type="password"
                        name="Password"
                        label="Password"
                        v-model="form.password"
                        :error-messages="errors.password"
                        prepend-inner-icon="mdi-key"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions class="d-flex align-cente justify-center">
                    <v-btn type="submit" color="primary">Login</v-btn>
                </v-card-actions>
            </v-form>
            <div class="text-center py-4">
                <p>
                    Don't have an account?
                    <nuxt-link to="/register">Signup now!</nuxt-link>
                </p>
            </div>
        </v-card>
    </v-container>
</template>

<script>
export default {
    layout: 'auth',
    auth: 'guest',

    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            errors: []
        }
    },
    methods: {
        async userLogin() {
            try {
                await this.$auth.loginWith('laravelSanctum', { data: this.form })
                this.errors = []
                this.$toast.success('Successfully authenticated', { duration: 2000 })
            } catch (err) {
                this.$toast.error('Error while authenticating', { duration: 2000 })
                if (err.response.status = 422) {
                    this.errors = err.response.data.errors
                    console.log(this.errors)
                }
            }
        }
    }
};
</script>
