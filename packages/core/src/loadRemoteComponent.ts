export default function loadRemoteComponent(
  url: string,
  _fetch = fetch,
  injectRequire: typeof require
) {
  return _fetch(url)
    .then(res => res.text())
    .then(body => {
      // webpack commonjs 规范模块
      const exports: any = {};
      const createComponent = new Function('exports', 'require', body);
      createComponent(exports, injectRequire);
      return exports.__esModule ? exports.default : exports;
    });
}
