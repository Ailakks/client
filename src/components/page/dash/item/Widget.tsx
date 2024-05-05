import {createContext, isValidElement, useContext, useState} from "react";
import jsonpath from "jsonpath";
import {LayoutContext} from "../grid/GridView";
import {GridPanelConext, PathContext} from "../grid/GridRender";
import {ListContext} from "../../../list/List";
import Window from "./Window";
import WidgetDroppable from "./WidgetDroppable";

export const WidgetDataContext = createContext();

export default function Widget({ collapsed, children }) {
    const { serialize, setSerialize } = useContext(LayoutContext);
    const { path } = useContext(PathContext);
    const { index } = useContext(ListContext);

    const { ref } = useContext(GridPanelConext);

    const [metadata, setMetadata] = useState(null);

    if (!metadata) {
        return (
            <WidgetDataContext.Provider value={{ setMetadata }}>
                {children}
            </WidgetDataContext.Provider>
        );
    }

    const add = (id) => {
        const array = path.split('.');
        const last = array.pop();
        const parent = [...array, last.replace(/\[\d+]/g, '')].join('.');

        const previous = jsonpath.value(serialize, parent);

        const updatedLayout = [ ...serialize ];

        jsonpath.apply(updatedLayout, parent, () => [...previous, { content: id }]);

        setSerialize(updatedLayout);
    };

    const replace = (id) => {
        const component = getComponent(id);
        const updatedLayout = [ ...serialize ];

        jsonpath.apply(updatedLayout, `${path}[${index}]`, () => component);

        setSerialize(updatedLayout);
    };

    const remove = () => {
        const updatedLayout = [ ...serialize ];

        const array = path.split('.');
        const last = array.pop();
        const parent = [...array, last.replace(/\[\d+]/g, '')].join('.');

        const size = getSize(updatedLayout);

        if (size <= 1) {
            return;
        }

        const previous = jsonpath.value(serialize, parent);
        previous.splice(index, 1);

        if (previous.length < 1) {
            const array = path.split('.');

            array.pop();
            array.pop();

            const last = array.pop();
            const index = last.match(/\[(\d+)]/)[1];
            const parent = [...array, last.replace(/\[\d+]/g, '')].join('.');

            const updated = jsonpath.value(serialize, parent);
            updated.splice(index, 1);

            jsonpath.apply(updatedLayout, parent, () => updated);

            const root = updatedLayout[0];
            const first = root.row ?? root.column;

            if (first.length < 1) {
                return;
            }
        }

        jsonpath.apply(updatedLayout, parent, () => previous);

        setSerialize(updatedLayout);
    }

    const getSize = (item) => {
        let total = 0;

        item.forEach((data) => {
            const { row, column, child } = data;
            const current = row ?? column ?? child;

            if (!current) {
                return;
            }

            const filter = current.filter((item) => item.content);

            total += filter.length;

            total += getSize(current);
        })

        return total;
    }

    const collapse = () => {
        try {
            if (ref.current.isCollapsed()) {
                ref.current.expand();
            } else {
                ref.current.collapse();
            }
        } catch (error) {

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
