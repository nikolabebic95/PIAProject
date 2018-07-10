import * as React from "react";
import * as Utils from "../utils/utils";
import AddPackage from "./Add";

export function routes() {
    return [];
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
