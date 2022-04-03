"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setFormatError = (code, message) => {
    return {
        error: {
            code: code,
            message: message,
        },
    };
};
const setFormatSuccess = (code, message) => {
    return {
        success: {
            code: code,
            message: message,
        },
    };
};
const parseResponse = (data) => {
    if ((data === null || data === void 0 ? void 0 : data.constructor) === Error) {
        const errorSpliter = data.toString().split(": ");
        const errorCode = parseInt(errorSpliter[1], 10);
        const errorMessage = `${errorSpliter[1]}: ${errorSpliter[2]}`;
        return setFormatError(errorCode, errorMessage);
    }
    else if (typeof data === "string") {
        const successCode = parseInt(data.toString().split(":")[0], 10);
        const successMessage = data;
        return setFormatSuccess(successCode, successMessage);
    }
    else {
        return data;
    }
};
exports.default = parseResponse;
//# sourceMappingURL=response.parser.js.map