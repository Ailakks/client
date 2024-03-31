import {createContext, Fragment, useContext, useEffect, useState} from "react";
import {clsx} from "clsx";
import List, {ListContext} from "../list/List";
import {QueryContext} from "../query/Query";
import Checkbox from "../input/Checkbox";
import ItemContext from "./list/ItemContextMenu";
import ItemTool from "./list/ItemTool";
import NewButton from "./list/NewButton";
import {Category, Scope, ScopesContext, ScopesDataContext} from "../context/Scopes";
import UploadZone from "../native/upload/UploadZone";
import NoContentFallback from "../page/fallback/NoContentFallback";
import Moment from "../parse/Moment";
import Size from "../parse/Size";
import {LanguageContext} from "../../wrapper/lang/LanguageWrapper";

export const SelectedContext = createContext();
export const ItemMenuContext = createContext();

export default function ListView() {
    const { translate } = useContext(LanguageContext);

    const [selected, setSelected] = useState([]);

    return (
        <SelectedContext.Provider value={{ selected, setSelected }}>
            <div className="flex flex-col h-full space-y-5">
                <div className="flex space-x-6 items-center justify-between p-5">
                    <div>
                        <p>{translate("folder.path.title")}</p>
                    </div>
                    <div className="flex space-x-6">
                        <div className="flex space-x-4 items-center">
                            <NewButton/>
                            <UploadZone clickable>
                                <button className="main icon">
                                    <i className="fa-regular fa-arrow-up-from-bracket"/>
                                    <p>{translate("folder.tool.upload.label")}</p>
                                </button>
                            </UploadZone>
                        </div>
                        {
                            selected.length > 0 &&
                            <div className="flex space-x-4 items-center">
                                <p>{selected.length === 1 ? translate("folder.tool.status.selected.singular", `${selected.length}`) : translate("folder.tool.status.selected.plural", `${selected.length}`)}</p>
                                <button className="main flex items-center space-x-4">
                                    <i className="fa-regular fa-sparkles"/>
                                    <p>{translate("folder.tool.export.label")}</p>
                                </button>
                                <Tool/>
                            </div>
                        }
                    </div>
                </div>
                <div className="grow overflow-y-auto p-5">
                    <UploadZone action={() => alert(1)}>
                        <Content />
                    </UploadZone>
                </div>
            </div>
        </SelectedContext.Provider>
    )
}

function Content() {
    const { translate } = useContext(LanguageContext);

    const { data: { getFolder: { files, folders} } } = useContext(QueryContext);

    const { selected, setSelected } = useContext(SelectedContext);

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(selected.length === files.length);
    }, [selected]);

    const toggleAll = () => {
        if (selected.length > 0) {
            setSelected([]);

            return false;
        }

        setSelected(files);
    };

    if (files.length < 1 && folders.length < 1) {
        return (
            <NoContentFallback />
        )
    }

    return (
        <table className="w-full text-white [&>*>*>*:first-child]:pl-5 [&>*>*>*:last-child]:pr-5">
            <thead className="sticky top-0 h-14 bg-gray-900 shadow-[0px_1px] shadow-gray-300">
            <tr className="text-left">
                <th>
                    <Checkbox status={checked} change={toggleAll} icon={selected.length > 0 && `fa-solid fa-hyphen`}/>
                </th>
                <th/>
                <th>{translate("folder.table.head.name")}</th>
                <th>{translate("folder.table.head.date")}</th>
                <th>{translate("folder.table.head.size")}</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            <List list={folders}><Item/></List>
            <List list={files}><Item/></List>
            </tbody>
        </table>
    )
}

function Tool() {
    const { selected } = useContext(SelectedContext);

    const { files, folders, massive } = useContext(ScopesContext);

    const scopes = selected.length > 1 ? massive : (selected[0].__typename === "Folder" ? folders : files);
    const item = selected[0];

    return (
        <ScopesDataContext.Provider value={{ scopes, selected, item }}>
            <ItemTool scopes={scopes} />
        </ScopesDataContext.Provider>
    )
}

function Item() {
    const [checked, setChecked] = useState(false);

    const { item } = useContext(ListContext);

    const { selected, setSelected } = useContext(SelectedContext);

    useEffect(() => {
        setChecked(selected.includes(item));
    }, [selected])

    const select = () => {
        setSelected([item]);
    }

    const add = (status) => {
        if (status) {
            setSelected((previous) => [...previous, item]);

            return;
        }

        setSelected((previous) => previous.filter((target) => target != item));
    }

    const {__typename} = item;

    return (
        <tr className={clsx(checked && '!bg-blue-900', 'h-14 hover:bg-gray-700')} onClick={select}>
            <td>
                <Checkbox status={checked} change={add}/>
            </td>
            {__typename === "Folder" ? <Folder/> : <File/>}
        </tr>
    )
}

function Folder() {
    const { item } = useContext(ListContext);
    const { name, date } = item;

    const { folders } = useContext(ScopesContext);

    return (
        <Fragment>
            <td>
                <i className="fa-solid fa-folder"/>
            </td>
            <td className="cursor-pointer"
                onClick={() => folders[Category.VIEW][Scope.VIEW].action(null, item)}>{name}</td>
            <td>
                <Moment>{date}</Moment>
            </td>
            <td>—</td>
            <td className="w-0">
                <ItemMenuContext.Provider value={folders}>
                    <Options/>
                </ItemMenuContext.Provider>
            </td>
        </Fragment>
    )
}

function File() {
    const { item } = useContext(ListContext);
    const { name, date, source: { meta: { size } } } = item;

    const { files } = useContext(ScopesContext);

    return (
        <Fragment>
            <td>
                <i className="fa-solid fa-file"/>
            </td>
            <td className="cursor-pointer" onClick={() => files[Category.VIEW][Scope.VIEW].action(files, item)}>{name}</td>
            <td>
                <Moment>{date}</Moment>
            </td>
            <td>
                <Size>{size}</Size>
            </td>
            <td className="w-0">
                <ItemMenuContext.Provider value={files}>
                    <Options/>
                </ItemMenuContext.Provider>
            </td>
        </Fragment>
    )
}

function Options() {
    return (
        <ItemContext>
            <button className="menu">
                <i className="fa-regular fa-ellipsis-vertical"/>
            </button>
        </ItemContext>
    )
}
