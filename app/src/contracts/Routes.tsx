import * as React from "react";
import * as Utils from "../utils/utils";
import AddMoneyContract from "./AddMoneyContract";
import AddDonorContract from "./AddDonorContract";

export function routes() {
    return [];
}

export function userRoutes() {
    return [];
}

export function managerRoutes() {
    let ret = [
        { path: "add_money", component: AddMoneyContract},
        { path: "add_donor", component: AddDonorContract}
    ];

    return Utils.prefixRoutes("contracts", ret);
}

export function adminRoutes() {
    return [];
}
