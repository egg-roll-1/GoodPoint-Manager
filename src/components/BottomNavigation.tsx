
import { cn } from "@/lib/utils"
import { Link, useLocation } from "@tanstack/react-router"
import { HomeIcon, UserIcon, WorkflowIcon } from "lucide-react"

export const BottomNavigation = () => {
    const location = useLocation()

    return <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md shadow bg-background">
        <div className="flex justify-around">
            <Link to="/" className={cn("p-2 flex flex-col items-center", location.href == '/' ? 'text-primary' : '')}>
                <HomeIcon />
                <span className="text-xs">
                    홈
                </span>
            </Link>
            <Link to="/volunteer" className={cn("p-2 flex flex-col items-center", location.href.startsWith('/volunteer') ? 'text-primary' : '')}>
                <WorkflowIcon />
                <span className="text-xs">
                    봉사활동
                </span>
            </Link>
            <Link to="/my" className={cn("p-2 flex flex-col items-center", location.href.startsWith('/my') ? 'text-primary' : '')}>
                <UserIcon />
                <span className="text-xs">
                    마이페이지
                </span>
            </Link>
        </div>
    </div>
}