import {createContext, useContext, useEffect, useState} from "react";
import List, {ListContext} from "../list/List";
import {QueryContext} from "../query/Query";

export const SelectedContext = createContext();

export default function ListView() {
    const [selected, setSelected] = useState([]);
    const [checked, setChecked] = useState(false);

    const { data: { getFolder: { files } } } = useContext(QueryContext);

    const toggleAll = (event) => {
        event.preventDefault();

        if (selected.length == files.length) {
            setSelected([]);

            return;
        }

        setSelected(files);
    }

    useEffect(() => {
        setChecked(selected.length === files.length);
    }, [selected])

    return (
        <SelectedContext.Provider value={{ selected, setSelected }}>
            <div className="flex space-x-6">
                <input type="checkbox" checked={checked} onChange={toggleAll} />
                <p>{selected.length} items selected.</p>
            </div>
            <table className="w-full text-white">
                <tbody>
                <tr className="text-left">
                    <th />
                    <th>Name</th>
                    <th>Date</th>
                    <th>Size</th>
                    <th>Options</th>
                </tr>
                <List list={files}><FileItem /></List>
                </tbody>
            </table>
        </SelectedContext.Provider>
    )
}

function FileItem() {
    const { item: { name, date, source: { meta: { size } } } } = useContext(ListContext);

    return (
        <tr>
            <td>
                <FileCheck />
            </td>
            <td>{name}</td>
            <td>{date}</td>
            <td>{size}</td>
            <td>
                <div className="flex space-x-5">
                    <i className="fa-regular fa-trash" />
                </div>
            </td>
        </tr>
    )
}

function FileCheck() {
    const [checked, setChecked] = useState(false);

    const { item } = useContext(ListContext);

    const { selected, setSelected } = useContext(SelectedContext);

    const toggle = (event) => {
        event.preventDefault();

        const status = event.target.checked;

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
        <input type="checkbox" checked={checked} onChange={toggle} />
    )
}
