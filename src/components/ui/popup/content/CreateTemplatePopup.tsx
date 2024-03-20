import {gql, useMutation} from "@apollo/client";
import Popup from "../Popup";
import LoadStatus from "../../../load/LoadStatus";
import LoadSpinner from "../../../load/spinner/LoadSpinner";
import Form from "../../../query/Form";
import Input from "../../../query/Input";
import List, {ListContext} from "../../../list/List";
import {useContext} from "react";
import PopupWindows from "../style/PopupWindows";

export default function CreateTemplatePopup() {
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
                <div className="h-full flex flex-col justify-between">
                    <Form className="h-full space-y-2 divide-y-1 divide-gray-300" submit={({ name }) => update({ name })}>
                        <Input name="name" type="text" className="main w-full" placeholder="Name" required />
                        <div className="h-full flex flex-col justify-center">
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