import {createContext, useContext} from "react";
import {LayoutContext} from "../grid/GridView";
import {PathContext} from "../grid/GridRender";
import Droppable from "../../../drop/Droppable";
import jsonpath from "jsonpath";
import {GridProviderContext} from "../GridProvider";

export const WidgetDroppableContext = createContext(null);

export default function WidgetDroppable({ children }) {
    const { layout, setLayout } = useContext(LayoutContext);
    const { path } = useContext(PathContext);

    const { list, widgets } = useContext(GridProviderContext);

    const add = (data) => {
        const newLayout = [...layout];

        const { item: { id }, border: { type } } = data;

        const current = jsonpath.value(layout, path);

        jsonpath.apply(newLayout, path, () => [{ [type]: [...current, id] }]);

        setLayout(newLayout);
    }

    const getComponent = (id) => {
        return list[widgets.map(({ id }) => id).indexOf(id)];
    };

    return (
        <WidgetDroppableContext.Provider value={{ children }}>
            <Droppable action={add}>
                {children}
            </Droppable>
        </WidgetDroppableContext.Provider>
    )
}
