import Layout from "../../view/Layout";
import AppHead from "./Head";
import AppSide from "./Side";
import AppHeader from "./Header";

export default function AppLayout({ children }) {
    return (
        <Layout head={<AppHead />} header={<AppHeader />} side={<AppSide />}>
            {children}
        </Layout>
    )
}
