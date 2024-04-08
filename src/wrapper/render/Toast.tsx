import {Fragment, useContext} from 'react';
import {ToastContext} from "../ui/Toast";
import List from "../../components/list/List";

export default function ToastRender({ children }) {
    const { list } = useContext(ToastContext);

    return (
        <Fragment>
            <div className="absolute bottom-0 left-0 p-10">
                <List list={list}><Toast /></List>
            </div>
            {children}
        </Fragment>
    );
}

function Toast() {
    const { item: { title } } = useContext(ToastContext);

    return (
        <div className="inline bg-blue-700 rounded-sm">
            <p>{title}</p>
        </div>
    );
}
