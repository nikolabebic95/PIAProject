import * as React from "react";
import * as Utils from "../utils/utils";
import AddCompany from "./Add"
import ListCompanies from "./List";

export function routes() {
    let ret = [
        { path: "add", component: AddCompany},
        { path: "list", component: ListCompanies}
    ];

    return Utils.prefixRoutes("companies", ret);
}
