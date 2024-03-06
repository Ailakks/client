import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import ContextMenu from "../../context/ContextMenu";

export default function NewButton() {

    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <button className="main flex items-center space-x-4">
                    <i className="fa-regular fa-plus" />
                    <p>New</p>
                </button>
            </PopoverTrigger>
            <PopoverContent>
            </PopoverContent>
        </Popover>
    )
}
