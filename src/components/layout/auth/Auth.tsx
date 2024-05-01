import FullLayout from "../../view/FullLayout";
import AppHead from "../app/Head";

export default function AuthLayout({ children }) {
    return (
        <FullLayout head={<AppHead />}>
            <div className="h-full p-5">
                {children}
            </div>
        </FullLayout>
    )
}
