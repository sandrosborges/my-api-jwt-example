"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
class TestRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/ping', (req, resp, next) => {
            resp.json({ ping: 'OK' });
            return next();
        });
    }
}
exports.testRouter = new TestRouter();
