import {useContext} from "react";
import {ModalContext} from "../../wrapper/ui/Modal";

export default function Modal({ title, children }) {
    const { setCurrent } = useContext(ModalContext);

    const close = () => {
      setCurrent(null);
    };

    return (
        <div className="absolute bottom-0 right-0 bg-gray-500 p-4 m-6 rounded-md min-w-80 z-10">
            <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center h-5">
                    <p>{title}</p>
                    <button className="secondary" onClick={close}>
                        <i className="fa-regular fa-xmark" />
                    </button>
                </div>
                <hr />
                {children}
            </div>
        </div>
    )
}
