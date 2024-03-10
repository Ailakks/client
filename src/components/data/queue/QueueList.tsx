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
        <div className="flex justify-between items-center space-x-6">
            <p className="max-w-52 text-nowrap overflow-hidden text-ellipsis">{name}</p>
            <div className="flex items-center space-x-4">
                <progress className="w-20 h-1 rounded-full overflow-hidden [&::-webkit-progress-value]:bg-blue-500 [&::-webkit-progress-value]:rounded-full" value={progress} max={1} />
                <p>{total}</p>
            </div>
        </div>
    )
}
