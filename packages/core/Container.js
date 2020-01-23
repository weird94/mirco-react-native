import React, { Suspense } from "react";
import loadRemoteComponent from "./loadRemoteComponent";

class RemoteComponentContainer extends React.Component {
  constructor(props) {
    super(props);
    const { url } = props;
    this.RemoteComponent = React.lazy(() => loadRemoteComponent(url));
  }

  render() {
    const RemoteComponent = this.RemoteComponent;

    return (
      <Suspense>
        <RemoteComponent />
      </Suspense>
    );
  }
}

export default RemoteComponentContainer;
