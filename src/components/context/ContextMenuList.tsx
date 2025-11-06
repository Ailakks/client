import List from "../list/List";
import {useState} from "react";


export default function ContextMenu({ list, children }) {
    const [open, setOpen] = useState(false);

    return (
        <ContextMenu list={<List list={Object.values(list)}><Category /></List>}>
            {children}
        </ContextMenu>
    )
}
