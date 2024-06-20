import {PlayerAudio} from "./Audio";
import {PlayerControls} from "./Controls";
import {PlayerQueue} from "./Queue";
import {PlayerTrackBar} from "./controls/bar/Track";

export function Player({ children }) {
    return (
        <PlayerAudio>
            <PlayerQueue>
                <PlayerControls />
                <PlayerTrackBar />
            </PlayerQueue>
            {children}
        </PlayerAudio>
    )
}
