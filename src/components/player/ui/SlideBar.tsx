import { useEffect, useRef } from 'react';

export function SliderBar({ onChange }) {
    const slider = useRef(null);
    const track = useRef(null);

    useEffect(() => {
        handleChange();
    }, [slider.current?.value]);

    const handleChange = () => {
        const value = slider.current.value;
        const min = slider.current.min;
        const max = slider.current.max;
        const percentage = ((value - min) / (max - min)) * 100;

        track.current.style.width = `calc(${percentage}% + 2px)`;
    };

    return (
        <div>
            <div ref={track}/>
            <input ref={slider} type="range" onChange={(event) => {
                handleChange();
                onChange(event);
            }}/>
        </div>
    );
}
