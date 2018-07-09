import * as React from "react";
import * as Utils from "../utils/utils";
import AddPackage from "./Add";

export function routes() {
    let ret = [
        { path: "add", component: AddPackage}
    ];

    return Utils.prefixRoutes("packages", ret);
}
