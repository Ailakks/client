import {useContext} from "react";
import {PlayerContext} from "../wrapper/player/Player";
import List, {ListContext} from "../list/List";

export function PlayerData() {
    const { track: { name, album: { image: { url } }, artists } } = useContext(PlayerContext);

    return (
        <div className="flex space-x-4 items-center">
            <img className="h-20 rounded-md" alt={name} src={url} />
            <div>
                <p>{name}</p>
                <p>
                    <List list={artists}>
                        <Artist/>
                    </List>
                </p>
            </div>
        </div>
    )
}

function Artist() {
    const { list, key, item: { id, name } } = useContext(ListContext);

    return (
        <span>
            <a href={`/artist/${id}`}>{name}</a>
            {key < (list.length - 1) && <span>, </span>}
        </span>
    )
}
