import {useContext, useEffect} from "react";
import {SourceContext} from "./wrapper/Source";
import axios from 'axios';

export function PlayerSource({ source }) {
    const { setSource } = useContext(SourceContext);

    useEffect(() => {
        setSource(source)
    }, [source]);
}
