import {createContext, Fragment, isValidElement, useContext, useRef, useState} from "react";
import jsonpath from "jsonpath";
import {LayoutContext} from "./GridView";


export const PathContext = createContext(null);
export const GridViewContext = createContext(null);

export default function GridRender() {
    const { layout } = useContext(LayoutContext);
    const { path } = useContext(PathContext) ?? { path: "$" };

    const next = jsonpath.value(layout, path);

    return (
        <List list={next} component={<Element />} />
    )
}

function List({ list, component }) {
    let key = -1;

    return list.map((item, index) => {
        if (isValidElement(item)) {
            key++;
        }

        return (
            <Fragment key={index}>
                <GridViewContext.Provider value={{ data, key, index }}>
                    {component}
                </GridViewContext.Provider>
            </Fragment>
        );
    });
}

function Element() {
    const { layout } = useContext(LayoutContext);
    const { path } = useContext(PathContext) ?? { path: "$" };
    const { index } = useContext(GridViewContext);

    const child = `${path}[${index}]`;

    const next = jsonpath.value(layout, child);
    const isValid = isValidElement(next);

    const panelRef = useRef<ImperativePanelHandle>(null);

    const [collapsed, setCollapsed] = useState(false);

    if (isValid) {
        return (
            <GridResizePanel innerRef={panelRef} onCollapse={() => setCollapsed(true)} onExpand={() => setCollapsed(false)}>
                <Widget panelRef={panelRef} collapsed={collapsed}>
                    {next}
                </Widget>
            </GridResizePanel>
        );
    }

    function render(path, isRow) {
        const newPath = [path, isRow ? "row" : "column"].join('.');

        const array = path.split('.');
        const isRoot = array.length === 1;

        if (isRoot) {
            return (
                <PathContext.Provider value={{ path: newPath }}>
                    <GridResizeGroup direction={isRow ? "vertical" : "horizontal"}>
                        <GridRender />
                    </GridResizeGroup>
                </PathContext.Provider>
            );
        }

        return (
            <PathContext.Provider value={{ path: newPath }}>
                <GridResizePanel>
                    <GridResizeGroup direction={isRow ? "vertical" : "horizontal"}>
                        <GridRender />
                    </GridResizeGroup>
                </GridResizePanel>
            </PathContext.Provider>
        );
    }

    return render(child, next.row);
}
