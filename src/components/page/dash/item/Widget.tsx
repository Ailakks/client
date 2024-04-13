import {createContext, useContext, useState} from "react";
import jsonpath from "jsonpath";
import {LayoutContext, WidgetsContext} from "../grid/GridView";
import {PathContext} from "../grid/GridRender";
import {GridProviderContext} from "../GridProvider";
import {ListContext} from "../../../list/List";
import Window from "./Window";

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
        let updatedLayout = [ ...layout ];

        const current = jsonpath.value(updatedLayout, path);
        current.splice(index, 1);

        const parent = jsonpath.value(updatedLayout, up(path));
        const flush = current.filter(({ row, column }) => (row ?? column).length > 0);
        jsonpath.apply(updatedLayout, path, () => flush);

        const root = updatedLayout[0].row ?? updatedLayout[0].column;

        if (root.length <= 1) {
            return;
        }

        setLayout(updatedLayout);
    };

    const up = (path) => {
        const array = path.split('.');

        array.pop();

        const last = array.pop();
        //const index = last.match(/\[(\d+)]/)[1];
        return [...array, last.replace(/\[\d+]/g, '')].join('.');
    }

    const sanitize = (array) => {
        return array.reduce((result, item) => {
            if (Array.isArray(item) && item.length === 1) {
                return result.concat(Array.isArray(item[0]) ? item[0] : item);
            }
            return result.concat(item);
        }, []);
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
