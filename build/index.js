"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./utils/database"));
const environments_1 = require("./utils/environments");
const decentralizedToken_1 = require("./middlewares/decentralizedToken");
(0, database_1.default)();
const app = (0, express_1.default)();
app.use(decentralizedToken_1.decentralizedToken);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
(0, routes_1.default)(app);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(environments_1.PORT, () => {
    console.log(`server is running on http://localhost:3000`);
});
