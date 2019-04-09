module.exports = {
    plugins: {
        autoprefixer: {},
        tailwindcss: './tailwind.config.js',
        '@fullhuman/postcss-purgecss': {
            content: [
                './src/**/*.vue',
                './node_modules/vue-ads-context/dist/vue-ads-context.common.js',
            ],
            whitelistPatterns: [
                /^vue-ads-flex-.+$/,
                /^vue-ads-border.*$/,
            ],
        },
        'postcss-import': {},
        'postcss-url': {},
    },
};
