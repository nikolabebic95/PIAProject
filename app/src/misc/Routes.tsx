import * as React from "react";
import * as Utils from "../utils/utils";
import Dashboard from "./Dashboard";

export function routes() {
    let ret = [
        { path: "dashboard", component: Dashboard}
    ];

    return Utils.prefixRoutes("misc", ret);
}
