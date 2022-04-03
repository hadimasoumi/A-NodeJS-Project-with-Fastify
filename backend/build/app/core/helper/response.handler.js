"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseSender = void 0;
const errors_handler_1 = __importDefault(require("./errors.handler"));
const response_parser_1 = __importDefault(require("./response.parser"));
const responseSender = async (data, reply) => {
    if (data) {
        if ("success" in data) {
            reply
                .header("Content-Type", "application/json;charset=utf-8")
                .code(data.success.code);
        }
        else {
            await errors_handler_1.default.reply(data, reply);
        }
    }
    else
        throw new Error("500 : error ocuured in response.handler. data is not in correct way");
    reply.send(data);
};
exports.responseSender = responseSender;
const responseHandler = async (next, reply, code) => {
    try {
        const data = await next();
        (0, exports.responseSender)((0, response_parser_1.default)(data), reply);
    }
    catch (error) {
        (0, exports.responseSender)((0, response_parser_1.default)(error), reply);
    }
};
exports.default = responseHandler;
//# sourceMappingURL=response.handler.js.map