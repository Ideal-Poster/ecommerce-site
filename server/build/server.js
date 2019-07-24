"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default(), body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World');
});
// app.post('/login', (req,res) => {})
app.listen(process.env.PORT || 8091, () => console.log('Listening on port 8091'));
