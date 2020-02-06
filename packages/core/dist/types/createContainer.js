"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var loadRemoteComponent_1 = __importDefault(require("./loadRemoteComponent"));
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
            _this.state = {
                error: false,
                refreshTag: 0
            };
            _this.buildComponent();
            return _this;
        }
        RemoteComponentContainer.prototype.buildComponent = function () {
            var url = this.props.navigation.getParam('url') || this.props.screenProps.url;
            var RemoteComponent = react_1.default.lazy(function () { return loadRemoteComponent_1.default(url, injectFetch || fetch); });
            this.RemoteComponent = RemoteComponent;
        };
        RemoteComponentContainer.prototype.componentDidCatch = function (error, errorInfo) {
            trackRenderError(error, errorInfo);
            this.setState({ error: true });
        };
        RemoteComponentContainer.prototype.render = function () {
            var RemoteComponent = this.RemoteComponent;
            var _a = this.state, error = _a.error, refreshTag = _a.refreshTag;
            return error ? (react_1.default.createElement(ErrorTips, { onRetry: this.handleRetry })) : (react_1.default.createElement(react_1.Suspense, { key: refreshTag, fallback: react_1.default.createElement(Loading, null) },
                react_1.default.createElement(RemoteComponent, __assign({}, this.props))));
        };
        return RemoteComponentContainer;
    }(react_1.default.Component));
}
exports.createContainer = createContainer;
