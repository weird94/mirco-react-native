import { mockWindow } from './mockDocument';

export default function loadRemoteComponent(
  url: string,
  _fetch = fetch,
  injectRequire: (name: string) => any,
  mockDocument: any
) {
  return _fetch(url)
    .then(res => res.text())
    .then(body => {
      // webpack commonjs 规范模块
      const exports: any = {};
      const createComponent = new Function('exports', 'require', 'document', 'window', body);
      createComponent(exports, injectRequire, mockDocument, mockWindow);
      return exports.__esModule ? exports.default : exports;
    });
}
