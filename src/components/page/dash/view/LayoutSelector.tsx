import {useContext, useEffect} from "react";
import {HeaderContext} from "../../../layout/dash/Dash";
import {LanguageContext} from "../../../../wrapper/lang/LanguageWrapper";


export default function LayoutSelector() {
    const { setHeader } = useContext(HeaderContext);

    useEffect(() => {
        setHeader(<Body />);
    }, []);
}

function Body() {
    const { translate } = useContext(LanguageContext);

    return (
        <h2 className="text-nowrap">
            <a className="text-white" href="/">{translate("layout.header.name")}</a>
        </h2>
    )
}
