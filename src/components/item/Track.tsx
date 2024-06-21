import {useContext} from "react";
import {PlayerContext} from "../wrapper/player/Player";

export function Track({ app, track }) {
    const { setApp, setTrack } = useContext(PlayerContext);

    const { name, album: { image: { url } } } = track;

    const set = () => {
        setApp(app);
        setTrack(track);
    };

    return (
        <div className="flex space-x-4 items-center cursor-pointer" onClick={set}>
            <img className="h-14 rounded-md" alt={name} src={url} />
            <p>{name}</p>
        </div>
    )
}
