import {useRef, useState} from "react";

export default function Droppable({ action, children }) {
    const [border, setBorder] = useState({});

    const wrapper = useRef();

    const size = 60;

    const borders = [
        {
            id: 'left',
            distance: (event, target) => event.clientX - target.left,
            styles: { top: '0', bottom: '0', width: `${size}px` },
            apply: (current, component) => ({ column: [component, current] })
        },
        {
            id: 'right',
            distance: (event, target) => target.right - event.clientX,
            styles: { top: '0', bottom: '0', right: '0', width: `${size}px` },
            apply: (current, component) => ({ column: [current, component] })
        },
        {
            id: 'top',
            distance: (event, target) => event.clientY - target.top,
            styles: { top: '0', bottom: '0', right: '0', left: '0', height: `${size}px` },
            apply: (current, component) => ({ row: [component, current] })
        },
        {
            id: 'bottom',
            distance: (event, target) => target.bottom - event.clientY,
            styles: { bottom: '0', right: '0', left: '0', height: `${size}px` },
            apply: (current, component) => ({ row: [current, component] })
        }
    ];

    function dragStart(event) {
        const target = event.currentTarget.getBoundingClientRect();

        const matched = borders.some((current) => {
            const { distance } = current;
            if (distance(event, target) <= size) {
                setBorder(current);

                return true;
            }
        });

        if (!matched) {
            setBorder({});
        }
    }

    function dragEnd() {
        setBorder({});
    }

    function drop(event) {
        setBorder({});

        const item = JSON.parse(event.dataTransfer.getData("data"));

        action({ item, border });
    }

    return (
        <div className="relative" ref={wrapper} onDragOver={dragStart}>
            <div className="absolute bg-orange-500 opacity-50" style={border.styles} draggable onDragOver={(event) => event.preventDefault()} onDragLeave={dragEnd} onDrop={drop} />
            {children}
        </div>
    )
}
