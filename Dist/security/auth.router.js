"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const jwt = require("jsonwebtoken");
const user_model_1 = require("../user/user.model");
const restifyErrors = require("restify-errors");
const environment_1 = require("../common/environment");
class AuthRouter extends router_1.Router {
    applyRoutes(application) {
        application.post('/auth', (req, resp, next) => {
            let user = new user_model_1.User(req.body);
            if (user.email == 'sandrosb@uol.com.br' && user.password == '123456') {
                let token = jwt.sign({
                    name: user.name,
                    role: 'admin'
                }, environment_1.environment.JWT_SECRET, { expiresIn: 60 * 2 });
                resp.json({ user: user, authToken: token });
                return next();
            }
            else {
                return next(new restifyErrors.BadRequestError('Auth fail!'));
            }
        });
    }
}
exports.authRouter = new AuthRouter();
