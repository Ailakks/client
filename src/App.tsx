import { Player } from "./components/player/Player";
import { PlayerTrackWrapper } from './components/player/wrapper/Track';
import { PlayerQualityWrapper } from './components/player/wrapper/Quality';
import { PlayerQueueWrapper } from './components/player/wrapper/Queue';

export default function App() {
    return (
        <PlayerTrackWrapper>
            <PlayerQualityWrapper>
                <PlayerQueueWrapper>
                    <Player />
                </PlayerQueueWrapper>
            </PlayerQualityWrapper>
        </PlayerTrackWrapper>
    )
}
