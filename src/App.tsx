import { Player } from "./components/player/Player";
import {TrackWrapper} from "./components/player/wrapper/Track";
import {QualityWrapper} from "./components/player/wrapper/Quality";
import {QueueWrapper} from "./components/player/wrapper/Queue";
import {SourceWrapper} from "./components/player/wrapper/Source";

export default function App() {
    return (
        <TrackWrapper>
            <QualityWrapper>
                <QueueWrapper>
                    <SourceWrapper>
                        <Player />
                    </SourceWrapper>
                </QueueWrapper>
            </QualityWrapper>
        </TrackWrapper>
    )
}
