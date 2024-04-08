import PopupRender from "./render/Popup";

export default function RenderProvider({ children }) {
    return (
        <PopupRender>
            {children}
        </PopupRender>
    )
}
