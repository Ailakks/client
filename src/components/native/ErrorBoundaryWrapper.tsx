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
            <p>{translate("fallback.error.title")}</p>
            <button onClick={resetBoundary} className="main inline rounded">
                <i className="fa-regular fa-arrows-rotate" />
                <p>{translate("fallback.error.retry.label")}</p>
            </button>
        </div>
    );
}