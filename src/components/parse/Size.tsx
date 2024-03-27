export default function Size({ children }) {
    const i = children == 0 ? 0 : Math.floor(Math.log(children) / Math.log(1024));

    return (
        <span>{(children / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]}</span>
    )
}