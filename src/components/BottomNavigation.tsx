
import { Link } from "@tanstack/react-router"
import { HomeIcon } from "lucide-react"

export const BottomNavigation = () => {
    return <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md shadow">
        <div className="flex justify-around">
            <Link to="/" className="p-2">
                <div>
                    <HomeIcon />
                    <span>
                        홈
                    </span>
                </div>
            </Link>

        </div>
    </div>
}