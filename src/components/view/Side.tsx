const pages = [
    {
        id: 'home',
        path: '/home',
        name: 'Home',
        icon: ''
    },
    {
        id: 'recent',
        path: '/recent',
        name: 'Recent',
        icon: ''
    },
    {
        id: 'trash',
        path: '/trash',
        name: 'Trash',
        icon: ''
    }
]

export default function Side() {
    return (
        <div className="flex flex-col justify-between">
            {
                pages.map(({ icon, name }) => {
                    return (
                        <button>{name}</button>
                    )
                })
            }
        </div>
    )
}
