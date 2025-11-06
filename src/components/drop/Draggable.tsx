export default function Draggable({ data, children }) {
    const drag = (event) => {
        event.dataTransfer.setData("data", JSON.stringify(data));
    }

    return (
        <div draggable onDragStart={drag}>
            {children}
        </div>
    )
}
