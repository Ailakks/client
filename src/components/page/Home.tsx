import KeyRestricted from "../restricted/Key";
import AccountRestricted from "../restricted/Account";

export default function Home() {
    return (
        <AccountRestricted>
            <KeyRestricted>
                <h1>Content</h1>
            </KeyRestricted>
        </AccountRestricted>
    )
}
