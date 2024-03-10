import Modal from "../../ui/Modal";
import {useContext} from "react";
import {QueueContext} from "../../../wrapper/api/Queue";
import List, {ListContext} from "../../list/List";
import {Progress} from "@nextui-org/react";

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
        <div className="flex justify-between items-center">
            <p>{name}</p>
            <div className="flex items-center">
                <Progress aria-label="loading" value={progress} maxValue={1} className="w-20 h-10 bg-blue-900" classNames={{ indicator: "bg-blue-500" }} />
                <p>{total}</p>
            </div>
        </div>
    )
}
