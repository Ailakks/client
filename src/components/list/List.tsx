import {createContext, Fragment} from "react";

export const ListContext = createContext(null);

export default function List({ list, children }) {
    return list.map((item, key) =>
        <Fragment key={key}>
            <ListContext.Provider value={{ item, key }}>
                {children}
            </ListContext.Provider>
        </Fragment>
    )
}
