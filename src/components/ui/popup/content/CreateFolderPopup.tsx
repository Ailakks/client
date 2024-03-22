import {useContext} from "react";
import {gql, useMutation} from "@apollo/client";
import Popup from "../Popup";
import LoadStatus from "../../../load/LoadStatus";
import LoadSpinner from "../../../load/spinner/LoadSpinner";
import Form from "../../../query/Form";
import Input from "../../../query/Input";
import PopupWindows from "../style/PopupWindows";
import {PopupContext} from "../../../../wrapper/ui/PopupProvider";

export default function CreateFolderPopup() {
    const { close } = useContext(PopupContext);

    const [update, { loading }] = useMutation(gql`
                mutation CreateFolder($name: String!) {
                    createFolder(payload: {
                        parent: $parent
                        name: $name
                    }) {
                        id
                        name
                        __typename
                    }
                }`,
        {
            onCompleted: () => {
                close();
            }
        }
    );

    return (
        <Popup>
            <PopupWindows>
                <div className="h-full flex flex-col justify-between space-y-5">
                    <div className="flex justify-between items-center">
                        <h1>Create a new folder</h1>
                        <button className="round" onClick={close}>
                            <i className="fa-regular fa-xmark"/>
                        </button>
                    </div>
                    <Form className="h-full space-y-5 flex flex-col justify-between" submit={(variables) => update({ variables })}>
                        <Input name="name" type="text" className="menu w-full" placeholder="Name" required />
                        <LoadStatus loading={loading} loader={<LoadSpinner/>}>
                            <button type="submit" className="main w-full">Save</button>
                        </LoadStatus>
                    </Form>
                </div>
            </PopupWindows>
        </Popup>
    )
}