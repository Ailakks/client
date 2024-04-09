import {useContext, useState} from "react";
import jsonpath from "jsonpath";
import {LayoutContext, WidgetsContext} from "../view/GridView";
import {PathContext} from "../view/GridRender";
import {GridProviderContext} from "../GridProvider";
import {ListContext} from "../../../list/List";

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

    const { name } = metadata;

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

        if (!current) {
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
    };

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
            {!collapsed && children}
        </WidgetsContext.Provider>
    )
}
