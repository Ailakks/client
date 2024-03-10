import {useContext} from "react";
import {ModalContext} from "../../wrapper/ui/ModalProvider";

export default function Modal({ title, children }) {
    const { setCurrent } = useContext(ModalContext);

    const close = () => {
      setCurrent(null);
    };

    return (
        <div className="absolute bottom-0 left-0 p-10 bg-gray-500">
            <div className="flex flex-col space-y-6">
                <div className="flex justify-between">
                    <p>{title}</p>
                    <button className="secondary" onClick={close}>
                        <i className="fa-regular fa-xmark" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}
