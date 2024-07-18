import {PlayerAudio} from "./Audio";
import {PlayerControls} from "./Controls";
import {PlayerQueue} from "./Queue";
import {PlayerTrackBar} from "./controls/bar/Track";
import {PlayerVolumeBar} from "./controls/bar/Volume";
import {QualityWrapper} from "./wrapper/Quality";
import {QueueWrapper} from "./wrapper/Queue";
import {SourceWrapper} from "./wrapper/Source";
import {AudioWrapper} from "./wrapper/Audio";
import {TrackWrapper} from "./wrapper/Track";
import {PlayerData} from "./Data";

export function Player({ children }) {
    return (
        <TrackWrapper>
            <QualityWrapper>
                <QueueWrapper>
                    <SourceWrapper>
                        <AudioWrapper>
                            <PlayerQueue>
                                <PlayerAudio>
                                    <div className="relative items-center bg-gray-800 rounded-md m-4 p-2">
                                        <div className="absolute left-0 top-0 bottom-0 w-96">
                                            <PlayerData/>
                                        </div>
                                        <div className="absolute left-0 right-0 max-w-80 p-10 space-y-5">
                                            <PlayerControls/>
                                            <div className="flex items-center space-x-5">
                                                <div className="grow">
                                                    <PlayerTrackBar/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute right-0 top-0 bottom-0 w-40">
                                            <PlayerVolumeBar/>
                                        </div>
                                    </div>
                                </PlayerAudio>
                                {children}
                            </PlayerQueue>
                        </AudioWrapper>
                    </SourceWrapper>
                </QueueWrapper>
            </QualityWrapper>
        </TrackWrapper>
    )
}
