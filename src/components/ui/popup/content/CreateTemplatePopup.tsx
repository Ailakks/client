import {gql, useMutation} from "@apollo/client";
import Popup from "../Popup";
import LoadStatus from "../../../load/LoadStatus";
import LoadSpinner from "../../../load/spinner/LoadSpinner";
import Form from "../../../query/Form";
import Input from "../../../query/Input";
import List, {ListContext} from "../../../list/List";
import {useContext} from "react";
import PopupWindows from "../style/PopupWindows";
import {PopupContext} from "../../../../wrapper/ui/PopupProvider";

export default function CreateTemplatePopup() {
    const { close } = useContext(PopupContext);

    const [update, { loading }] = useMutation(gql`
        mutation CreateTemplate($name: String!) {
            createTemplate(payload: {
                name: $name
            }) {
                id
                keys {
                    id
                    name
                    __typename
                }
                __typename
            }
        }`
    );

    return (
        <Popup>
            <PopupWindows>
                <div className="h-full flex flex-col justify-between space-y-5">
                    <div className="flex justify-between items-center">
                        <h1>Create template</h1>
                        <button className="round" onClick={close}>
                            <i className="fa-regular fa-xmark"/>
                        </button>
                    </div>
                    <Form className="h-full space-y-5" submit={({ name }) => update({ name })}>
                        <Input name="name" type="text" className="main w-full" placeholder="Name" required />
                        <div>
                            <TemplateKeyList />
                        </div>
                    </Form>
                    <LoadStatus loading={loading} loader={<LoadSpinner />}>
                        <button type="submit" className="main w-full">Save</button>
                    </LoadStatus>
                </div>
            </PopupWindows>
        </Popup>
    )
}

const keys = ["code", "quantity", "tax_amount", "tax_rate", "price_unit", "price_total"]

function TemplateKeyList() {
    return (
        <List list={keys}><TemplateKey /></List>
    )
}

function TemplateKey() {
    const { item } = useContext(ListContext);

    return (
        <table className="w-full">
            <tbody>
            <tr>
                <td>
                    <p>{item}</p>
                </td>
                <td>
                    <input className="main" name="name" type="text" placeholder="Name" />
                </td>
            </tr>
            </tbody>
        </table>
    )
}