import {createContext} from "react";
import { FlashList } from "@shopify/flash-list";

export const ListContext = createContext(null);

export default function List({ list, separator, children }) {
    return (
        <FlashList
            data={list}
            estimatedItemSize={200}
            renderItem={({ index, item }) => (
                <ListContext.Provider value={{ item, index }}>
                    {children}
                    {separator && key !== list.length - 1 && separator}
                </ListContext.Provider>
            )}
        />
    )
}