import { Link } from "@tanstack/react-router"

export const Header = () => {
    return <header className="">
        <div className="p-3 shadow flex items-center">
            <Link to="/">
                <span>Good Point</span>
            </Link>
        </div>
    </header>
}