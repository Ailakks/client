import PopupRender from "./render/PopupRender";
import QueueRender from "./render/ModalRender";

export default function RenderProvider({ children }) {
    return (
        <PopupRender>
            <QueueRender>
                {children}
            </QueueRender>
        </PopupRender>
    )
}
