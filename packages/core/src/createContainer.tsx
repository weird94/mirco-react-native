import React, { Suspense, ErrorInfo } from 'react';
import loadRemoteComponent from './loadRemoteComponent';
import { NavigationScreenProp } from 'react-navigation';
import { createMockDocument } from './mockDocument';

const noop = () => {};

export type ErrorTipsProps = { onRetry?: () => void };

type ContainerOptions = {
  Loading: React.ComponentType;
  ErrorTips: React.ComponentType<ErrorTipsProps>;
  trackRenderError?: (error: Error, errorInfo: ErrorInfo) => void;
  injectFetch?: typeof fetch;
  injectRequire: (name: string) => any;
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
  injectFetch,
  injectRequire
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

    constructor(props: any) {
      super(props);

      this.state = {
        error: false,
        refreshTag: 0
      };

      this.buildComponent();
    }

    buildComponent() {
      const url = this.props.navigation.getParam('url') || this.props.screenProps.url;
      this.mockDocument = createMockDocument(injectFetch, url);
      const RemoteComponent = React.lazy(() =>
        loadRemoteComponent(url, injectFetch || fetch, injectRequire, this.mockDocument)
      );
      this.RemoteComponent = RemoteComponent;
    }

    handleRetry = () => {
      this.setState({ error: false });
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
        <ErrorTips onRetry={this.handleRetry} />
      ) : (
        <Suspense key={refreshTag} fallback={<Loading />}>
          <RemoteComponent {...this.props} />
        </Suspense>
      );
    }
  };
}
