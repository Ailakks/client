import {useContext} from "react";
import {TrackContext} from "./wrapper/Track";

export function PlayerData() {
    const { current: { name } } = useContext(TrackContext);

    return (
        <div>
            <p>{name}</p>
        </div>
    )
}
