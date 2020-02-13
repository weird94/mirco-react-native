// 为了实现动态的 import 实现代码分割

export const mockWindow = {};

class ScriptElement {
  onload?: Function;
  onerror?: Function;
  _fetch: (url: string) => Promise<any>;

  constructor(fetchFunction?: (url: string) => Promise<any>) {
    if (fetchFunction) {
      this._fetch = fetchFunction;
    } else {
      this._fetch = fetch;
    }
  }

  private _url = '';
  get url() {
    return this._url;
  }

  set url(str: string) {
    this._url = str;
    this._fetch(str)
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
      this.onload();
    }
  }

  handlerError(error: any) {
    if (this.onerror) {
      this.onerror(error);
    }
  }
}

export const createMockDocument = (_fetch: (url: string) => Promise<any>) => ({
  createElement(type: string) {
    return new ScriptElement(_fetch);
  }
});
