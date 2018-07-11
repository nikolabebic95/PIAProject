import * as React from "react";
import * as Utils from "../utils/utils";
import AddCompany from "./Add"
import ListCompanies from "./List";
import ViewCompany from "./View";
import LinkWithUser from "./LinkWithUser";

export function routes() {
    return [];
}

export function userRoutes() {
    let ret = [
        { path: "list", component: ListCompanies},
        { path: "view/:id", component: ViewCompany},
        { path: "add", component: AddCompany},
    ];

    return Utils.prefixRoutes("companies", ret);
}

export function managerRoutes() {
    let ret = [
        { path: "link", component: LinkWithUser},
    ];

    return Utils.prefixRoutes("companies", ret);
}

export function adminRoutes() {
    return [];
}
