import {createContext, Fragment} from "react";

export const ListContext = createContext(null);

export default function List({ list, children }) {
    return list.map((item, key) =>
        <Fragment key={key}>
            <ListContext.Provider value={{ list, item, key }}>
                {typeof children === "function" ? children(list, item, key) : children}
            </ListContext.Provider>
        </Fragment>
    )
}
