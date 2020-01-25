import React, { Suspense } from "react";
import loadRemoteComponent from "./loadRemoteComponent";
import Loading from "./Loading";
import ErrorTips from "./ErrorTips";

class RemoteComponentContainer extends React.Component {
  constructor(props) {
    super(props);
    const { url } = props;
    this.RemoteComponent = React.lazy(() => loadRemoteComponent(url));

    this.state = {
      error: false
    };
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  handleRetry = () => {
    this.setState({ error: false });
  };

  render() {
    const RemoteComponent = this.RemoteComponent;
    const { error } = this.state;

    return error ? (
      <ErrorTips onRetry={this.handleRetry} />
    ) : (
      <Suspense fallback={<Loading />}>
        <RemoteComponent />
      </Suspense>
    );
  }
}

export default RemoteComponentContainer;
