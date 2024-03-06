import {useContext} from "react";
import {ScopesContext} from "../context/Scopes";
import ItemTool from "../data/list/ItemTool";

export default function FilePopup() {
    const { files } = useContext(ScopesContext)

    return (
        <div className="flex justify-center">
            <ItemTool scopes={files} />
        </div>
    )
}
