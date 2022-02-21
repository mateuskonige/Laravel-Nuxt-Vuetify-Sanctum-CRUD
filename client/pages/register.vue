<template>
    <v-container>
        <v-card width="768px" class="mx-auto">
            <v-card-title class="text-h5">Register</v-card-title>
            <v-form ref="form" @submit.prevent="userRegister">
                <v-card-text>
                    <v-text-field outlined type="text" name="Name" label="Name" v-model="form.name"></v-text-field>

                    <v-text-field
                        outlined
                        type="email"
                        name="E-mail"
                        label="E-mail"
                        v-model="form.email"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        type="password"
                        name="Password"
                        label="Password"
                        v-model="form.password"
                    ></v-text-field>
                    <v-text-field
                        outlined
                        type="password"
                        name="PasswordConfirmation"
                        label="Password confirmation"
                        v-model="form.password_confirmation"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions class="d-flex align-cente justify-center">
                    <v-btn type="submit" color="primary">Register</v-btn>
                </v-card-actions>
            </v-form>
            <div class="text-center py-4">
                <p>
                    Already have an account?
                    <nuxt-link to="/login">Signin now!</nuxt-link>
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
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            errors: [],
        }
    },
    methods: {
        async userRegister() {
            try {
                let errors = []
                await this.$axios.$get('sanctum/csrf-cookie')
                await this.$axios.$post('/register', this.form)
                    .then((resp) => { })
                    .catch((err) => {
                        if (err.response.status = 422) {
                            errors = err.response.data.errors
                        }
                    })
                this.errors = errors
                await this.$auth.loginWith('laravelSanctum', { data: this.form })
            } catch (error) { }
        }
    }
};
</script>

<style>
</style>
