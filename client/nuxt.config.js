import colors from 'vuetify/es5/util/colors'

export default {
    ssr: false,
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - client',
        title: 'client',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxtjs/toast',
    ],

    router: {
        middleware: ['auth'],
    },

    toast: {
        position: 'top-center',
        register: [ // Register custom toasts
            {
                name: 'my-error',
                message: 'Oops...Something went wrong',
                options: {
                    type: 'error'
                }
            }
        ]
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: 'http://localhost:8000/',
        credentials: true,
    },

    auth: {
        strategies: {
            laravelSanctum: {
                provider: 'laravel/sanctum',
                url: 'http://localhost:8000',
                endpoints: {
                    login: { url: '/login', method: 'post' },
                    register: { url: '/register', method: 'post' },
                    logout: { url: '/logout', method: 'post' },
                    user: { url: '/api/user', method: 'get' },
                },
                user: {
                    property: false,
                },
            },
        },
        redirect: {
            login: '/login',
            logout: '/login',
            home: '/'
        }
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                light: {
                    primary: '#601124',
                    secondary: '#b0bec5',
                    accent: '#8c9eff',
                    error: '#b71c1c',
                },
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                },

            }
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    }
}
