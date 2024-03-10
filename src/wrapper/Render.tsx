import PopupRender from "./render/PopupRender";
import QueueRender from "./render/QueueRender";

export default function RenderProvider({ children }) {
    return (
        <PopupRender>
            <QueueRender>
                {children}
            </QueueRender>
        </PopupRender>
    )
}
