import type { FC, ReactNode } from "react"
import { Header } from "./Header"
import { BottomNavigation } from "./BottomNavigation"

type Props = {
    children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
    return <div className="max-w-md mx-auto shadow">
        <Header />
        <main className="min-h-svh">
            {children}
        </main>
        <BottomNavigation />
    </div>
}