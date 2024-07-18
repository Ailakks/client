import {useContext} from "react";
import {clsx} from "clsx";
import {LanguageContext} from "../wrapper/header/LanguageMenu";
import ContextMenu from "../context/ContextMenu";
import {ListContext} from "../list/List";

export default function Language() {
    const { translate, locales } = useContext(LanguageContext);

    return (
        <ContextMenu list={locales} content={<Item />}>
            <button className="secondary rounded inline">
                <i className="fa-regular fa-globe"/>
                <p>{translate("layout.header.language.label")}</p>
            </button>
        </ContextMenu>
    )
}

function Item() {
    const { language, translate, set } = useContext(LanguageContext);

    const { item } = useContext(ListContext);
    const { id, icon } = item;

    return (
        <button className="context_item" onClick={() => set(item)}>
            <div className="flex items-center space-x-2">
                <i className={clsx('w-6', icon)}/>
                <p>{translate(`layout.header.language.context.${id}`)}</p>
            </div>
            {language === id && <i className="fa-regular fa-check"/>}
        </button>
    )
}
