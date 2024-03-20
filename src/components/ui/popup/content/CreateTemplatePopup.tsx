import {createContext, useContext, useState} from "react";
import {gql, useMutation} from "@apollo/client";
import Popup from "../Popup";
import LoadStatus from "../../../load/LoadStatus";
import LoadSpinner from "../../../load/spinner/LoadSpinner";
import Form from "../../../query/Form";
import Input from "../../../query/Input";
import List, {ListContext} from "../../../list/List";
import PopupWindows from "../style/PopupWindows";
import {PopupContext} from "../../../../wrapper/ui/PopupProvider";

export const TemplateContext = createContext();

export default function CreateTemplatePopup() {
    const { close } = useContext(PopupContext);

    const [keys, setKeys] = useState([]);

    const [update, { loading }] = useMutation(gql`
        mutation CreateTemplate($name: String!, $keys: [TemplateKeyDto!]!) {
            createTemplate(payload: {
                name: $name
                keys: $keys
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
        <TemplateContext.Provider value={{ keys, setKeys }}>
            <Popup>
                <PopupWindows>
                    <div className="h-full flex flex-col justify-between space-y-5">
                        <div className="flex justify-between items-center">
                            <h1>Create template</h1>
                            <button className="round" onClick={close}>
                                <i className="fa-regular fa-xmark"/>
                            </button>
                        </div>
                        <Form className="h-full space-y-5" submit={({ name }) => update({ variables: { name, keys } })}>
                            <Input name="name" type="text" className=" menu w-full" placeholder="Name" required />
                            <div className="h-full flex flex-col justify-between">
                                <div>
                                    <TemplateKeyList/>
                                </div>
                                <LoadStatus loading={loading} loader={<LoadSpinner/>}>
                                    <button type="submit" className="main w-full">Save</button>
                                </LoadStatus>
                            </div>
                        </Form>
                    </div>
                </PopupWindows>
            </Popup>
        </TemplateContext.Provider>
    )
}

const keys = ["code", "quantity", "tax_amount", "tax_rate", "price_unit", "price_total"]

function TemplateKeyList() {
    return (
        <table className="w-full">
            <List list={keys}><TemplateKey /></List>
        </table>
    )
}

function TemplateKey() {
    const { item } = useContext(ListContext);

    return (
        <tbody>
        <tr>
            <td>
                <p>{item}</p>
            </td>
            <td>
                <TemplateInput/>
            </td>
        </tr>
        </tbody>
    )
}

function TemplateInput() {
    const {item} = useContext(ListContext);

    const {setKeys} = useContext(TemplateContext);

    const handle = (value) => {
        setKeys((previous) => {
            const contains = previous.find(({ id }) => id === item);

            if (!contains) {
                return [...previous, { id: item, name: value }];
            }

            return previous.map((current) => {
                const { id } = current;

                if (id === item) {
                    return { id: item, name: value };
                }

                return current;
            });
        });
    };

    return (
        <Input className="main" type="text" placeholder="Name" onChange={({ target: { value } }) => handle(value)} />
    )
}