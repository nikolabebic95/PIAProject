import * as React from "react";
import * as Utils from "../utils/utils";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";

export function routes() {
    let ret = [
        { path: "login", component: Login},
        { path: "signup", component: Signup},
        { path: "forgot_password", component: ForgotPassword}
    ];

    return Utils.prefixRoutes("accounts", ret);
}
