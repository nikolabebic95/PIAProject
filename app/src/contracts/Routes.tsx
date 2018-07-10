import * as React from "react";
import * as Utils from "../utils/utils";
import AddMoneyContract from "./AddMoneyContract";

export function routes() {
    let ret = [
        { path: "add_money", component: AddMoneyContract}
    ];

    return Utils.prefixRoutes("contracts", ret);
}
