import { Player } from "./components/player/Player";
import { PlayerTrackWrapper } from './components/player/wrapper/Track';

export default function App() {
    return (
        <PlayerTrackWrapper>
            <Player />
        </PlayerTrackWrapper>
    )
}
