import { UserInterface } from "../core/entities/interfaces/user.interface";
declare function DeleteAllUsers(): Promise<any>;
declare function CreateUser(reqCreate: UserInterface): Promise<any>;
declare function GetUserById(UserID: number): Promise<any>;
declare const _default: {
    DeleteAllUsers: typeof DeleteAllUsers;
    CreateUser: typeof CreateUser;
    GetUserById: typeof GetUserById;
};
export default _default;
