import {Fragment, useContext} from 'react';
import {ModalContext} from "../ui/ModalProvider";

export default function ModalRender({ children }) {
    const { current } = useContext(ModalContext);

    return (
        <Fragment>
            {current}
            {children}
        </Fragment>
    );
}
