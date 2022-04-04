import { UserInterface } from "../core/entities/interfaces/user.interface";
declare function DeleteAllUsers(): Promise<any>;
declare function CreateUser(reqCreate: UserInterface): Promise<any>;
declare function GetUserById(UserID: number): Promise<any>;
declare function GetAllUser(): Promise<any>;
declare const _default: {
    DeleteAllUsers: typeof DeleteAllUsers;
    CreateUser: typeof CreateUser;
    GetUserById: typeof GetUserById;
    GetAllUser: typeof GetAllUser;
};
export default _default;
