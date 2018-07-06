import * as React from "react";
import * as Utils from "../utils/utils";
import ListLectures from "./List"
import ListLecturesEnglish from "./ListEnglish"

export function routes() {
    let ret = [
        { path: "list", component: ListLectures},
        { path: "list_english", component: ListLecturesEnglish}
    ];

    return Utils.prefixRoutes("lectures", ret);
}
