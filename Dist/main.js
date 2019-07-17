"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const user_router_1 = require("./user/user.router");
const test_router_1 = require("./server/test.router");
const auth_router_1 = require("./security/auth.router");
const server = new server_1.Server();
server.bootstrap([user_router_1.userRouter, test_router_1.testRouter, auth_router_1.authRouter]).then(server => {
    console.log('Server is listening on:', server.application.address());
}).catch(error => {
    console.log('server failed tl start.');
    console.error(error);
    process.exit(1);
});
