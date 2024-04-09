import ChatWidget from "./widgets/ChatWidget";

export default function Dashboard() {
    const layout = [
        {
            column: [
                {
                    row: [<ChatWidget />, <ChatWidget />]
                },
                {
                    column: [<ChatWidget />]
                },
                {
                    row: [<ChatWidget />]
                }
            ]
        }
    ];

    const widgets = [<ChatWidget />];

    return (
        <p>test</p>
    )
}
