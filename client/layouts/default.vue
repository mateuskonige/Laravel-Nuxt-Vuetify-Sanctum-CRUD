<template>
    <v-app dark>
        <v-navigation-drawer color="primary" dark v-model="drawer" :clipped="clipped" app>
            <v-list>
                <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar :clipped-left="clipped" fixed app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <div v-if="$auth.loggedIn">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn depressed v-bind="attrs" v-on="on">
                            <v-icon>mdi-account</v-icon>
                            {{ $auth.user.name }}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item>
                            <v-list-item-title @click.prevent="userLogout">Logout</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-app-bar>

        <v-main>
            <v-container>
                <Nuxt />
            </v-container>
        </v-main>

        <v-footer :absolute="!fixed" app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',

    data() {
        return {
            drawer: false,
            clipped: true,
            items: [
                {
                    icon: 'mdi-apps',
                    title: 'Welcome',
                    to: '/'
                },
                {
                    icon: 'mdi-chart-bubble',
                    title: 'Inspire',
                    to: '/inspire'
                },
                {
                    icon: 'mdi-archive',
                    title: 'Products',
                    to: '/products'
                }
            ],
            title: 'Nuxt + Vuetify + Laravel + Sanctum'
        }
    },
    methods: {
        async userLogout() {
            await this.$auth.logout()
        }
    }
}
</script>
