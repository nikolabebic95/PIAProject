import * as React from "react";
import * as Utils from "../utils/utils";
import AddCompany from "./Add"

export function routes() {
    let ret = [
        { path: "add", component: AddCompany}
    ];

    return Utils.prefixRoutes("companies", ret);
}
