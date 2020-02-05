"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Loading_1 = __importDefault(require("./Loading"));
var ErrorTips_1 = __importDefault(require("./ErrorTips"));
var createContainer_1 = require("./createContainer");
var Container = createContainer_1.createContainer({
    Loading: Loading_1.default,
    ErrorTips: ErrorTips_1.default,
    trackRenderError: console.warn
});
exports.default = Container;
