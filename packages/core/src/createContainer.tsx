import React, { Suspense } from 'react';
import loadRemoteComponent from './loadRemoteComponent';
import { NavigationScreenProp, NavigationEventSubscription } from 'react-navigation';

const noop = () => {};

type ContainerOptions = {
  Loading: React.ComponentType;
  ErrorTips: React.ComponentType<{ onRetry?: () => void }>;
  trackRenderError?: (error: any) => void;
  injectFetch?: typeof fetch;
};

type Props = {
  navigation: NavigationScreenProp<any>;
  onBackToTop?: () => void;
  onLeaveTop?: () => void;
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
    focusEvent: NavigationEventSubscription | null;

    constructor(props: any) {
      super(props);

      this.state = {
        error: false,
        refreshTag: 0
      };

      this.focusEvent = null;
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

    addFocusEvent() {
      const navigation = this.props.navigation;
      this.focusEvent = navigation.addListener('didFocus', this.handleFocus);
    }

    removeFocusEvent() {
      if (this.focusEvent) {
        this.focusEvent.remove();
        this.focusEvent = null;
      }
    }

    getStackDepth = () => {
      let parentState = this.props.navigation.dangerouslyGetParent()?.state;
      if (parentState && parentState.routes) {
        return parentState.routes.length;
      } else {
        return 1;
      }
    };

    handleFocus() {
      const { onBackToTop, onLeaveTop } = this.props;
      const stackDepth = this.getStackDepth();
      if (stackDepth === 1) {
        typeof onBackToTop === 'function' && onBackToTop();
      } else {
        typeof onBackToTop === 'function' && onLeaveTop();
      }
    }

    componentDidCatch(error: any) {
      trackRenderError(error);
      this.setState({ error: true });
    }

    componentDidMount() {
      this.addFocusEvent();
    }

    componentWillUnmount() {
      this.removeFocusEvent();
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
