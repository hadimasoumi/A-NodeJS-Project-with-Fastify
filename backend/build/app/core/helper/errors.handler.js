"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reply = async (replyponseData, reply) => {
    if ("error" in replyponseData) {
        switch (replyponseData.error.code) {
            case 400: {
                reply
                    .header("Content-Type", "application/json;charset=utf-8")
                    .code(replyponseData.error.code);
                break;
            }
            case 403: {
                reply
                    .header("Content-Type", "application/json;charset=utf-8")
                    .code(replyponseData.error.code);
                break;
            }
            case 404: {
                reply
                    .header("Content-Type", "application/json;charset=utf-8")
                    .code(replyponseData.error.code);
                break;
            }
            default: {
                reply
                    .header("Content-Type", "application/json;charset=utf-8")
                    .code(500);
                break;
            }
        }
    }
};
exports.default = { reply };
//# sourceMappingURL=errors.handler.js.map