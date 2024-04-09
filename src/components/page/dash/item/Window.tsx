import {useContext} from "react";
import {WidgetContext} from "./Widget";

export default function Window({ children }) {
    const { metadata, collapsed, add, replace, remove, collapse } = useContext(WidgetContext);

    const { name } = metadata;

    return (
        <div className="h-full bg-gray-500">
            <div className="flex justify-between items-center h-10 bg-gray-300 p-5">
                <p>{name}</p>
                <div className="space-x-5">
                    <button onClick={replace}>
                        <i className="fa-regular ellipsis"/>
                    </button>
                    <button onClick={add}>
                        <i className="fa-regular fa-plus"/>
                    </button>
                    <button onClick={collapse}>
                        <i className={collapsed ? "fa-regular fa-angle-down" : "fa-regular fa-angle-up"}/>
                    </button>
                    <button onClick={remove}>
                        <i className="fa-regular fa-xmark"/>
                    </button>
                </div>
            </div>
            {!collapsed && children}
        </div>
    )
}
