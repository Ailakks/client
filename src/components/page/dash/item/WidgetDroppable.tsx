import {createContext, useContext} from "react";
import {LayoutContext} from "../grid/GridView";
import {PathContext} from "../grid/GridRender";
import Droppable from "../../../drop/Droppable";
import jsonpath from "jsonpath";

export const WidgetDroppableContext = createContext(null);

export default function WidgetDroppable({ children }) {
    const { layout, setLayout } = useContext(LayoutContext);
    const { path } = useContext(PathContext);

    const add = (data) => {
        const newLayout = [...layout];

        const { item: { id }, border: { type, order } } = data;

        const array = path.split('.');
        const last = array.pop();
        const index = last.match(/\[(\d+)]/)[1];
        const lastType = last.replace(/\[\d+]/g, '');
        const parent = [...array, lastType].join('.');

        const current = jsonpath.value(layout, path);

        if (type === lastType) {
            const parentData = jsonpath.value(layout, parent);
            parentData.splice(order < 1 ? index : index + 1, 0, { content: id })

            jsonpath.apply(newLayout, parent, () => parentData);
        } else {
            jsonpath.apply(newLayout, path, () => ({ child: [{ [type]: [current, { content: id }] }] }));
        }

        setLayout(newLayout);
    }

    return (
        <WidgetDroppableContext.Provider value={{ children }}>
            <Droppable action={add}>
                {children}
            </Droppable>
        </WidgetDroppableContext.Provider>
    )
}
