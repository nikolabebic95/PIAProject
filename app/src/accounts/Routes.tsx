import * as React from "react";
import * as Utils from "../utils/utils";
import Login from "./Login";
import Signup from "./Signup";

export function routes() {
    let ret = [
        { path: "login", component: Login},
        { path: "signup", component: Signup}
    ];

    return Utils.prefixRoutes("accounts", ret);
}
