import {createContext, useContext, useState} from "react";
import {ListContext} from "../list/List";
import {Tab} from "@nextui-org/react";
import FilePreview from "../item/FilePreview";

export const MetaContext = createContext();

export default function Integration() {
    const { item } = useContext(ListContext);

    const [meta, setMeta] = useState(null);

    if (meta) {
        const { id, name } = meta;

        return (
            <Tab key={id} title={name}>
                <FilePreview />
            </Tab>
        )
    }

    return (
        <MetaContext.Provider value={{ setMeta }}>
            {item}
        </MetaContext.Provider>
    )
}
