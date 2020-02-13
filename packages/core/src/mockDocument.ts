// 为了实现动态的 import 实现代码分割
import Url from 'url-parse';

export const mockWindow = {};

export class ScriptElement {
  onload?: Function;
  onerror?: Function;
  _fetch: (url: string) => Promise<any>;
  baseUrl: string;

  constructor(fetchFunction: (url: string) => Promise<any>, baseUrl: string) {
    this.baseUrl = baseUrl;
    if (fetchFunction) {
      this._fetch = fetchFunction;
    } else {
      this._fetch = fetch;
    }
  }

  setAttribute() {}

  private _url = '';
  get src() {
    return this._url;
  }

  set src(str: string) {
    this._url = str;
    const realUrl = new Url(this.baseUrl, str).toString();
    console.log('111realUrl', realUrl);
    this._fetch(realUrl)
      .then(res => res.text())
      .then(code => {
        this.handleLoad(code);
      })
      .catch(error => this.handlerError(error));
  }

  handleLoad(code: string) {
    if (this.onload) {
      const newModule = new Function('window', code);
      newModule(mockWindow);
      this.onload({ type: 'loaded', target: this });
    }
  }

  handlerError(error: any) {
    if (this.onerror) {
      this.onerror(error);
    }
  }
}

export const createMockDocument = (_fetch: (url: string) => Promise<any>, url: string) => ({
  createElement(type: string) {
    const objectUrl = new Url(url);
    const path = objectUrl.pathname;
    const basePath = path
      .split('/')
      .slice(0, -1)
      .join('/');
    const baseUrl = `${objectUrl.protocol}//${objectUrl.hostname}${
      objectUrl.port ? ':' + objectUrl.port : ''
    }${basePath}`;
    return new ScriptElement(_fetch, baseUrl);
  },
  body: {
    appendChild() {}
  },
  head: {
    appendChild() {}
  }
});
