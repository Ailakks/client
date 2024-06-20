import {Fragment} from "react";
import {PlayerAudio} from "./Audio";
import {PlayerControls} from "./Controls";

export function Player({ children }) {
    return (
        <Fragment>
            <PlayerAudio />
            <PlayerControls />
            {children}
        </Fragment>
    )
}
