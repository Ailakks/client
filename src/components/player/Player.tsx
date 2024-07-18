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
                                    <div className="flex space-x-10 bg-gray-800 rounded-md m-4 p-6">
                                        <div className="flex grow basis-0">
                                            <PlayerData/>
                                        </div>
                                        <div className="grow space-y-5">
                                            <PlayerControls/>
                                            <div className="flex items-center space-x-5">
                                                <div className="grow">
                                                    <PlayerTrackBar/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex grow basis-0 justify-end items-center">
                                            <div className="w-60">
                                                <PlayerVolumeBar/>
                                            </div>
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
