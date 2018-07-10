import * as React from "react";
import * as Utils from "../utils/utils";
import ListLectures from "./List"
import ListLecturesEnglish from "./ListEnglish"
import AddLecture from "./Add";

export function routes() {
    let ret = [
        { path: "list", component: ListLectures},
        { path: "list_english", component: ListLecturesEnglish}
    ];

    return Utils.prefixRoutes("lectures", ret);
}

export function userRoutes() {
    let ret = [
        { path: "add", component: AddLecture}
    ];

    return Utils.prefixRoutes("lectures", ret);
}

export function managerRoutes() {
    return [];
}

export function adminRoutes() {
    return [];
}
