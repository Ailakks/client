import {useContext} from "react";
import {ScopesContext} from "../context/Scopes";
import List, {ListContext} from "../list/List";

export default function ToolList() {
    const { files } = useContext(ScopesContext);

    return (
        <div>
            <List list={Object.values(files)}><Category /></List>
        </div>
    )
}

function Category() {
    const { item } = useContext(ListContext);

    return (
        <div>
            <List list={Object.values(item)}><Item /></List>
        </div>
    )
}

function Item() {
    const { item: { icon } } = useContext(ListContext);

    return (
        <div>
            <i className={icon} />
        </div>
    )
}
