import List, {ListContext} from "../list/List";
import {useContext} from "react";
import {QueryContext} from "../query/Query";

export default function ListView() {
    const { data: { getFolder: { files } } } = useContext(QueryContext);

    return (
        <table>
            <tbody>
                <tr>
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
    const { item: { name } } = useContext(ListContext);

    return (
        <tr>
            <td>{name}</td>
        </tr>
    )
}
