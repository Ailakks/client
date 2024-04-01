import {ErrorBoundary, useErrorBoundary} from 'react-error-boundary';
import { useContext } from "react";
import { LanguageContext } from "../../wrapper/lang/LanguageWrapper";

export default function ErrorBoundaryWrapper({ children }) {
    return (
        <ErrorBoundary fallback={<Fallback />}>
            {children}
        </ErrorBoundary>
    );
}

function Fallback() {
    const { translate } = useContext(LanguageContext);

    const { resetBoundary } = useErrorBoundary();

    return (
        <div className="h-full flex flex-col justify-center items-center space-y-5">
            <p>{translate("error.fallback.title")}</p>
            <button className="main flex">
                <p>{translate("error.fallback.retry.label")}</p>
            </button>
        </div>
    );
}