import {useContext, useEffect, useState} from "react";
import {SlideBar} from "../../ui/SlideBar";
import {PlayerAudioContext} from "../../Audio";

export function PlayerVolumeBar() {
    const { player } = useContext(PlayerAudioContext);

    const [previous, setPrevious] = useState(null);
    const [volume, setVolume] = useState(1);

    const handleRangeChange = (event) => {
        setVolume(Math.pow(event.target.value / 100, 2));
    };

    useEffect(() => {
        player.current.volume = volume / 100;
    }, [player, volume]);

    const VolumeStates = {
        LOW: { value: 30, icon: 'fa-regular fa-volume-low' },
        NORMAL: { value: 60, icon: 'fa-regular fa-volume' },
        HIGH: { value: 100, icon: 'fa-regular fa-volume-high' }
    };

    const toggleMute = () => {
        if (volume <= 0) {
            setVolume(previous);
            return;
        }

        setPrevious(volume);
        setVolume(0);
    };

    return (
        <div className="flex items-center space-x-4">
            <button className={volume <= 0 ? 'fa-regular fa-volume-mute' : Object.values(VolumeStates).find((value) => volume * 100 <= value.value).icon} onClick={toggleMute} />
            <div className="grow">
                <SlideBar
                    value={Math.sqrt(volume) * 100}
                    min={0}
                    max={100}
                    step={1}
                    onChange={handleRangeChange}
                />
            </div>
        </div>
    );
}
