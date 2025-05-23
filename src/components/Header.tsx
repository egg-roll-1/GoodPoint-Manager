import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useCallback, type FC, type ReactNode } from "react";
import { Button } from "./ui/button";

export type HeaderProps = {
    back?: boolean;
    title?: string | ReactNode;
    right?: ReactNode;
}

export const Header: FC<HeaderProps> = ({
    back: back,
    right,
    title = <span>Good Point</span>
}) => {
    const router = useRouter();
    console.log('back: ', back)

    const onClickBack = useCallback(() => {
        if (back) {
            router.history.back();
        }
    }, [back, router.history])

    return <header className="sticky left-0 top-0 bg-background z-50">
        <div className="p-1 flex items-center justify-between">
            <div>
                {back && <Button variant={'ghost'} onClick={onClickBack}>
                    <ArrowLeft />
                </Button>}
                {back
                    ? title
                    : <Link to="/" className="p-2">
                        {title}
                    </Link>}
            </div>
            {right}
        </div>
    </header>
}