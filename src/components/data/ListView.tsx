import {createContext, useContext, useEffect, useState} from "react";
import {clsx} from "clsx";
import List, {ListContext} from "../list/List";
import {QueryContext} from "../query/Query";
import Checkbox from "../input/Checkbox";
import ItemContext from "./list/ItemContextMenu";
import ItemTool from "./list/ItemTool";
import NewButton from "./list/NewButton";
import {Category, Scope, ScopesContext, ScopesDataContext} from "../context/Scopes";
import UploadZone from "../native/upload/UploadZone";

export const SelectedContext = createContext();

export default function ListView() {
    const [selected, setSelected] = useState([]);
    const [checked, setChecked] = useState(false);

    const { data: { getFolder: { files } } } = useContext(QueryContext);

    const toggleAll = () => {
        if (selected.length > 0) {
            setSelected([]);

            return false;
        }

        setSelected(files);
    }

    useEffect(() => {
        setChecked(selected.length === files.length);
    }, [selected]);

    return (
        <SelectedContext.Provider value={{ selected, setSelected }}>
            <div className="flex flex-col h-full">
                <div className="flex space-x-6 p-6 items-center justify-between">
                    <div>
                        <p>Drive</p>
                    </div>
                    <div className="flex space-x-6">
                        <div className="flex space-x-4 items-center">
                            <NewButton />
                            <UploadZone clickable>
                                <button className="main">
                                    <i className="fa-regular fa-arrow-up-from-bracket" />
                                    <p>Upload</p>
                                </button>
                            </UploadZone>
                        </div>
                        {
                            selected.length > 0 &&
                            <div className="flex space-x-4 items-center">
                                <p>{selected.length === 1 ? `${selected.length} item selected` : `${selected.length} items selected`}</p>
                                <button className="main flex items-center space-x-4">
                                    <i className="fa-regular fa-sparkles" />
                                    <p>Convert to Spreadsheet</p>
                                </button>
                                <Tool />
                            </div>
                        }
                    </div>
                </div>
                <div className="grow overflow-y-auto">
                    <UploadZone action={() => alert(1)}>
                        <table className="w-full text-white [&>*>*>*:first-child]:pl-5 [&>*>*>*:last-child]:pr-5">
                            <thead className="sticky top-0 h-14 bg-gray-900 shadow-[0px_1px] shadow-gray-300">
                            <tr className="text-left">
                                <th>
                                    <Checkbox status={checked} change={toggleAll} icon={selected.length > 0 && `fa-solid fa-hyphen`} />
                                </th>
                                <th />
                                <th>Name</th>
                                <th>Date</th>
                                <th>Size</th>
                                <th />
                            </tr>
                            </thead>
                            <tbody>
                            <List list={files}><Item /></List>
                            </tbody>
                        </table>
                    </UploadZone>
                </div>
            </div>
        </SelectedContext.Provider>
    )
}

function Tool() {
    const { selected } = useContext(SelectedContext);

    const massive = {
        [Category.VIEW]: {
            [Scope.DOWNLOAD]: {
                icon: 'fa-regular fa-arrow-down-to-bracket',
                name: 'Download'
            }
        },
        [Category.DELETE]: {
            [Scope.TRASH]: {
                icon: 'fa-regular fa-trash',
                name: 'Move to trash'
            },
        },
    };

    const { files } = useContext(ScopesContext);

    const item = selected.length > 1 ? selected : selected[0];

    return (
        <ScopesDataContext.Provider value={{ scopes: files, item }}>
            <ItemTool scopes={selected.length > 1 ? massive : files} />
        </ScopesDataContext.Provider>
    )
}

function Item() {
    const [checked, setChecked] = useState(false);

    const { item } = useContext(ListContext);
    const { files } = useContext(ScopesContext);
    const { name, date, source: { meta: { size } } } = item;

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

    return (
        <tr className={clsx(checked && '!bg-blue-900', 'h-14 hover:bg-gray-700')} onClick={select}>
            <td>
                <Check checked={checked} add={add} />
            </td>
            <td>
                <i className="fa-solid fa-file" />
            </td>
            <td className="cursor-pointer" onClick={() => files[Category.VIEW][Scope.VIEW].action(files, item)}>{name}</td>
            <td>{date}</td>
            <td>{size}</td>
            <td className="w-0">
                <Options />
            </td>
        </tr>
    )
}

function Check({ checked, add }) {
    return (
        <Checkbox status={checked} change={add} />
    )
}

function Options() {
    return (
        <ItemContext>
            <button className="menu">
                <i className="fa-regular fa-ellipsis-vertical" />
            </button>
        </ItemContext>
    )
}
