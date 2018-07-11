import * as React from "react";
import * as Utils from "../utils/utils";
import AddPackage from "./Add";
import ListPackages from "./List";

export function routes() {
    let ret = [
        { path: "list", component: ListPackages}
    ];

    return Utils.prefixRoutes("packages", ret);
}

export function userRoutes() {
    return [];
}

export function managerRoutes() {
    return [];
}

export function adminRoutes() {
    let ret = [
        { path: "add", component: AddPackage}
    ];

    return Utils.prefixRoutes("packages", ret);
}
