import type { FC, ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { Header } from "./Header";
import { cn } from "@/lib/utils";

type Props = {
    children: ReactNode,
    className?: string;
}

export const Layout: FC<Props> = ({ children, className }) => {
    return <div className="max-w-md mx-auto">
        <Header />
        <main className={cn(className, 'pb-14')}>
            {children}
        </main>
        <BottomNavigation />
    </div>
}