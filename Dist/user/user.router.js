"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const user_model_1 = require("./user.model");
class UserRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/user', (req, resp, next) => {
            user_model_1.User.find().then(user => {
                resp.json(user);
                return next();
            }).catch(next);
        });
        application.post('/user', (req, resp, next) => {
            let user = new user_model_1.User(req.body);
            user.save().then(user => {
                resp.json(user);
                return next();
            }).catch(next);
        });
    }
}
exports.userRouter = new UserRouter();
