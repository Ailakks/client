import {Fragment} from 'react';

export default function QueueRender({ children }) {
    return (
        <Fragment>
            <Queue />
            {children}
        </Fragment>
    );
}
