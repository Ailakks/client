import AuthHead from "./Head";
import FullLayout from "../../view/FullLayout";

export default function AuthLayout({ children }) {
    return (
        <FullLayout head={<AuthHead />}>
            {children}
        </FullLayout>
    )
}
