import {createContext, useState} from "react";
import {WidgetDataContext} from "./item/Widget";

export const GridProviderContext = createContext(null);

export default function GridProvider({ list, children }) {
    const [widgetList, setWidgetList] = useState([]);

    const setMetadata = (metadata) => {
        setWidgetList(previous => [...previous, metadata]);
    }

    if (!list) {
        return null;
    }

    if (widgetList >= list) {
        return (
            <GridProviderContext.Provider value={{ widgetList }}>
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
