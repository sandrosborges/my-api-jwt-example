"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
const jwt2 = require("restify-jwt-community");
// Auth
var jwtConfig = {
    secret: environment_1.environment.JWT_SECRET
};
class Server {
    initializeDB() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    bootstrap(routers = []) {
        return this.initializeDB().then(() => this.initRoutes(routers).then(() => this));
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'lem-api',
                    version: '1.0.0'
                });
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                // secure all routes. except /ping
                this.application.use(jwt2(jwtConfig).unless({
                    path: [
                        environment_1.environment.basePath('/ping'),
                        environment_1.environment.basePath('/auth')
                    ]
                }));
                //routes
                for (let route of routers) {
                    route.applyRoutes(this.application);
                }
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.Server = Server;
