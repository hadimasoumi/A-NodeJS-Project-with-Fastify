"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = __importDefault(require("../core/entities/schemas"));
class UserRepository {
    constructor() { }
    static getInstance() {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }
    async DeleteAllUsers() {
        return schemas_1.default.User.destroy({
            where: {},
            force: true,
        });
    }
    async GetAllUsers() {
        const result = await schemas_1.default.User.findAll({
            order: [["id", "ASC"]],
        });
        return result;
    }
    CreateUser(user) {
        const object = {
            name: user.name,
        };
        if (user.id != undefined)
            object["id"] = user.id;
        return schemas_1.default.User.create(object);
    }
    GetUserById(id) {
        return schemas_1.default.User.findAll({
            where: {
                id: id,
            },
        });
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map