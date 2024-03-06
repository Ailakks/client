import {createContext, useContext, useEffect, useState} from "react";
import List, {ListContext} from "../list/List";
import {QueryContext} from "../query/Query";
import Checkbox from "../input/Checkbox";
import ItemContext from "./ItemContext";

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
            <div className="space-y-6">
                <div className="flex space-x-6 h-12 p-6 items-center justify-between">
                    <div>
                        <p>Drive</p>
                    </div>
                    <div className="flex space-x-6">
                        <div className="flex space-x-4 items-center">
                            <button className="main">New folder</button>
                            <button className="main">Upload</button>
                        </div>
                        {
                            selected.length > 0 &&
                            <div className="flex space-x-4 items-center">
                                {selected.length > 1 && <p>{selected.length} items selected</p>}
                                <div>
                                    <i className="fa-regular fa-trash text-white" />
                                </div>
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
                            <th>Name</th>
                            <th>Date</th>
                            <th>Size</th>
                            <th>Options</th>
                        </tr>
                        <List list={files}><Item /></List>
                        </tbody>
                    </table>
                </div>
            </div>
        </SelectedContext.Provider>
    )
}

function Item() {
    const { item } = useContext(ListContext);
    const { name, date, source: { meta: { size } } } = item;

    const { setSelected } = useContext(SelectedContext);

    const select = () => {
        setSelected([item]);
    }

    return (
        <tr className="h-14 hover:bg-gray-700">
            <td>
                <Check />
            </td>
            <td onClick={select}>{name}</td>
            <td>{date}</td>
            <td>{size}</td>
            <td>
                <Options />
            </td>
        </tr>
    )
}

function Check() {
    const [checked, setChecked] = useState(false);

    const { item } = useContext(ListContext);
    const { selected, setSelected } = useContext(SelectedContext);

    const add = (status) => {
        if (status) {
            setSelected((previous) => [...previous, item]);

            return;
        }

        setSelected((previous) => previous.filter((target) => target != item));
    }

    useEffect(() => {
        setChecked(selected.includes(item));
    }, [selected])

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
