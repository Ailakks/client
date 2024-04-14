import {createContext, useState} from "react";
import {WidgetDataContext} from "./item/Widget";

export const GridProviderContext = createContext(null);

export default function GridProvider({ list, children }) {
    const [widgets, setWidgets] = useState([]);

    const setMetadata = (metadata) => {
        setWidgets(previous => [...previous, metadata]);
    }

    if (!list) {
        return null;
    }

    if (widgets >= list) {
        return (
            <GridProviderContext.Provider value={{ list, widgets }}>
                {children}
            </GridProviderContext.Provider>
        )
    }

    return list.map((component, index) => (
        <WidgetDataContext.Provider key={index} value={{ setMetadata }}>
            {component}
        </WidgetDataContext.Provider>
    ))
}
