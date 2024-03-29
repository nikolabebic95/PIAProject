import * as React from "react";
import * as Utils from "../utils/utils";
import ListAnnouncements from "./List"
import AddAnnouncement from "./Add";

export function routes() {
    let ret = [
        { path: "list", component: ListAnnouncements},
    ];

    return Utils.prefixRoutes("announcements", ret);
}

export function userRoutes() {
    let ret = [
        { path: "add", component: AddAnnouncement}
    ];

    return Utils.prefixRoutes("announcements", ret);
}

export function managerRoutes() {
    return [];
}

export function adminRoutes() {
    return [];
}
