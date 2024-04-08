import {useContext} from "react";
import Folder from "../data/Folder";
import VaultWrapper, {VaultContext} from "../../wrapper/logged/Vault";

export default function Trash() {
    return (
        <VaultWrapper>
            <Body />
        </VaultWrapper>
    );
}

function Body() {
    const { data: { getMainVault: { root: { id } } } } = useContext(VaultContext);

    return (
        <Folder id={id} query={{ filter: { removed: true } }} />
    )
}
