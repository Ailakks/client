import {useContext, useEffect} from "react";
import {SourceContext} from "./wrapper/Source";
import axios from 'axios';

export function PlayerSource({ source }) {
    const { setSource } = useContext(SourceContext);

    useEffect(() => {
        axios.get(source, { responseType: "arraybuffer" }).then(({ data }) => {
            setSource(URL.createObjectURL(new Blob([data], { type: 'audio/mp3' })));
        });
    }, [source]);
}
