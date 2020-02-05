import Loading from './Loading';
import ErrorTips from './ErrorTips';
import { createContainer } from './createContainer';

const Container = createContainer({
  Loading,
  ErrorTips,
  trackRenderError: console.warn
});

console.log('a');
export default Container;
