import * as React from "react";
import * as Utils from "../utils/utils";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";

export function routes() {
    let ret = [
        { path: "not_found", component: NotFound}
    ];

    return Utils.prefixRoutes("misc", ret);
}

export function userRoutes() {
    return [];
}

export function managerRoutes() {
    let ret = [
        { path: "dashboard", component: Dashboard}
    ];

    return Utils.prefixRoutes("misc", ret);
}

export function adminRoutes() {
    return [];
}
