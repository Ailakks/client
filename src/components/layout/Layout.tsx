import Head from "./Head";
import Header from "./Header";
import {createContext, useState} from "react";
import Footer from "./Footer";

export const LayoutContext = createContext();

export default function Layout({ children }) {
    const [side, setSide] = useState();

    return (
        <LayoutContext.Provider value={{side, setSide}}>
            <div className="h-full flex flex-col mx-auto max-w-screen-2xl">
                <div className="flex h-20 shrink-0">
                    <div className="flex w-64 shrink-0 items-center">
                        <Head />
                    </div>
                    <div className="w-full">
                        <Header />
                    </div>
                </div>
                <div className="grow flex overflow-x-hidden overflow-y-auto">
                    {side && <aside className="w-64 p-5">
                        {side}
                    </aside>}
                    <main className="grow">
                        {children}
                    </main>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </LayoutContext.Provider>
    )
}
