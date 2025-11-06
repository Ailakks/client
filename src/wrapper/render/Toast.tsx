import {Fragment, useContext} from 'react';
import {ToastContext} from "../ui/Toast";
import List, {ListContext} from "../../components/list/List";

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
    const { item: { id, title } } = useContext(ListContext);

    const { remove } = useContext(ToastContext);

    return (
        <div className="inline bg-blue-700 rounded-xl py-2 px-8 space-x-5 z-50">
            <p>{title}</p>
            <button className="menu" onClick={() => remove(id)}>
                <i className="fa-regular fa-xmark"/>
            </button>
        </div>
    );
}
