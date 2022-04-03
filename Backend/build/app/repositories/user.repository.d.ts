import { UserInterface } from "../core/entities/interfaces/user.interface";
declare class UserRepository {
    private static instance;
    constructor();
    static getInstance(): UserRepository;
    deleteAllUsers(): Promise<any>;
    findAllUsers(): Promise<any>;
    createUser(user: UserInterface): Promise<any>;
    getUserById(id: number): Promise<any>;
}
export default UserRepository;
