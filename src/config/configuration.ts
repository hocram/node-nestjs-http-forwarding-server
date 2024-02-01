export const configuration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    app: {
      port: parseInt(process.env.PORT, 10) || 8080,
    },
    database: {},
    api: {},
    proxy: {
        url_target: process.env.URL_TERGET || 'http://localhost:3000'
    }
});