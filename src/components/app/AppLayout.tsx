import Layout from "../layout/Layout";
import Head from "../layout/Head";
import Header from "../layout/Header";
import Side from "../layout/Side";
import Footer from "../layout/Footer";

export default function AppLayout({ children }) {
    return (
        <Layout head={<Head />} header={<Header />} side={<Side />} footer={<Footer />}>
            {children}
        </Layout>
    )
}
