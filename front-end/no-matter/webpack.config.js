const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // ...기존 로더 설정...
      {
        test: /\.jsx?$/, // .js와 .jsx 파일에 로더 적용
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Babel 로더 사용
        },
      },
      // CSS 로더 추가
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      
      // SCSS 로더 추가
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },

      // ...기존 로더 설정...
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      "url": require.resolve("url/"), // 'url' 모듈의 폴리필을 추가
    },
  },
  // 여기에 더 많은 웹팩 설정 추가 가능
  node: {
    process: true, // process 객체를 브라우저에서 사용할 수 있도록 설정
  },
};

