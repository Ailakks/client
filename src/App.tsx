import { Player } from "./components/player/Player";
import { PlayerContext } from './components/player/PlayerContext';

export default function App() {
    return (
        <PlayerContext>
            <Player />
        </PlayerContext>
    )
}
