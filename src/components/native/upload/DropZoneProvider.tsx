import {createContext, useRef, useState} from 'react';

export const DropZoneContext = createContext(null);

export default function DropZoneProvider({ start, end, clickable, action, children }) {
    const [isDragging, setIsDragging] = useState(false);

    const button = useRef<HTMLInputElement>(null);
    const wrapper = useRef();

    const onClick = () => {
        button.current.click();
    };

    const onDragEnter = (event) => {
        event.preventDefault();

        setIsDragging(true);
        onStart();
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    const onDragLeave = (event) => {
        if (event.target !== wrapper.current) {
            return;
        }

        setIsDragging(false);
        onEnd();
    };

    const onDrop = (event) => {
        event.preventDefault();

        setIsDragging(false);
        onEnd();

        if (action) {
            action(event.dataTransfer.files);
        }
    };

    const onStart = () => {
        if (start) {
            start();
        }
    };

    const onEnd = () => {
        if (end) {
            end();
        }
    };

    const handleChange = (event) => {
        action(event.target.files);
    };

    return (
        <DropZoneContext.Provider value={{ wrapper, button, clickable, isDragging, child: { onClick, onDragEnter, onDragOver, onDragLeave, onDrop } }}>
            <input ref={button} type="file" hidden onChange={handleChange} />
            {children}
        </DropZoneContext.Provider>
    );
};
