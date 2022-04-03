"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_yaml_1 = __importDefault(require("config-yaml"));
const config = (0, config_yaml_1.default)(`${__dirname}/../../config/config.yml`);
console.log("process.env.NODE_ENV >> ", process.env.NODE_ENV);
exports.default = config[process.env.NODE_ENV];
//# sourceMappingURL=index.js.map