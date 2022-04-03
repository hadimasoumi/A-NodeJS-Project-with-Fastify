import { UserInterface } from "../core/entities/interfaces/user.interface";
declare function deleteAllUsers(): Promise<any>;
declare function createUser(reqCreate: UserInterface): Promise<any>;
declare function getUserById(UserID: number): Promise<any>;
declare const _default: {
    deleteAllUsers: typeof deleteAllUsers;
    createUser: typeof createUser;
    getUserById: typeof getUserById;
};
export default _default;
