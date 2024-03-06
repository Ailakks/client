import {createContext, useContext, useEffect, useState} from "react";
import List, {ListContext} from "../list/List";
import {QueryContext} from "../query/Query";
import Checkbox from "../input/Checkbox";
import ItemContext from "./list/ItemContext";
import ItemTool from "./list/ItemTool";
import NewButton from "./list/NewButton";
import {ScopesContext} from "../context/Scopes";
import {clsx} from "clsx";

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
    }, [selected])

    return (
        <SelectedContext.Provider value={{ selected, setSelected }}>
            <div>
                <div className="flex space-x-6 p-6 items-center justify-between">
                    <div>
                        <p>Drive</p>
                    </div>
                    <div className="flex space-x-6">
                        <div className="flex space-x-4 items-center">
                            <NewButton />
                            <button className="main flex items-center space-x-4">
                                <i className="fa-regular fa-arrow-up-from-bracket" />
                                <p>Upload</p>
                            </button>
                        </div>
                        {
                            selected.length > 0 &&
                            <div className="flex space-x-4 items-center">
                                <p>{selected.length === 1 ? `${selected.length} item selected` : `${selected.length} items selected`}</p>
                                <Tool size={selected.length} />
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <table className="w-full text-white [&>*>*>*:first-child]:pl-5 [&>*>*>*:last-child]:pr-5">
                        <tbody>
                        <tr className="text-left">
                            <th>
                                <Checkbox status={checked} change={toggleAll} icon={selected.length > 0 && `fa-solid fa-hyphen`} />
                            </th>
                            <th />
                            <th>Name</th>
                            <th>Date</th>
                            <th>Size</th>
                        </tr>
                        <List list={files}><Item /></List>
                        </tbody>
                    </table>
                </div>
            </div>
        </SelectedContext.Provider>
    )
}

function Tool({ size }) {
    const { massive, files } = useContext(ScopesContext);

    return (
        size > 1 ? <ItemTool scopes={massive} /> : <ItemTool scopes={files} />
    )
}

function Item() {
    const [checked, setChecked] = useState(false);

    const { item } = useContext(ListContext);
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
        <tr className={clsx(checked && '!bg-blue-900', 'h-14 hover:bg-gray-700')}>
            <td>
                <Check checked={checked} add={add} />
            </td>
            <td>
                <i className="fa-solid fa-file" />
            </td>
            <td onClick={select}>{name}</td>
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
