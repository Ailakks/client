import HeaderLayout from "../../view/HeaderLayout";
import AuthHeader from "./Header";

export default function AuthLayout({ children }) {
    return (
        <HeaderLayout header={<AuthHeader />}>
            {children}
        </HeaderLayout>
    )
}
