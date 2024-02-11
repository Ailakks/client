import KeyRestricted from "../restricted/KeyRestricted";

export default function Home() {
    return (
        <KeyRestricted>
            <h1>Content</h1>
        </KeyRestricted>
    )
}
