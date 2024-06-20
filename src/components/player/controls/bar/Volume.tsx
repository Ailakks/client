import {useContext, useEffect, useState} from "react";

export function PlayerVolumeBar() {
    const [previous, setPrevious] = useState(null);
    const [volume, setVolume] = useState(1);

    const handleRangeChange = (event) => {
        setVolume(Math.pow(event.target.value, 2));
    };

    useEffect(() => {
        player.current.volume = volume;
    }, [player, volume]);

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
        </div>
    );
}
