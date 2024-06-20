import {Fragment} from "react";
import {PlayerAudio} from "./Audio";

export function Player({ children }) {
    return (
        <Fragment>
            <PlayerAudio />
            {children}
        </Fragment>
    )
}
