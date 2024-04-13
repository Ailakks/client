import {createContext, isValidElement, useContext, useState} from "react";
import jsonpath from "jsonpath";
import {LayoutContext, WidgetsContext} from "../grid/GridView";
import {PathContext} from "../grid/GridRender";
import {GridProviderContext} from "../GridProvider";
import {ListContext} from "../../../list/List";
import Window from "./Window";
import {isArray} from "@apollo/client/utilities";

export const WidgetContext = createContext();

export default function Widget({ panelRef, collapsed, children }) {
    const { layout, setLayout } = useContext(LayoutContext);
    const { widgets } = useContext(WidgetsContext);
    const { path } = useContext(PathContext);
    const { widgetList } = useContext(GridProviderContext);
    const { index } = useContext(ListContext);

    const [metadata, setMetadata] = useState(null);

    if (!metadata) {
        return (
            <WidgetsContext.Provider value={{ setMetadata }}>
                {children}
            </WidgetsContext.Provider>
        );
    }

    const add = (id) => {
        const component = getComponent(id);
        const current = jsonpath.value(layout, path);

        const updatedLayout = [ ...layout ];

        jsonpath.apply(updatedLayout, path, () => [component, ...current]);

        setLayout(updatedLayout);
    };

    const replace = (id) => {
        const component = getComponent(id);
        const updatedLayout = [ ...layout ];

        jsonpath.apply(updatedLayout, `${path}[${index}]`, () => component);

        setLayout(updatedLayout);
    };

    const remove = () => {
        const updatedLayout = [ ...layout ];
        const current = jsonpath.value(layout, path);

        const size = getSize(updatedLayout);

        if (size <= 1) {
            return;
        }

        current.splice(index, 1);

        if (current.length < 1) {
            const array = path.split('.');

            array.pop();

            const last = array.pop();
            const index = last.match(/\[(\d+)]/)[1];
            const parent = [...array, last.replace(/\[\d+]/g, '')].join('.');

            const updated = jsonpath.value(layout, parent);
            updated.splice(index, 1);

            jsonpath.apply(updatedLayout, parent, () => updated);

            const root = updatedLayout[0];
            const first = root.row ?? root.column;

            if (first.length < 1) {
                return;
            }
        }

        jsonpath.apply(updatedLayout, path, () => current);

        setLayout(updatedLayout);
    }

    const getSize = (item) => {
        let total = 0;

        item.forEach((child) => {
            const { row, column } = child;
            const current = row ?? column;

            if (!current) {
                return;
            }

            const filter = current.filter((item) => isValidElement(item));

            total += filter.length;

            total += getSize(current);
        })

        return total;
    }

    const collapse = () => {
        if (!panelRef.current) {
            return;
        }

        if (panelRef.current.isCollapsed()) {
            panelRef.current.expand();
        } else {
            panelRef.current.collapse();
        }
    };

    const getComponent = (id) => {
        return widgets[widgetList.map(({ id }) => id).indexOf(id)];
    };

    return (
        <WidgetsContext.Provider value={{ metadata, setMetadata, replace }}>
            <WidgetContext.Provider value={{ metadata, collapsed, add, replace, remove, collapse }}>
                <Window>
                    {children}
                </Window>
            </WidgetContext.Provider>
        </WidgetsContext.Provider>
    )
}
