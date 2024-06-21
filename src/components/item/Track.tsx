export function Track({ app, track }) {
    const { name, album: { image: { url } } } = track;

    return (
        <div className="flex space-x-4 items-center">
            <img className="h-14 rounded-md" alt={name} src={url} />
            <p>{name}</p>
        </div>
    )
}
