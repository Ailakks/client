import {useParams} from "react-router-dom";
import {useContext} from "react";
import {AxiosContext} from "../components/wrapper/Axios";

export default function Playlist() {
    const { useClient } = useContext(AxiosContext);

    const { id } = useParams();

    const request = useClient({ url: `playlist/${id}` });
}
