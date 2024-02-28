import List, {ListContext} from "../list/List";
import {useContext} from "react";
import {QueryContext} from "../query/Query";

export default function ListView() {
    const { data: { getFolder: { files } } } = useContext(QueryContext);

    return (
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
    const { item } = useContext(ListContext);

    const toggle = (event) => {
        const status = event.target.checked;
    }

    return (
        <input type="checkbox" onClick={toggle} />
    )
}
