import { FastifyInstance } from "fastify";
import "./core/adapters/mariadb.adapter";
declare class App {
    app: FastifyInstance;
    app_domain: string;
    app_port: number;
    constructor(appInit: {
        plugins: any;
        routes: any;
    });
    routes(routes: {
        forEach: (arg0: (routes: any) => void) => void;
    }): void;
    listen(): void;
}
export default App;
