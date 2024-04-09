import {createContext, Fragment, isValidElement} from "react";
import {GridViewContext} from "../page/dash/view/GridRender";

export const ListContext = createContext(null);

export default function List({ list, children }) {
    let key = -1;

    return list.map((item, index) => {
        if (isValidElement(item)) {
            key++;
        }

        return (
            <Fragment key={index}>
                <ListContext.Provider value={{ list, key, index, item }}>
                    {children}
                </ListContext.Provider>
            </Fragment>
        );
    });
}