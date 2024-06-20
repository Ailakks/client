import { Player } from "./components/player/Player";
import { Context } from './components/player/Context';

export default function App() {
    return (
        <Context>
            <Player />
        </Context>
    )
}
