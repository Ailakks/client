import {createContext, Fragment, isValidElement} from "react";

export const ListContext = createContext(null);

export default function List({ list, separator, fallback, children }) {
    let key = -1;

    if (list.length < 1) {
        return fallback;
    }

    return list.map((item, index) => {
        if (isValidElement(item)) {
            key++;
        }

        return (
            <Fragment key={index}>
                <ListContext.Provider value={{ list, key, index, item }}>
                    {children}
                    {separator && key !== list.length - 1 && separator}
                </ListContext.Provider>
            </Fragment>
        );
    });
}