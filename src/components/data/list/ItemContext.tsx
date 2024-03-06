import {useContext, useState} from "react";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import {ScopesContext} from "../../context/Scopes";
import ContextMenu from "../../context/ContextMenu";

export default function ItemContext({ children }) {
    const [open, setOpen] = useState(false);

    const { files } = useContext(ScopesContext);

    return (
        <Popover isOpen={open} onOpenChange={status => setOpen(status)} onClick={() => setOpen(false)} placement="bottom" shouldCloseOnBlur={true}>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent>
                <ContextMenu list={Object.values(files)} />
            </PopoverContent>
        </Popover>
    )
}
