import PopupRender from "./render/Popup";
import QueueRender from "./render/Modal";
import ToastRender from "./render/Toast";

export default function RenderProvider({ children }) {
    return (
        <PopupRender>
            <QueueRender>
                <ToastRender>
                    {children}
                </ToastRender>
            </QueueRender>
        </PopupRender>
    )
}
