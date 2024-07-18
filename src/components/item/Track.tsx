import {useContext} from "react";
import {PlayerContext} from "../wrapper/player/Player";
import List, {ListContext} from "../list/List";

export function Track({ app, track }) {
    const { setApp, setTrack } = useContext(PlayerContext);

    const { name, album: { image: { url } }, artists } = track;

    const set = () => {
        setApp(app);
        setTrack(track);
    };

    return (
        <tr className="flex space-x-4 items-center cursor-pointer" onClick={set}>
            <td>
                <img className="h-14 rounded-md" alt={name} src={url}/>
            </td>
            <td>
                <p>{name}</p>
                <p>
                    <List list={artists}>
                        <Artist/>
                    </List>
                </p>
            </td>
        </tr>
    )
}

function Artist() {
    const {list, key, item: {id, name}} = useContext(ListContext);

    return (
        <span>
            <a href={`/artist/${id}`}>{name}</a>
            {key < (list.length - 1) && <span>, </span>}
        </span>
    )
}
