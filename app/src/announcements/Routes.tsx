import * as React from "react";
import * as Utils from "../utils/utils";
import ListAnnouncements from "./List"

export function routes() {
    let ret = [
        { path: "list", component: ListAnnouncements}
    ];

    return Utils.prefixRoutes("announcements", ret);
}
