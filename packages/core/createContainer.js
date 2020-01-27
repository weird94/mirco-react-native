import React, { Suspense } from "react";
import loadRemoteComponent from "./loadRemoteComponent";

const noop = () => {};

export function createContainer({
  Loading,
  ErrorTips,
  trackRenderError = noop
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

      this.buildComponent();
    }

    buildComponent() {
      const url = this.props.navigation?.state?.params?.url;
      this.RemoteComponent = React.lazy(() => loadRemoteComponent(url));
    }

    handleRetry = () => {
      this.setState({ error: false });
    };

    handleRefresh = () => {
      this.buildComponent();
      this.setState({ refreshTag: Date.now() });
    };

    componentDidCatch(error) {
      trackRenderError(error);
      this.setState({ error: true });
    }

    render() {
      const RemoteComponent = this.RemoteComponent;
      const { error, refreshTag } = this.state;

      return error ? (
        <ErrorTips onRetry={this.handleRetry} />
      ) : (
        <Suspense key={refreshTag} fallback={<Loading />}>
          <RemoteComponent />
        </Suspense>
      );
    }
  };
}
