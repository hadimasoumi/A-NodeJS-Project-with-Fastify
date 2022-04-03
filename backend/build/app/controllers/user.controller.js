"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
async function deleteAllUsers() {
    const userRepository = user_repository_1.default.getInstance();
    userRepository
        .deleteAllUsers()
        .then((result) => {
        return result;
    })
        .catch((error) => {
        console.log("error in userConroller -> deleteAllUsers >> ", error);
        throw new Error("400 : " + error.toString());
    });
}
async function createUser(reqCreate) {
    const userRepository = user_repository_1.default.getInstance();
    let finalresult;
    if (reqCreate != undefined && reqCreate != null && reqCreate.name) {
        if (reqCreate.id) {
            const res = await userRepository.getUserById(reqCreate.id);
            if (res.length > 0) {
                return `200 : Save data is successfully.`;
            }
        }
        await userRepository
            .createUser(reqCreate)
            .then(async (result) => {
            finalresult = `201 : Save data is successfully`;
        })
            .catch((error) => {
            throw new Error("400 : " + error);
        });
    }
    else {
        throw new Error("400 : input can not be empty");
    }
    return finalresult;
}
async function getUserById(UserID) {
    const userRepository = user_repository_1.default.getInstance();
    return userRepository
        .getUserById(UserID)
        .then((result) => {
        return result;
    })
        .catch((error) => {
        throw new Error("400 : " + error.toString());
    });
}
exports.default = {
    deleteAllUsers,
    createUser,
    getUserById,
};
//# sourceMappingURL=user.controller.js.map