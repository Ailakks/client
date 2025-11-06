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
                                    <div className="flex w-full justify-center">
                                        <div className="md:flex hidden grow basis-0">
                                            <PlayerData/>
                                        </div>
                                        <div className="grow">
                                            <PlayerControls/>
                                            <div className=" grow items-center space-x-5">
                                                <PlayerTrackBar/>
                                            </div>
                                        </div>
                                        <div className="md:flex hidden grow basis-0 justify-end items-center">
                                            <div className="w-40">
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
