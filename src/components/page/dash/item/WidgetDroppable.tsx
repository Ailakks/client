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

        const { item: { id }, border: { type } } = data;

        const current = jsonpath.value(layout, path);

        jsonpath.apply(newLayout, path, () => [{ child: [{ [type]: [...current, { content: id }] }] }]);

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
