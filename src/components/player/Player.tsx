import {PlayerAudio} from "./Audio";
import {PlayerControls} from "./Controls";
import {PlayerQueue} from "./Queue";
import {PlayerTrackBar} from "./controls/bar/Track";
import {PlayerVolumeBar} from "./controls/bar/Volume";

export function Player({ children }) {
    return (
        <PlayerQueue>
            <PlayerAudio>
                <div className="p-10 space-y-5">
                    <PlayerControls />
                    <div className="flex items-center space-x-5">
                        <div className="grow">
                            <PlayerTrackBar />
                        </div>
                        <div className="w-40">
                            <PlayerVolumeBar />
                        </div>
                    </div>
                </div>
            </PlayerAudio>
            {children}
        </PlayerQueue>
    )
}
