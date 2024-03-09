import React, {createContext, useState} from "react";

export const TabsContext = createContext();

export default function Tabs({ children }) {
    return children;
}
