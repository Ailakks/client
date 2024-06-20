import {useContext} from "react";
import {PlayerTrackContext} from "./wrapper/Track";

export function PlayerData() {
    const { current: { name } } = useContext(PlayerTrackContext);

    return (
        <div>
            <p>{name}</p>
        </div>
    )
}
