"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ReactNative = __importStar(require("react-native"));
var react_navigation_1 = __importDefault(require("react-navigation"));
function _require(name) {
    if (name == 'REACT') {
        return react_1.default;
    }
    else if (name == 'REACT_NATIVE') {
        return ReactNative;
    }
    else if (name == 'REACT_NAVIGATION') {
        return react_navigation_1.default;
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
exports.default = loadRemoteComponent;
