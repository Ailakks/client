import {createContext, useContext, useEffect, useRef, useState} from "react";
import List, {ListContext} from "../list/List";
import {QueryContext} from "../query/Query";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;

export const SelectedContext = createContext();

export default function ListView() {
    const [selected, setSelected] = useState([]);

    const { data: { getFolder: { files } } } = useContext(QueryContext);

    return (
        <SelectedContext.Provider value={{ selected, setSelected }}>
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
            <FileCheck />
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
    const checkRef = useRef();

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
        const status = selected.includes(item);

        checkRef.current.checked = status;
    }, [selected]);

    return (
        <input type="checkbox" ref={checkRef} onClick={toggle} />
    )
}
