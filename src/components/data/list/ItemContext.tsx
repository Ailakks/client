import {useContext, useEffect, useRef} from "react";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import {ScopesContext} from "../../context/Scopes";
import ContextMenu from "../../context/ContextMenu";
import {PopupContext} from "../../../wrapper/ui/PopupProvider";

export default function ItemContext({ children }) {
    const popover = useRef();

    const { popup } = useContext(PopupContext);
    const { files } = useContext(ScopesContext);

    useEffect(() => {
        console.log(1)
        popover.current?.blur();
    }, [popup]);

    return (
        <Popover triggerRef={popover} placement="bottom" shouldCloseOnBlur={true}>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>
            <PopoverContent>
                <ContextMenu list={Object.values(files)} />
            </PopoverContent>
        </Popover>
    )
}
