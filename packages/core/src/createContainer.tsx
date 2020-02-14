import React, { Suspense, ErrorInfo } from 'react';
import loadRemoteComponent from './loadRemoteComponent';
import { NavigationScreenProp } from 'react-navigation';
import { createMockDocument } from './mockDocument';
import Url from 'url-parse';

const noop = () => {};

export type ErrorTipsProps = { onRetry?: () => void; navigation: any; title?: string };

type ContainerOptions = {
  Loading: React.ComponentType;
  ErrorTips: React.ComponentType<ErrorTipsProps>;
  trackRenderError?: (error: Error, errorInfo: ErrorInfo) => void;
  injectFetch?: typeof fetch;
  injectRequire: (name: string) => any;
  trackLoadJSTime?: (log: LoadJSTimeLog) => void;
};

export type LoadJSTimeLog = {
  cost: number;
  url: string;
  startTime: number;
  loadedTime: number;
};

type Props = {
  navigation: NavigationScreenProp<any>;
  screenProps: { url: string; initalProps: any };
};

type State = { error: any; refreshTag: number };

export function createContainer({
  Loading,
  ErrorTips,
  trackRenderError = noop,
  injectFetch = fetch,
  injectRequire,
  trackLoadJSTime
}: ContainerOptions) {
  if (!Loading) {
    throw 'invailed options, prop `Loading` is required';
  }

  if (!ErrorTips) {
    throw 'invailed options, prop `ErrorTips` is required';
  }

  return class RemoteComponentContainer extends React.Component<Props, State> {
    RemoteComponent: React.LazyExoticComponent<React.ComponentType<any>>;
    mockDocument: ReturnType<typeof createMockDocument>;
    urlObj: Url;

    constructor(props: any) {
      super(props);

      this.state = {
        error: false,
        refreshTag: 0
      };

      this.buildComponent();
    }

    buildComponent() {
      const startTime = Date.now();
      const url = this.props.navigation.getParam('url') || this.props.screenProps.url;
      this.urlObj = new Url(url);
      this.mockDocument = createMockDocument(injectFetch, url);
      const RemoteComponent = React.lazy(() =>
        loadRemoteComponent(url, injectFetch, injectRequire, this.mockDocument).then(component => {
          const loadedTime = Date.now();
          const cost = loadedTime - startTime;
          if (typeof trackLoadJSTime === 'function') {
            trackLoadJSTime({ cost, startTime, loadedTime, url });
          }
          return component;
        })
      );
      this.RemoteComponent = RemoteComponent;
    }

    handleRetry = () => {
      this.setState({ error: false });
      this.handleRefresh();
    };

    handleRefresh = () => {
      this.buildComponent();
      this.setState({ refreshTag: Date.now() });
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      trackRenderError(error, errorInfo);
      this.setState({ error: true });
    }

    render() {
      const RemoteComponent = this.RemoteComponent;
      const { error, refreshTag } = this.state;

      return error ? (
        <ErrorTips
          onRetry={this.handleRetry}
          navigation={this.props.navigation}
          title={this.urlObj.query.title}
        />
      ) : (
        <Suspense key={refreshTag} fallback={<Loading />}>
          <RemoteComponent {...this.props} />
        </Suspense>
      );
    }
  };
}
