"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const hospitals_routes_1 = __importDefault(require("../routes/hospitals.routes"));
const doctors_routes_1 = __importDefault(require("../routes/doctors.routes"));
const searchs_routes_1 = __importDefault(require("../routes/searchs.routes"));
const uploads_routes_1 = __importDefault(require("../routes/uploads.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const rol_routes_1 = __importDefault(require("../routes/rol.routes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        // this.routes();
    }
    config() {
        this.app.set('port', process.env.DB_PORT || 3005);
    }
    routes() {
        //cors
        this.app.use(cors_1.default({ origin: true, credentials: true }));
        this.app.use(express_1.default.static('public'));
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        //declare routes
        this.app.use('/api/users', user_routes_1.default);
        this.app.use('/api/login', auth_routes_1.default);
        this.app.use('/api/hospitals', hospitals_routes_1.default);
        this.app.use('/api/doctors', doctors_routes_1.default);
        this.app.use('/api/search', searchs_routes_1.default);
        this.app.use('/api/upload', uploads_routes_1.default);
        this.app.use('/api/role', rol_routes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
exports.default = Server;
