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

        const current = jsonpath.value(layout, path);

        const array = path.split('.');
        const last = array.pop();
        const lastType = last.replace(/\[\d+]/g, '');
        const parent = [...array, lastType].join('.');

        const parentData = jsonpath.value(layout, parent);

        if (type === lastType && order < 1) {
            jsonpath.apply(newLayout, parent, () => [{ content: id }, ...parentData]);
        } else if (type === lastType) {
            jsonpath.apply(newLayout, parent, () => [...parentData, { content: id }]);
        } else if (order < 1) {
            jsonpath.apply(newLayout, path, () => ({ child: [{ [type]: [{ content: id }, current] }] }));
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
