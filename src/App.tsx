import { Player } from "./components/player/Player";
import { PlayerTrackWrapper } from './components/player/wrapper/Track';
import { PlayerQualityWrapper } from './components/player/wrapper/Quality';

export default function App() {
    return (
        <PlayerTrackWrapper>
            <PlayerQualityWrapper>
                <Player />
            </PlayerQualityWrapper>
        </PlayerTrackWrapper>
    )
}
