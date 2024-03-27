import Modal from "../../ui/Modal";
import {useContext} from "react";
import {QueueContext} from "../../../wrapper/api/Queue";
import List, {ListContext} from "../../list/List";
import Size from "../../parse/Size";

export default function QueueList() {
    const { queue } = useContext(QueueContext);

    return (
        <Modal title="Queue">
            <table>
                <tbody>
                <List list={queue}><Item /></List>
                </tbody>
            </table>
        </Modal>
    )
}

function Item() {
    const { item: { file: { name }, event: { progress, total } } } = useContext(ListContext);

    return (
        <tr className="flex justify-between items-center space-x-6">
            <td className="max-w-52 text-nowrap overflow-hidden text-ellipsis text-white">{name}</td>
            <td className="flex items-center space-x-4">
                <progress className="w-20 h-1 rounded-full overflow-hidden [&::-webkit-progress-value]:bg-blue-500 [&::-webkit-progress-value]:rounded-full" value={progress} max={1} />
                <p className="text-nowrap"><Size>{total}</Size></p>
            </td>
        </tr>
    )
}
