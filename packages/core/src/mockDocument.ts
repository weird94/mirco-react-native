// 为了实现动态的 import 实现代码分割
import Url from 'url-parse';

export const mockWindow = {};

export class ScriptElement {
  onload?: Function;
  onerror?: Function;
  _fetch: (url: string) => Promise<any>;
  baseUrl: string;
  src: string = '';

  constructor(fetchFunction: (url: string) => Promise<any>, baseUrl: string) {
    this.baseUrl = baseUrl;
    if (fetchFunction) {
      this._fetch = fetchFunction;
    } else {
      this._fetch = fetch;
    }
  }

  setAttribute() {}

  excute() {
    const realUrl = `${this.baseUrl}/${this.src}`;
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
    if (type !== 'script') {
      throw new Error('unsupport Element type `' + type + '`');
    }
    const objectUrl = new Url(url);
    const { pathname: path, protocol, hostname, port } = objectUrl;
    const basePath = path
      .split('/')
      .slice(0, -1)
      .join('/');
    const baseUrl = `${protocol}//${hostname}${port ? ':' + port : ''}${basePath}`;
    return new ScriptElement(_fetch, baseUrl);
  },
  body: {
    appendChild(element: ScriptElement) {
      try {
        element.excute();
      } catch (error) {
        console.log('excute error', error);
      }
    }
  },
  head: {
    appendChild(element: ScriptElement) {
      try {
        element.excute();
      } catch (error) {
        console.log('excute error', error);
      }
    }
  }
});
