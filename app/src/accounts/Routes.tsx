import * as React from "react";
import * as Utils from "../utils/utils";
import Login from "./Login";
import Signup from "./Signup";
import ApproveUsers from "./Approve";

export function routes() {
    let ret = [
        { path: "login", component: Login},
        { path: "signup", component: Signup},
    ];

    return Utils.prefixRoutes("accounts", ret);
}

export function userRoutes() {
    return [];
}

export function managerRoutes() {
    return [];
}

export function adminRoutes() {
    let ret = [
        { path: "approve", component: ApproveUsers},
    ];

    return Utils.prefixRoutes("accounts", ret);
}
