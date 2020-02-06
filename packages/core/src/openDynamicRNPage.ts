import { NativeModules } from 'react-native';
import { CONTAINER } from './index';

const { GCTRNRouter } = NativeModules;

export default function openDynamicRNPage(url: string, extProps?: any) {
  GCTRNRouter.openView({
    path: 'common/rn/DynamicRN',
    params: {
      routerName: CONTAINER,
      query: { ...extProps, url }
    }, // 透传给 rn 的 props
    target: 1
  });
}
