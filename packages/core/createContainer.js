import React, { Suspense } from "react";
import loadRemoteComponent from "./loadRemoteComponent";

const noop = () => {};

/**
 *
 * @param {{ Loading: React.Component }} param0
 */
export function createContainer({
  Loading,
  ErrorTips,
  trackRenderError = noop,
  injectFetch
} = {}) {
  if (!Loading) {
    throw "invailed options, prop `Loading` is required";
  }

  if (!ErrorTips) {
    throw "invailed options, prop `ErrorTips` is required";
  }

  return class RemoteComponentContainer extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        error: false,
        refreshTag: 0
      };

      this.focusEvent = null;
      this.buildComponent();
    }

    buildComponent() {
      const url = this.props.navigation.getParam("url");
      this.RemoteComponent = React.lazy(() =>
        loadRemoteComponent(url, injectFetch || fetch)
      );
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
      this.focusEvent = navigation.addEventListener(
        "didFocus",
        this.handleFocus
      );
    }

    removeFocusEvent() {
      if (this.focusEvent) {
        this.focusEvent.remove();
        this.focusEvent = null;
      }
    }

    handleFocus() {
      const { navigation, onBackToTop } = this.props;
      const stackDepth = navigation.dangerouslyGetParent().routes.length;
      if (stackDepth === 1) {
        typeof onBackToTop === "function" && onBackToTop();
      }
    }

    componentDidCatch(error) {
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
