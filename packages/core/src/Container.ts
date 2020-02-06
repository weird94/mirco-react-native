import Loading from './Loading';
import ErrorTips from './ErrorTips';
import { createContainer } from './createContainer';

const Container = createContainer({
  Loading,
  ErrorTips,
  trackRenderError: (_, errorInfo) => console.error(errorInfo)
});

export default Container;
