"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const API_ROOT = '/';
exports.environment = {
    server: { port: process.env.SERVER_PORT || 3000 },
    db: { url: process.env.DB_URL || 'mongodb://localhost/my-api' },
    security: {
        apiSecret: process.env.API_SECRET || '123456'
    },
    // key to generate/verify JWT
    JWT_SECRET: 'some-secret',
    // will be used to building route paths
    basePath: (path) => {
        return API_ROOT.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
    }
};
