import { formatRelative } from "date-fns";
import { es } from 'date-fns/locale'

export default function Moment({ children }) {
    if (!children) {
        return;
    }

    return (
        <span>{formatRelative(new Date(children), new Date(), {locale: es})}</span>
    )
}