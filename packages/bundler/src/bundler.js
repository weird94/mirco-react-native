const webpack = require('webpack');
const config = require('./config');
const MemoryFS = require('memory-fs');

function build({ watch }) {
  const compiler = webpack(config);
  if (!watch) {
    compiler.run((err, stats) => {
      // 在这里打印 watch/build 结果...
      console.log(stats);
      process.stdout.write(stats.toString() + '\n');
    });

    return;
  }

  const watching = compiler.watch(
    {
      // watchOptions 示例
      aggregateTimeout: 300,
      poll: undefined,
    },
    (err, stats) => {
      // 在这里打印 watch/build 结果...
      console.log(stats);
      process.stdout.write(stats.toString() + '\n');
    }
  );

  // watching.on;
  compiler.hooks.someHook.tap('done', () => {});
}

module.exports = {
  build,
};
