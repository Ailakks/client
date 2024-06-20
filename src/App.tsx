import {Player} from "./components/player/Player";
import {PlayerSource} from "./components/player/Source";

export default function App() {
    return (
        <Player>
            <PlayerSource source="https://link.storjshare.io/s/jufww76lrzupipxnoqt7dtsry62a/111/sample.mp3?wrap=0" />
        </Player>
    )
}
