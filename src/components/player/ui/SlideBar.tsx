import { useEffect, useRef } from 'react';

export function SliderBar({ onChange, ...props }) {
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
        <div className="relative">
            <input className="absolute w-full h-2 appearance-none cursor-pointer overflow-visible" ref={slider} type="range"
                   onChange={(event) => {
                       handleChange();
                       onChange(event);
                   }} {...props} />
            <div className="absolute w-full h-2 bg-red-500 rounded-full" ref={track}/>
        </div>
    );
}
