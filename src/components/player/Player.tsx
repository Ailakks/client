import {PlayerAudio} from "./Audio";
import {PlayerControls} from "./Controls";
import {PlayerQueue} from "./Queue";

export function Player({ children }) {
    return (
        <PlayerQueue>
            <PlayerAudio />
            <PlayerControls />
            {children}
        </PlayerQueue>
    )
}
