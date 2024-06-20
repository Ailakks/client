import {useContext} from "react";
import {SliderBar} from "../../ui/SlideBar";
import {PlayerAudioContext} from "../../Audio";

export function PlayerTrackBar() {
    const { player } = useContext(PlayerAudioContext);

    const { duration } = player.current;
    const { currentTime } = player.current;

    const format = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const handleRangeChange = (event) => {
        player.current.currentTime = event.target.value;
    };

    return (
        <div>
            <p>{format(currentTime)}</p>
            <SliderBar
                value={currentTime}
                min={0}
                max={duration || 0}
                step={0.01}
                onChange={handleRangeChange}
            />
            <p>{format(duration || 0)}</p>
        </div>
    );
}
