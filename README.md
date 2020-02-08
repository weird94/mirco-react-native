# dynamic-rn

## TODO



1. [x] 基础容器

2. [ ] wepack 构建配置 - prod

3. [ ] webpack 构建配置 - dev

4. [ ] bundle 云端管理

### wepack 构建配置 - prod

- 找出所有的我们的 RN 项目依赖的第三方组件(它们都应该以 webpack external 的形式被排除)
- 最好以 cli 的形式存在，方便后续升级

### webpack 构建配置 - dev

- 在生产配置的基础下，增加 watch 模式
- command 输出二维码，提供客户端扫码预览 (可以二期)

### bundle 云端管理

缓存策略 - 基于 react-native fetch 实现 http 缓存机制
参考 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ

1. 首次请求

   - fetch https://bundle.ccrgt.com/carhailing/FE-SHARE-BUS/index.js
   - Response
     - body: js 代码
     - header ETag 中写入 js 代码对应的 md5
     - header 中设置缓存策略 cache-control (必须设置 must-revalidate)

![A](https://segmentfault.com/img/bVbshDA?w=800&h=669)

2. 二次请求
   - fetch 中会自动带上 if
   - 若命中缓存 则返回 304, 否则返回 200 并在 body 中返回 js，在 header 中返回新的 md5

### 客户端扫码预览 or test 模块输入链接
