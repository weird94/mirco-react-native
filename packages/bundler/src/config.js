const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const targetType = process.env.TARGET_TYPE;
const isProduction = process.env.TYPE === 'PROD';

const basePath = process.cwd();

function getConfig({ targetType, isProduction, analyzer, buildInMoudle }) {
  const commonConfig = {
    mode: isProduction ? 'production' : 'development',
    resolve: {
      // 1. extensions 来分别打包 android 和 ios
      extensions: ['.js', `.${targetType}.js`, '.tsx', '.ts'],
      // 2. 取 package.json 中 react-native 字段对应的文件
      // 如果不设置的话某些模块可能会取到 web 对应的文件
      aliasFields: ['react-native'],
      alias: {
        'styled-components': 'styled-components/native/dist/styled-components.native.cjs.js',
      },
    },
    devtool: isProduction ? false : 'inline-source-map',
    entry: path.join(basePath, './index.mrn.js'),
    output: {
      filename: `bundle.${targetType}.js`,
      path: path.resolve(__dirname, 'rn_dist'),
      libraryTarget: 'commonjs',
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts)?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }],
              ['@babel/preset-react', { modules: false }],
              ['@babel/preset-flow', { modules: false }],
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['url-loader'],
        },
      ],
    },
    plugins: [
      ...(analyzer ? [new BundleAnalyzerPlugin()] : []),
      new UglifyJsPlugin({
        parallel: true, //也可以指定 Number ,即最多并行运行数量
        sourceMap: true,
        uglifyOptions: {
          output: { comments: false },
          compress: { drop_console: isProduction },
        },
      }),
    ],
    externals: {
      react: 'react',
      'react-native': 'react-native',
      'react-navigation': 'react-navigation',
      'react-navigation-stack': 'react-navigation-stack',
      ...buildInMoudle,
    },
  };

  return commonConfig;
}

module.exports = getConfig({ isProduction, targetType });
