import {gql, useMutation} from "@apollo/client";
import Popup from "../ui/Popup";
import LoadStatus from "../load/LoadStatus";
import LoadSpinner from "../load/spinner/LoadSpinner";
import Form from "../query/Form";
import Input from "../query/Input";

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
            <Form className="space-y-2" submit={({ name }) => update({ name })}>
                <Input name="name" type="text" className="main w-full" placeholder="Name" required />
                <LoadStatus loading={loading} loader={<LoadSpinner />}>
                    <button type="submit" className="main w-full">Create</button>
                </LoadStatus>
            </Form>
        </Popup>
    )
}