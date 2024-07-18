import {useContext} from "react";
import {PlayerContext} from "../wrapper/player/Player";
import List, {ListContext} from "../list/List";
import Checkbox from "../input/Checkbox";

export function Track({ app, track }) {
    const { setApp, setTrack } = useContext(PlayerContext);

    const { name, album: { image: { url } }, artists } = track;

    const set = () => {
        setApp(app);
        setTrack(track);
    };

    return (
        <tr className="cursor-pointer" onClick={set}>
            <th>
                <Checkbox status={true}/>
            </th>
            <td className="flex items-center space-x-2">
                <img className="h-14 rounded-md" alt={name} src={url}/>
                <div>
                    <p>{name}</p>
                    <p>
                        <List list={artists}>
                            <Artist/>
                        </List>
                    </p>
                </div>
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
