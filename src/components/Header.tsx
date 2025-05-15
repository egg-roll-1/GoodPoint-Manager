import { Text } from "@radix-ui/themes"
import { Link } from "@tanstack/react-router"

export const Header = () => {
    return <header className="">
        <div className="p-3 shadow flex items-center">
            <Link to="/">
                <Text weight={'bold'} color="indigo">Good Point</Text>
            </Link>
        </div>
    </header>
}