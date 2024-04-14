import {createContext, isValidElement, useContext, useState} from "react";
import jsonpath from "jsonpath";
import {LayoutContext} from "../grid/GridView";
import {PathContext} from "../grid/GridRender";
import {ListContext} from "../../../list/List";
import Window from "./Window";
import WidgetDroppable from "./WidgetDroppable";

export const WidgetDataContext = createContext();

export default function Widget({ panelRef, collapsed, children }) {
    const { layout, setLayout } = useContext(LayoutContext);
    const { path } = useContext(PathContext);
    const { index } = useContext(ListContext);

    const [metadata, setMetadata] = useState(null);

    if (!metadata) {
        return (
            <WidgetDataContext.Provider value={{ setMetadata }}>
                {children}
            </WidgetDataContext.Provider>
        );
    }

    const add = (id) => {
        const current = jsonpath.value(layout, path);

        const updatedLayout = [ ...layout ];

        jsonpath.apply(updatedLayout, path, () => [...current, id]);

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

    return (
        <WidgetDataContext.Provider value={{ metadata, setMetadata, collapsed, add, replace, remove, collapse }}>
            <WidgetDroppable>
                <Window>
                    {children}
                </Window>
            </WidgetDroppable>
        </WidgetDataContext.Provider>
    )
}
