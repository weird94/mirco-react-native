"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loadRemoteComponent_1 = require("./loadRemoteComponent");
exports.loadRemoteComponent = loadRemoteComponent_1.default;
var Container_1 = require("./Container");
exports.RemoteComponentContainer = Container_1.default;
var createContainer_1 = require("./createContainer");
exports.createContainer = createContainer_1.createContainer;
exports.CONTAINER = Symbol('symbol for dynamic-rn-container');
