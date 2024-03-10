import {useContext, useEffect} from "react";
import {QueueContext} from "../../../wrapper/api/Queue";
import {ModalContext} from "../../../wrapper/ui/ModalProvider";
import Modal from "../../ui/Modal";

export default function QueueList() {
    const { queue } = useContext(QueueContext);
    const { current, setCurrent } = useContext(ModalContext);

    useEffect(() => {
        if (!queue) {
            return;
        }

        if (current) {
            return;
        }

        setCurrent(<QueueList />);
    }, [queue]);

    return (
        <Modal title="Queue">
            <p>test</p>
        </Modal>
    )
}
