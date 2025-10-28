
interface User {
    id: string
    username: string
}

interface Member {
    user: User
    roles: string[]
}

interface Role {
    id: string
    name?: string
    permissions?: string,
    position: number
}

interface Overwrite {
    id: string
    allow?: string
    deny?: string
}

interface Server {
    id: string
    members: Member[]
    roles: Role[]
}

interface Channel {
    id: string
    permission_overwrites: Overwrite[]
    flags: number
}
