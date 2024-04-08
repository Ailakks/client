import {createContext, useContext, useState} from "react";
import {ListContext} from "../list/List";
import Tab from "../native/Tab";
import TabContent from "../native/TabContent";

export const IntegrationContext = createContext();

export default function Integration() {
    const [meta, setMeta] = useState();

    const { item } = useContext(ListContext);

    if (meta) {
        const { name } = meta;

        return (
            <IntegrationContext.Provider value={{ meta, setMeta }}>
                <Tab>
                    <p>{name}</p>
                    <TabContent>
                        {item}
                    </TabContent>
                </Tab>
            </IntegrationContext.Provider>
        )
    }

    return (
        <IntegrationContext.Provider value={{ meta, setMeta }}>
            {item}
        </IntegrationContext.Provider>
    );
}
