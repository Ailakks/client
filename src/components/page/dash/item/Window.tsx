import {useContext} from "react";
import {WidgetContext} from "./Widget";

export default function Window({ children }) {
    const { collapsed, add, replace, remove, collapse } = useContext(WidgetContext);

    return (
        <div>
            {!collapsed && children}
        </div>
    )
}
