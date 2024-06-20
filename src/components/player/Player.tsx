import {PlayerAudio} from "./Audio";
import {PlayerControls} from "./Controls";
import {PlayerQueue} from "./Queue";
import {PlayerTrackBar} from "./controls/bar/Track";

export function Player({ children }) {
    return (
        <PlayerQueue>
            <PlayerAudio>
                <PlayerControls />
                <PlayerTrackBar />
            </PlayerAudio>
            {children}
        </PlayerQueue>
    )
}
