import {createContext, useContext} from "react";
import {LayoutContext, WidgetsContext} from "../grid/GridView";
import {PathContext} from "../grid/GridRender";
import {ListContext} from "../../../list/List";
import Droppable from "../../../drop/Droppable";
import jsonpath from "jsonpath";
export const WidgetDroppableContext = createContext(null);

export default function WidgetDroppable({ children }) {
    const { layout, setLayout } = useContext(LayoutContext);
    const { widgets } = useContext(WidgetsContext);
    const { path } = useContext(PathContext);
    const { index } = useContext(ListContext);

    const add = (data) => {
        const newLayout = [...layout];

        const { border: { apply } } = data;

        const component = widgets[index];
        const thisPath = `${path}[${index}]`;
        const current = jsonpath.value(layout, thisPath);

        const replace = apply(current, component);

        jsonpath.apply(newLayout, thisPath, () => replace);

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
