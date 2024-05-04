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
        <div className="flex items-center space-x-5">
            <h2 className="space-x-2 items-center text-nowrap">
                <a className="text-white" href="/">{translate("layout.header.name")}</a>
                <label className="main">Beta</label>
            </h2>
            <button>Layout</button>
        </div>
    )
}
