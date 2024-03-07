import PopupRender from "./render/PopupRender";

export default function RenderProvider({ children }) {
    return (
        <PopupRender>
            {children}
        </PopupRender>
    )
}
