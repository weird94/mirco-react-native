'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ReactNative = require('react-native');
var ReactNavigation = _interopDefault(require('react-navigation'));

function _require(name) {
    if (name == 'REACT') {
        return React__default;
    }
    else if (name == 'REACT_NATIVE') {
        return ReactNative;
    }
    else if (name == 'REACT_NAVIGATION') {
        return ReactNavigation;
    }
    else {
        throw "require unsupported external module: " + name;
    }
}
function loadRemoteComponent(url, _fetch) {
    if (_fetch === void 0) { _fetch = fetch; }
    return _fetch(url)
        .then(function (res) { return res.text(); })
        .then(function (body) {
        // webpack commonjs 规范模块
        var exports = {};
        var createComponent = new Function('exports', 'require', body);
        createComponent(exports, _require);
        return exports.__esModule ? exports.default : exports;
    });
}

var Loading = function () {
    return React__default.createElement(ReactNative.View, null);
};

var ErrorTips = function () {
    return React__default.createElement(ReactNative.View, null,
        React__default.createElement(ReactNative.Text, null));
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var noop = function () { };
function createContainer(_a) {
    var Loading = _a.Loading, ErrorTips = _a.ErrorTips, _b = _a.trackRenderError, trackRenderError = _b === void 0 ? noop : _b, injectFetch = _a.injectFetch;
    if (!Loading) {
        throw 'invailed options, prop `Loading` is required';
    }
    if (!ErrorTips) {
        throw 'invailed options, prop `ErrorTips` is required';
    }
    return /** @class */ (function (_super) {
        __extends(RemoteComponentContainer, _super);
        function RemoteComponentContainer(props) {
            var _this = _super.call(this, props) || this;
            _this.handleRetry = function () {
                _this.setState({ error: false });
            };
            _this.handleRefresh = function () {
                _this.buildComponent();
                _this.setState({ refreshTag: Date.now() });
            };
            _this.getStackDepth = function () {
                var _a;
                var parentState = (_a = _this.props.navigation.dangerouslyGetParent()) === null || _a === void 0 ? void 0 : _a.state;
                if (parentState && parentState.routes) {
                    return parentState.routes.length;
                }
                else {
                    return 1;
                }
            };
            _this.state = {
                error: false,
                refreshTag: 0
            };
            _this.focusEvent = null;
            _this.buildComponent();
            return _this;
        }
        RemoteComponentContainer.prototype.buildComponent = function () {
            var url = this.props.navigation.getParam('url') || this.props.screenProps.url;
            var RemoteComponent = React__default.lazy(function () { return loadRemoteComponent(url, injectFetch || fetch); });
            this.RemoteComponent = RemoteComponent;
        };
        RemoteComponentContainer.prototype.addFocusEvent = function () {
            var navigation = this.props.navigation;
            this.focusEvent = navigation.addListener('didFocus', this.handleFocus);
        };
        RemoteComponentContainer.prototype.removeFocusEvent = function () {
            if (this.focusEvent) {
                this.focusEvent.remove();
                this.focusEvent = null;
            }
        };
        RemoteComponentContainer.prototype.handleFocus = function () {
            var _a = this.props, onBackToTop = _a.onBackToTop, onLeaveTop = _a.onLeaveTop;
            var stackDepth = this.getStackDepth();
            if (stackDepth === 1) {
                typeof onBackToTop === 'function' && onBackToTop();
            }
            else {
                typeof onBackToTop === 'function' && onLeaveTop();
            }
        };
        RemoteComponentContainer.prototype.componentDidCatch = function (error) {
            trackRenderError(error);
            this.setState({ error: true });
        };
        RemoteComponentContainer.prototype.componentDidMount = function () {
            this.addFocusEvent();
        };
        RemoteComponentContainer.prototype.componentWillUnmount = function () {
            this.removeFocusEvent();
        };
        RemoteComponentContainer.prototype.render = function () {
            var RemoteComponent = this.RemoteComponent;
            var _a = this.state, error = _a.error, refreshTag = _a.refreshTag;
            return error ? (React__default.createElement(ErrorTips, { onRetry: this.handleRetry })) : (React__default.createElement(React.Suspense, { key: refreshTag, fallback: React__default.createElement(Loading, null) },
                React__default.createElement(RemoteComponent, __assign({}, this.props))));
        };
        return RemoteComponentContainer;
    }(React__default.Component));
}

var Container = createContainer({
    Loading: Loading,
    ErrorTips: ErrorTips,
    trackRenderError: console.warn
});

var GCTRNRouter = ReactNative.NativeModules.GCTRNRouter;
function openDynamicRNPage(url, extProps) {
    GCTRNRouter.openView({
        path: 'common/rn/DynamicRN',
        params: {
            routerName: CONTAINER,
            query: __assign(__assign({}, extProps), { url: url })
        },
        target: 1
    });
}

var CONTAINER = '$$dynamic_rn_container';

exports.CONTAINER = CONTAINER;
exports.RemoteComponentContainer = Container;
exports.createContainer = createContainer;
exports.loadRemoteComponent = loadRemoteComponent;
exports.openDynamicRNPage = openDynamicRNPage;
