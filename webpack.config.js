const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,         // .css로 끝나는 모든 파일
        use: "css-loader"       // css-loader를 적용
      },
    ]
  },
};