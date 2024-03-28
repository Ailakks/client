import {useContext} from "react";
import {LanguageContext} from "../../../../wrapper/lang/LanguageWrapper";
import ContextMenu from "../../../context/ContextMenu";
import {ListContext} from "../../../list/List";
import {clsx} from "clsx";

export default function Language() {
    const { locales } = useContext(LanguageContext);

    return (
        <ContextMenu list={locales} content={<Item />}>
            <button className="menu">
                <i className="fa-regular fa-globe" />
            </button>
        </ContextMenu>
    )
}

function Item() {
    const { language, translate } = useContext(LanguageContext);

    const { item } = useContext(ListContext);
    const { id, icon, action } = item;

    return (
        <div className="flex items-center justify-between text-white px-4 py-2 cursor-pointer hover:bg-gray-300" onClick={() => action(item)}>
            <div className="flex items-center space-x-2">
                <i className={clsx('w-6', icon)}/>
                <p>{translate(`layout.header.language.context.${id}`)}</p>
            </div>
            {language === id && <i className="fa-regular fa-check"/>}
        </div>
    )
}