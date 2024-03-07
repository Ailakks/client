import {Fragment, useContext} from 'react';
import {PopupContext} from "../ui/PopupProvider";

export default function PopupRender({ children }) {
    const { popup } = useContext(PopupContext);

    return (
        <Fragment>
            {popup}
            {children}
        </Fragment>
    );
}
