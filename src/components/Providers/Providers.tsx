import type { FC, ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { RouteProvider } from './RouterProvider';

type Props = {
    children?: ReactNode
}

export const Providers: FC<Props> = ({ children }) => {
    return (
        <QueryProvider>
            <RouteProvider />
            {children}
        </QueryProvider>

    );
};
