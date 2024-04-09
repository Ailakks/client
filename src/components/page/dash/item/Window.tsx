import {useContext} from "react";
import {WidgetContext} from "./Widget";

export default function Window({ children }) {
    const { collapsed, add, replace, remove, collapse } = useContext(WidgetContext);

    return (
        <div>
            <div className="flex h-10 bg-gray-300">
                <button onClick={replace}>
                    <i className="fa-regular ellipsis"/>
                </button>
                <button onClick={add}>
                    <i className="fa-regular fa-plus"/>
                </button>
                <button onClick={collapse}>
                    <i className={collapsed ? "fa-regular fa-angle-down" : "fa-regular fa-angle-up"} />
                </button>
                <button onClick={remove}>
                    <i className="fa-regular fa-xmark" />
                </button>
            </div>
            {!collapsed && children}
        </div>
    )
}
