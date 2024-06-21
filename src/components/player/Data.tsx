import {useContext} from "react";
import {PlayerContext} from "../wrapper/player/Player";

export function PlayerData() {
    const { track: { name, album: { image: { url } } } } = useContext(PlayerContext);

    return (
        <div className="flex space-x-2 items-center">
            <img className="h-20" alt={name} src={url} />
            <p>{name}</p>
        </div>
    )
}
