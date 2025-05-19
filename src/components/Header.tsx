import { Link } from "@tanstack/react-router"

export const Header = () => {

    return <header className="sticky left-0 top-0 bg-background">
        <div className="p-3 shadow flex items-center">
            <Link to="/">
                <span>Good Point</span>
            </Link>
        </div>
    </header>
}