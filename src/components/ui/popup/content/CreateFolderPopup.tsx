import {useContext} from "react";
import {gql, useMutation} from "@apollo/client";
import Popup from "../Popup";
import LoadStatus from "../../../load/LoadStatus";
import LoadSpinner from "../../../load/spinner/LoadSpinner";
import Form from "../../../query/Form";
import Input from "../../../query/Input";
import PopupWindows from "../style/PopupWindows";
import {PopupContext} from "../../../../wrapper/ui/Popup";
import {FolderContext} from "../../../data/list/NewButton";
import {LanguageContext} from "../../../../wrapper/lang/LanguageWrapper";

export default function CreateFolderPopup() {
    const { translate } = useContext(LanguageContext);

    const { data: { getFolder: { id: parent } }, refetch } = useContext(FolderContext);

    const { close } = useContext(PopupContext);

    const [update, { loading }] = useMutation(gql`
                mutation CreateFolder($parent: String!, $name: String!) {
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
                refetch();
                close();
            }
        }
    );

    return (
        <Popup>
            <PopupWindows>
                <div className="h-full flex flex-col justify-between space-y-5">
                    <div className="flex justify-between items-center">
                        <h1>{translate("popup.folder.create.title")}</h1>
                        <button className="round" onClick={close}>
                            <i className="fa-regular fa-xmark"/>
                        </button>
                    </div>
                    <Form className="h-full space-y-5 flex flex-col justify-between" submit={({ name }) => update({ variables: { name, parent } })}>
                        <Input name="name" type="text" className="menu w-full" placeholder={translate("popup.folder.create.input.name.label")} required />
                        <LoadStatus loading={loading} loader={<LoadSpinner/>}>
                            <button type="submit" className="main w-full">{translate("popup.folder.create.submit.label")}</button>
                        </LoadStatus>
                    </Form>
                </div>
            </PopupWindows>
        </Popup>
    )
}