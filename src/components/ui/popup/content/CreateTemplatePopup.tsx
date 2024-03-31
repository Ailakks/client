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
import Checkbox from "../../../input/Checkbox";
import {LanguageContext} from "../../../../wrapper/lang/LanguageWrapper";

export const TemplateContext = createContext();

export default function CreateTemplatePopup() {
    const { translate } = useContext(LanguageContext);

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
        }`,
        {
            onCompleted: () => {
                close();
            }
        }
    );

    return (
        <TemplateContext.Provider value={{ keys, setKeys }}>
            <Popup>
                <PopupWindows>
                    <div className="h-full flex flex-col justify-between space-y-5">
                        <div className="flex justify-between items-center">
                            <h1>{translate("popup.template.create.title")}</h1>
                            <button className="round" onClick={close}>
                                <i className="fa-regular fa-xmark"/>
                            </button>
                        </div>
                        <Form className="h-full space-y-5 flex flex-col justify-between" submit={({ name }) => update({ variables: { name, keys } })}>
                            <div className="space-y-5">
                                <Input name="name" type="text" className="menu w-full" placeholder={translate("popup.template.create.input.name.label")} required />
                                <TemplateKeyList/>
                            </div>
                            <LoadStatus loading={loading} loader={<LoadSpinner/>}>
                                <button type="submit" className="main w-full">{translate("popup.template.create.save.label")}</button>
                            </LoadStatus>
                        </Form>
                    </div>
                </PopupWindows>
            </Popup>
        </TemplateContext.Provider>
    )
}

const keys = ["code", "quantity", "tax_amount", "tax_rate", "price_unit", "price_total"]

function TemplateKeyList() {
    const { translate } = useContext(LanguageContext);

    return (
        <table className="w-full text-left">
            <thead className="text-gray-100 [&>th]:p-2">
            <th></th>
            <th>{translate("popup.template.create.table.header.id")}</th>
            <th>{translate("popup.template.create.table.header.name")}</th>
            </thead>
            <List list={keys}><TemplateKey /></List>
        </table>
    )
}

function TemplateKey() {
    const { translate } = useContext(LanguageContext);

    const { item } = useContext(ListContext);

    return (
        <tbody>
        <tr className="[&>td]:px-2">
            <td>
                <Checkbox status={true} />
            </td>
            <td>
                <p>{translate(`popup.template.create.table.field.${item}`)}</p>
            </td>
            <td>
                <TemplateInput/>
            </td>
        </tr>
        </tbody>
    )
}

function TemplateInput() {
    const { translate } = useContext(LanguageContext);

    const { item } = useContext(ListContext);

    const { setKeys } = useContext(TemplateContext);

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
        <Input className="w-full menu" type="text" placeholder={translate(`popup.template.create.input.field.name.label`)} onChange={({ target: { value } }) => handle(value)} />
    )
}