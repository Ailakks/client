import {Route, Routes, useLocation} from "react-router-dom";
import Layout from "./components/view/Layout";
import Head from "./components/view/Head";
import Header from "./components/view/Header";
import Side from "./components/view/Side";
import Home from "./components/page/Home";

export default function App() {
    const location = useLocation();

    return (
        <Layout head={<Head />} side={<Side />} header={<Header />}>
            <Routes location={location}>
                <Route path="/" element={<Home />} />
            </Routes>
        </Layout>
    )
}
