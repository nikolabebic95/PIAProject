Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("../utils/utils");
var Dashboard_1 = require("./Dashboard");
var NotFound_1 = require("./NotFound");
var UploadFiles_1 = require("./UploadFiles");
function routes() {
    var ret = [
        { path: "not_found", component: NotFound_1.default }
    ];
    return Utils.prefixRoutes("misc", ret);
}
exports.routes = routes;
function userRoutes() {
    return [];
}
exports.userRoutes = userRoutes;
function managerRoutes() {
    var ret = [
        { path: "dashboard", component: Dashboard_1.default },
        { path: "add_files", component: UploadFiles_1.default }
    ];
    return Utils.prefixRoutes("misc", ret);
}
exports.managerRoutes = managerRoutes;
function adminRoutes() {
    return [];
}
exports.adminRoutes = adminRoutes;
//# sourceMappingURL=Routes.js.map