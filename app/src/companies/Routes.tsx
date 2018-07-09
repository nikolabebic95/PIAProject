import * as React from "react";
import * as Utils from "../utils/utils";
import AddCompany from "./Add"
import ListCompanies from "./List";
import ViewCompany from "./View";

export function routes() {
    let ret = [
        { path: "add", component: AddCompany},
        { path: "list", component: ListCompanies},
        { path: "view/:id", component: ViewCompany}
    ];

    return Utils.prefixRoutes("companies", ret);
}
