import React, { Suspense, ErrorInfo } from 'react';
import loadRemoteComponent from './loadRemoteComponent';
import { NavigationScreenProp } from 'react-navigation';

const noop = () => {};

type ContainerOptions = {
  Loading: React.ComponentType;
  ErrorTips: React.ComponentType<{ onRetry?: () => void }>;
  trackRenderError?: (error: Error, errorInfo: ErrorInfo) => void;
  injectFetch?: typeof fetch;
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
  injectFetch
}: ContainerOptions) {
  if (!Loading) {
    throw 'invailed options, prop `Loading` is required';
  }

  if (!ErrorTips) {
    throw 'invailed options, prop `ErrorTips` is required';
  }

  return class RemoteComponentContainer extends React.Component<Props, State> {
    RemoteComponent: React.LazyExoticComponent<React.ComponentType<any>>;

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
      const RemoteComponent = React.lazy(() => loadRemoteComponent(url, injectFetch || fetch));
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
