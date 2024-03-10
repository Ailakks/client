import {Fragment, useContext} from 'react';
import {PopupContext} from "../ui/PopupProvider";

export default function ModalRender({ children }) {
    const { current } = useContext(PopupContext);

    return (
        <Fragment>
            {current}
            {children}
        </Fragment>
    );
}
