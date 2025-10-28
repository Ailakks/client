import { ProfileContext } from "@/context/profile";
import { useContext } from "react";

export function Debug() {
    const { data } = useContext(ProfileContext);

    return (
        <p>{JSON.stringify(data)}</p>
    );
}
