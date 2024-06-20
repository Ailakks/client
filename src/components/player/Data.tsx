import {useContext} from "react";
import {PlayerContext} from "./Context";

export function PlayerData() {
    const { current: { track: { name } } } = useContext(PlayerContext);

    return (
        <div>
            <p>{name}</p>
        </div>
    )
}
