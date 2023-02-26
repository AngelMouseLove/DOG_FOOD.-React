var config = {
    // entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),//путь куда будет собираться наш проект
        filename: "main.js",// имя нашего бандла
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
        open: true, // сайт будет открываться сам при запуске npm run dev
        hot: true,
    },
    // module: {
    //     loaders: [
    //         {
    //             test: /\.jsx?$/,
    //             exclude: /node_modules/,
    //             loader: 'babel-loader',
    //             query: {
    //                 presets: ['es2015', 'react']
    //             }
    //         }
    //     ]
    // }
}

module.exports = config; 