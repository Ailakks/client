import {createContext, isValidElement, useContext, useRef, useState} from "react";
import jsonpath from "jsonpath";
import {LayoutContext} from "./GridView";
import List from "../../../list/List";
import {ImperativePanelHandle, Panel} from "react-resizable-panels";

export const PathContext = createContext(null);
export const GridViewContext = createContext(null);

export default function GridRender() {
    const { layout } = useContext(LayoutContext);
    const { path } = useContext(PathContext) ?? { path: "$" };

    const next = jsonpath.value(layout, path);

    return (
        <List list={next}><Item /></List>
    )
}

function Item() {
}
