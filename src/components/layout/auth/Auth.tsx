import AuthHead from "./Head";
import FullLayout from "../../view/FullLayout";
import AppHeader from "../app/Header";

export default function AuthLayout({ children }) {
    return (
        <FullLayout head={<AuthHead />} header={<AppHeader />}>
            {children}
        </FullLayout>
    )
}
