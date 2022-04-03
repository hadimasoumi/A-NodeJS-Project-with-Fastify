"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class MongoAdapter {
    constructor(username, password, host, port, dbName, authName) {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        (0, mongoose_1.connect)(`mongodb://${host}:${port}/${dbName}`, {});
        this._database = mongoose_1.connection;
        this._database.on("open", this.connected);
        this._database.on("error", this.error);
    }
    connected() {
        console.log("Mongoose has connected 🎉");
    }
    error(error) {
        console.log("**** error [mongodb] : ", error);
        throw error;
    }
}
exports.default = MongoAdapter;
//# sourceMappingURL=mongo.adapter.js.map