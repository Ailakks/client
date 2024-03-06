import {useContext} from "react";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import {ScopesContext} from "../../context/Scopes";
import ContextMenu from "../../context/ContextMenu";

export default function ItemContext({ children }) {
    const { files } = useContext(ScopesContext)

    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent>
                <ContextMenu list={Object.values(files)} />
            </PopoverContent>
        </Popover>
    )
}
