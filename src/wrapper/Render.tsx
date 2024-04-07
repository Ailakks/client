import PopupRender from "./render/Popup";
import QueueRender from "./render/Modal";

export default function RenderProvider({ children }) {
    return (
        <PopupRender>
            <QueueRender>
                {children}
            </QueueRender>
        </PopupRender>
    )
}
