import Modal from "../../ui/Modal";
import {useContext} from "react";
import {QueueContext} from "../../../wrapper/api/Queue";
import List, {ListContext} from "../../list/List";

export default function QueueList() {
    const { queue } = useContext(QueueContext);

    return (
        <Modal title="Queue">
            <List list={queue}><Item /></List>
        </Modal>
    )
}

function Item() {
    const { item: { file: { name }, event: { progress, total } } } = useContext(ListContext);

    return (
        <div>
            <p>{name}</p>
            <p>{progress}/{total}</p>
        </div>
    )
}
