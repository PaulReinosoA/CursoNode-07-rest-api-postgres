"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs = __importStar(require("fs"));
// const server = http.createServer((req, resp) => {
//   console.log(req.url);
//   resp.writeHead(200,'content-type: text/html');
//   resp.write('<h1>Hola mundo desde servidor</h1>');
//   resp.end();
// });
// server.listen(8080, () => {
//   console.log('server Online in port : 8080');
// });
const server = http_1.default.createServer((req, resp) => {
    const content = fs.readFileSync('./public/index.html', 'utf-8');
    if (req.url === '/') {
        resp.writeHead(200, 'content-type: index/html');
        resp.write(content);
        resp.end();
    }
    else {
        resp.writeHead(404, 'content-type: index/html');
        resp.end();
    }
});
server.listen(8080, () => {
    console.log('server Online in port : 8080');
});
