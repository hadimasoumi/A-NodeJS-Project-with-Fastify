declare class MongoAdapter {
    private _database;
    constructor(username: string, password: string, host: string, port: number, dbName: string, authName: string);
    private connected;
    private error;
}
export default MongoAdapter;
