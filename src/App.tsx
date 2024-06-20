import { Player } from "./components/player/Player";
import {TrackWrapper} from "./components/player/wrapper/Track";
import {QualityWrapper} from "./components/player/wrapper/Quality";
import {QueueWrapper} from "./components/player/wrapper/Queue";
import {SourceWrapper} from "./components/player/wrapper/Source";
import {AudioWrapper} from "./components/player/wrapper/Audio";
import {PlayerSource} from "./components/player/Source";

export default function App() {
    return (
        <TrackWrapper>
            <QualityWrapper>
                <QueueWrapper>
                    <SourceWrapper>
                        <AudioWrapper>
                            <Player>
                                <PlayerSource source="https://link.storjshare.io/s/jufww76lrzupipxnoqt7dtsry62a/111/sample.mp3?wrap=0" />
                            </Player>
                        </AudioWrapper>
                    </SourceWrapper>
                </QueueWrapper>
            </QualityWrapper>
        </TrackWrapper>
    )
}
