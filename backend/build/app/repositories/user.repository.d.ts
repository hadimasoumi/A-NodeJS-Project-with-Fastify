import { UserInterface } from "../core/entities/interfaces/user.interface";
declare class UserRepository {
    private static instance;
    constructor();
    static getInstance(): UserRepository;
    DeleteAllUsers(): Promise<any>;
    GetAllUsers(): Promise<any>;
    CreateUser(user: UserInterface): Promise<any>;
    GetUserById(id: number): Promise<any>;
}
export default UserRepository;
