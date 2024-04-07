import {Fragment, useContext} from 'react';
import {PopupContext} from "../ui/Popup";

export default function PopupRender({ children }) {
    const { current } = useContext(PopupContext);

    return (
        <Fragment>
            {current}
            {children}
        </Fragment>
    );
}
