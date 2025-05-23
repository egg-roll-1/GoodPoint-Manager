import type { FC, ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { Header, type HeaderProps } from "./Header";
import { cn } from "@/lib/utils";

type Props = {
    children: ReactNode,
    className?: string;
} & HeaderProps

export const Layout: FC<Props> = ({ children, className, back, ...headerProps }) => {
    return <div className="max-w-md mx-auto">
        <Header back={back} {...headerProps} />
        <main className={cn(className, 'pb-14')}>
            {children}
        </main>
        {!back && <BottomNavigation />}
    </div>
}