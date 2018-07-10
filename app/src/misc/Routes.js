Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("../utils/utils");
var Dashboard_1 = require("./Dashboard");
function routes() {
    var ret = [
        { path: "dashboard", component: Dashboard_1.default }
    ];
    return Utils.prefixRoutes("misc", ret);
}
exports.routes = routes;
//# sourceMappingURL=Routes.js.map