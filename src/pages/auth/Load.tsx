import LoadSpinner from "../../components/load/spinner/LoadSpinner";

export function Load({ id }) {
    const [{ data, loading }, login] = useClient({ url: 'auth/token', params: { id } }, { manual: true });

    if (data) {

    }

    return (
        <LoadSpinner />
    )
}
