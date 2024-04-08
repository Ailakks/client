import FullLayout from "../../view/FullLayout";
import AppHead from "./Head";
import AppSide from "./Side";
import AppHeader from "./Header";

export default function AppLayout({ children }) {
    return (
        <FullLayout head={<AppHead />} header={<AppHeader />} side={<AppSide />}>
            {children}
        </FullLayout>
    )
}
