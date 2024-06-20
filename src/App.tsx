import { Player } from "./components/player/Player";
import { PlayerTrackWrapper } from './components/player/wrapper/Track';
import { PlayerQualityWrapper } from './components/player/wrapper/Quality';
import { PlayerQueueWrapper } from './components/player/wrapper/Queue';
import {PlayerSourceWrapper} from "./components/player/wrapper/Source";

export default function App() {
    return (
        <PlayerTrackWrapper>
            <PlayerQualityWrapper>
                <PlayerQueueWrapper>
                    <PlayerSourceWrapper>
                        <Player />
                    </PlayerSourceWrapper>
                </PlayerQueueWrapper>
            </PlayerQualityWrapper>
        </PlayerTrackWrapper>
    )
}
