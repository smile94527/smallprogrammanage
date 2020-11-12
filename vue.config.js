module.exports = {
    //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
    outputDir: 'TransportCompetition',
    //部署应用包时的基本 URL
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: 'assets',
    // webpack-dev-server 相关配置
    devServer: {
        hot: true,
        host: 'localhost', //设置主机地址
        open: false, // 是否自动打开浏览器页面
        port: 8080, //端口地址
        //设置代理
        proxy: {
            "/CrossCountrySys": {
                // target: "http://120.27.70.24:8082",
                // target: "http://192.168.43.248:8080",
                target: "http://124.70.79.167",
                changeOrigin: true
            },
            // "/CrossCountryTest": {
            //     // target: "http://120.27.70.24:8083",
            //     target: "http://192.168.11.185:8081",
            //     changeOrigin: true
            // }
        }
    },
    configureWebpack: {
        //关闭 webpack 的性能提示
        // performance: {
        //     hints:false
        // },

        //或者

        //警告 webpack 的性能提示
        performance: {
            hints: 'warning',
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
        extract: false,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    chainWebpack: config => {
        config.plugins.delete('prefetch')
    }



}