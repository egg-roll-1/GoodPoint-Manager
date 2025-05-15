import type { FC, ReactNode } from "react"

type Props = {
    children: ReactNode,
    className?: string;
}

export const Layout: FC<Props> = ({ children, className }) => {
    return <div className="max-w-md mx-auto shadow">
        <main className={className}>
            {children}
        </main>
    </div>
}