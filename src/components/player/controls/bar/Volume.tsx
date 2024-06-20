import {useContext, useEffect, useState} from "react";
import {SlideBar} from "../../ui/SlideBar";

export function PlayerVolumeBar() {
    const { audio } = useContext(AudioContext);

    const [previous, setPrevious] = useState(null);
    const [volume, setVolume] = useState(1);

    const handleRangeChange = (event) => {
        setVolume(Math.pow(event.target.value, 2));
    };

    useEffect(() => {
        audio.current.volume = volume;
    }, [audio, volume]);

    const VolumeStates = {
        LOW: {value: 0.3, icon: 'fa-regular fa-volume-low'},
        NORMAL: {value: 0.6, icon: 'fa-regular fa-volume'},
        HIGH: {value: 1, icon: 'fa-regular fa-volume-high'},
    };

    const toggleMute = () => {
        if (volume <= 0) {
            setVolume(previous);
            return;
        }

        setPrevious(volume);
        setVolume(0 ?? 0.75);
    };

    return (
        <div>
            <button className={volume <= 0 ? 'fa-regular fa-volume-mute' : Object.values(VolumeStates).find((value) => volume <= value.value).icon} onClick={toggleMute} />
            <SlideBar
                value={Math.sqrt(volume)}
                min={0}
                max={1}
                step={0.01}
                onChange={handleRangeChange}
            />
        </div>
    );
}
