import {Fragment, useContext} from 'react';

export default function PopupRender({ children }) {
    const { popup } = useContext(PopupContext);

    return (
        <Fragment>
            {popup}
            {children}
        </Fragment>
    );
}
